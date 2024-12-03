// src/models/embeddingModel.ts
import pool from './connection'; // Импортируем объект pool
import { QueryResult } from 'pg'; // Для типизации результатов запроса

interface Embedding {
    person_name: string;
    id: number;
    embedding: number[];
}

export const embeddingSave = async (userId: string, findFirstFace: string): Promise<number> => {
    const query = 'INSERT INTO face_embeddings (id_user, embedding, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING id_face_embedding';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query, [userId, findFirstFace]);

    // Возвращаем ID записи
    return result.rows[0].id_face_embedding;
};

export const getAllEmbedding = async (): Promise<Embedding[]> => {
    const query = 'SELECT * FROM face_embeddings';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query);

    // Преобразование результатов запроса и возвращение
    return result.rows.map((el: any) => ({
        person_name: el.person_name, // Убираем расширение из имени файла
        id: el.id, // Можно заменить на уникальный идентификатор
        embedding: Object.values(el.embedding), // Преобразуем эмбеддинг в массив
    }));
};

export const getEmbeddingByUserId = async (userId: string): Promise<Embedding[]> => {
    const query = 'SELECT * FROM face_embeddings WHERE id_user = $1';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query, [userId]);

    // Преобразование результатов запроса и возвращение
    return result.rows.map((el: any) => ({
        person_name: el.person_name, // Убираем расширение из имени файла
        id: el.id, // Можно заменить на уникальный идентификатор
        embedding: Object.values(el.embedding), // Преобразуем эмбеддинг в массив
    }));
};
