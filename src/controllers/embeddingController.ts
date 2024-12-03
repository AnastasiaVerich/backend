// src/controllers/embeddingController.ts
import * as faceapi from "@vladmandic/face-api";
import { Request, Response } from "express";
import { getEmbeddingByUserId } from "../models/embeddingModel";
import { loadModels, detectFaces } from "../services/embeddingService";

// Загрузка моделей face-api
loadModels().catch(console.error);

interface VerificationRequest extends Request {
    body: {
        userId: string;
    };
    file?: Express.Multer.File; // Молтер файл, если он есть
}

export const verification = async (req: VerificationRequest, res: Response):  Promise<any> => {
    try {
        if (!req.file) {
            return res.status(200).send({ status: 2, text: "Нет изображения" });
        }

        const detections = await detectFaces(req.file.buffer);

        if (detections.length === 0) {
            return res.status(200).send({ status: 2, text: "Лицо не найдено" });
        }

        const embeddingsFromDB = await getEmbeddingByUserId(req.body.userId);

        if (embeddingsFromDB.length === 0) {
            return res.status(200).send({ status: 0, text: "user_not_exist" });
        }

        const embeddingFromDB = embeddingsFromDB[0];
        const faceEmbedding = detections[0].descriptor;

        const distance = faceapi.euclideanDistance(faceEmbedding, embeddingFromDB.embedding);

        if (distance < 0.6) {
            return res.status(200).send({ status: 1, text: "success" });
        }

        return res.status(200).send({ status: 0, text: "different_face" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Упс" });
    }
};
