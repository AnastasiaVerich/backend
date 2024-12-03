// src/models/photoModel.ts
import pool from './connection'; // Импортируем объект pool
import { QueryResult } from 'pg'; // Для типизации результатов запроса

// Функция для сохранения фото
export const savePhoto = async (userId: string, id_embedding: number, photoBuffer: Buffer): Promise<number> => {
    const query = 'INSERT INTO photos (id_face_embedding, id_user, image) VALUES ($1, $2, $3) RETURNING id_photo';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query, [id_embedding, userId, photoBuffer]);

    // Возвращаем ID записи
    return result.rows[0].id_photo;
};
