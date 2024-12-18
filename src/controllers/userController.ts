// src/controllers/userController.ts
import * as faceapi from "@vladmandic/face-api";
import {Request, Response} from "express";

import {embeddingSave, getAllEmbedding} from "../models/embeddingModel";
import {savePhoto} from "../models/photoModel";
import {addUser, findUserById, findUserByNumber} from "../models/usersModel";
import {detectFaces, loadModels} from "../services/embeddingService";
import pool from "../models/connection";

// Загрузка моделей face-api
loadModels().catch(console.error);

interface RegistrationRequest {
    userId: string;
    userPhone: string;
    isSavePhoto: string;
    file: Express.Multer.File; // Добавление типа для файла
}

interface CheckExistRequestBody {
    userId: string;
}

export const registration = async (req: Request<{}, {}, RegistrationRequest>, res: Response): Promise<any> => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Начинаем транзакцию
        if (!req.file) {
            return res.status(200).send({ status: 2, text: "Нет изображения" });
        }

        const isHasSomeNumberUser = await findUserByNumber(req.body.userPhone);
        const isHasSomeIdUser = await findUserById(req.body.userId);

        if (isHasSomeNumberUser) {
            return res.status(200).send({ status: 0, text: "user_exist_number" });
        }
        if (isHasSomeIdUser) {
            return res.status(200).send({ status: 0, text: "user_exist_id" });
        }

        const detections = await detectFaces(req.file.buffer);

        if (detections.length === 0) {
            return res.status(200).send({ status: 2, text: "Лицо не найдено" });
        }

        // Получение всех эмбеддингов из БД
        const embeddingsFromDB = await getAllEmbedding();

        const faceEmbedding = detections[0].descriptor;

        const matches = [];
        for (const row of embeddingsFromDB) {
            const distance = faceapi.euclideanDistance(faceEmbedding, row.embedding);
            if (distance < 0.6) {
                matches.push({ id: row.id, name: row.person_name, distance });
            }
        }

        if (matches.length > 0) {
            return res.status(200).send({ status: 0, text: "user_exist_face" });
        }

        // Вставка нового пользователя в таблицу users
        await addUser(req.body.userId, req.body.userPhone);

        // Вставка эмбеддинга в таблицу face_embeddings
        const idEmbedding = await embeddingSave(req.body.userId, JSON.stringify(faceEmbedding, null, 2));

        // Сохранение фото, если требуется
        if (req.body.isSavePhoto === "1") {
            await savePhoto(req.body.userId, idEmbedding, req.file.buffer);
        }

        await client.query('COMMIT'); // Фиксируем транзакцию
        return res.status(200).send({ status: 1, text: "success" });
    } catch (error) {
        await client.query('ROLLBACK'); // Откатываем транзакцию в случае ошибки
        console.error(error);
        return res.status(500).json({ error: "Упс" });
    } finally {
        client.release(); // Освобождаем клиента
    }
};

export const check_exist_by_id = async (req:  Request<{}, {}, CheckExistRequestBody>, res: Response): Promise<any> => {
    try {
        const isHasSomeIdUser = await findUserById(req.body.userId);

        if (isHasSomeIdUser) {
            return res.status(200).send({ status: 1, text: "user_exist_id" });
        } else {
            return res.status(200).send({ status: 0, text: "new_user_id" });
        }
    } catch (error) {
        return res.status(500).send({ status: 2, text: "server_error" });
    }
};
