import {Request, Response} from "express";
import {addUser, checkExistUser} from "../../models/user/usersModel";
import {detectFaces} from "../../services/embeddingService";
import pool from "../../models";
import {addFaceEmbedding, getAllFaceEmbeddings} from "../../models/embedding/embeddingModel";
import * as faceapi from "@vladmandic/face-api";
import {addPhoto} from "../../models/photo/photoModel";
import {InterfaceResponse} from "../../types/type";
import {addUserBalance} from "../../models/user_balance/userBalanceModel";
import {checkExistBlockUser} from "../../models/black_list_user/BlacklistUserModel";
import {checkOperatorExists} from "../../models/operators/operatorModel";

// Интерфейс для тела запроса на регистрацию
interface RegistrationRequestBody {
    userId: string; // Уникальный идентификатор пользователя
    userPhone: string; // Телефон пользователя
    isSavePhoto: '0' | '1'; // Флаг: сохранять фото или нет
    file: Blob; // Файл изображения, загруженный с помощью Multer
}

// Тип, который перечисляет все возможные значения для поля text
type RegistrationResponseText =
    | "missing_photo" //2, 400
    | "missing_user_id" //2, 400
    | "missing_user_phone" //2, 400

    | "user_is_block"//0, 200
    | "user_exist_number"//0, 200
    | "user_exist_id"//0, 200
    | "user_exist_face"//0, 200
    | "success"//1, 200
    | "face_not_found"//2,200

    | "server_error";//2,500

// Интерфейс для ответа от сервера
type RegistrationResponse = InterfaceResponse<RegistrationResponseText>;

// Регистрация нового пользователя
export const registration = async (
    req: Request<{}, {}, RegistrationRequestBody>,
    res: Response<RegistrationResponse>
): Promise<any> => {
    const client = await pool.connect(); // Получение соединения с базой данных

    try {
        await client.query('BEGIN'); // Начинаем транзакцию

        const { userId, userPhone, isSavePhoto } = req.body;
        // Проверка наличия обязательных полей
        if (!req.file || !req.file.mimetype.startsWith('image/')) {
            return res.status(400).send({status: 2, text: "missing_photo"});
        }
        if (!userId || typeof userId !== "string") {
            return res.status(400).send({
                status: 2,
                text: "missing_user_id",
            });
        }
        if (!userPhone || typeof userPhone !== "string") {
            return res.status(400).send({
                status: 2,
                text: "missing_user_phone",
            });
        }

        // Проверяем существование пользователя по номеру телефона и ID
        const isHasSomeNumberUser = await checkExistUser(userPhone, 'phone');
        const isHasSomeIdUser = await checkExistUser(userId, 'user_id');
        const isBlockUser = await checkExistBlockUser(userId, userPhone);
        const isOperator = await checkOperatorExists(userId, userPhone, null);

        // Если пользователь с таким номером телефона уже существует
        if (isHasSomeNumberUser) {
            return res.status(200).send({status: 0, text: "user_exist_number"});
        }

        // Если пользователь с таким ID уже существует
        if (isHasSomeIdUser) {
            return res.status(200).send({status: 0, text: "user_exist_id"});
        }

        // Если пользователь с таким ID или телефоном заблокирован
        if (isBlockUser || isOperator) {
            return res.status(200).send({status: 0, text: "user_is_block"});
        }



        // Определение лиц на изображении
        const detections = await detectFaces(req.file.buffer);

        // Если лицо не найдено
        if (detections.length === 0) {
            return res.status(200).send({status: 2, text: "face_not_found"});
        }

        // Получение всех эмбеддингов из базы данных
        const embeddingsFromDB = await getAllFaceEmbeddings();

        // Вектор эмбеддинга для текущего изображения
        const currentEmbedding = detections[0].descriptor;

        // Сравнение с существующими эмбеддингами
        const matches: { user_id: string; distance: number }[] = [];
        for (const row of embeddingsFromDB) {
            const distance = faceapi.euclideanDistance(currentEmbedding, Object.values(JSON.parse(row.embedding)));
            if (distance < 0.6) {// Пороговое значение для сравнения
                matches.push({user_id: row.user_id, distance});
            }
        }

        // Если лицо совпадает с уже существующим
        if (matches.length > 0) {
            return res.status(200).send({status: 0, text: "user_exist_face"});
        }

        // Добавляем нового пользователя в таблицу users
        await addUser(userId, userPhone);

        // Добавляем баланс
        await addUserBalance(userId, userId, 0.0, 0.0, 0.0);


        // Сохраняем эмбеддинг лица в таблице face_embeddings
        await addFaceEmbedding(userId, JSON.stringify(currentEmbedding, null, 2));

        // Сохраняем фото, если флаг `isSavePhoto` равен '1'
        if (isSavePhoto === '1') {
            await addPhoto(userId, req.file.buffer);
        }

        await client.query('COMMIT'); // Фиксируем транзакцию
        return res.status(200).send({status: 1, text: "success"});
    } catch (error) {
        console.error('Error registration:', error);
        await client.query('ROLLBACK'); // Откатываем транзакцию в случае ошибки
        return res.status(500).send({status: 2, text: "server_error"});
    } finally {
        client.release(); // Освобождаем клиента
    }
};
