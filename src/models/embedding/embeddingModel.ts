import pool from '../index';
import {QueryResult} from 'pg';
import {FaceEmbedding, User} from "../../types/tableTypes";

// Функция для получения всех эмбеддингов
export const getAllFaceEmbeddings = async (): Promise<FaceEmbedding[]> => {
    try {
        const query = 'SELECT * FROM face_embeddings';
        const result: QueryResult<FaceEmbedding> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Error fetching face embeddings:', error);
        throw new Error('Error fetching face embeddings from the database');
    }
};

// Функция для получения эмбеддинга по face_embedding_id
export const getFaceEmbeddingByUserId = async (userId: string): Promise<FaceEmbedding | null> => {
    try {
        const query = 'SELECT * FROM face_embeddings WHERE user_id = $1';
        const result: QueryResult<FaceEmbedding> = await pool.query(query, [userId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.log('Error fetching face embedding by ID:', error);
        throw new Error('Error fetching face embedding by ID from the database');
    }
};

// Функция для добавления нового эмбеддинга
export const addFaceEmbedding = async (userId: string, embedding: string): Promise<void> => {
    try {
        const query = 'INSERT INTO face_embeddings (user_id, embedding, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP)';
        await pool.query(query, [userId, JSON.stringify(embedding)]);
    } catch (error) {
        console.error('Error adding face embedding:', error);
        throw new Error('Error adding face embedding to the database');
    }
};

/*
// Функция для удаления эмбеддинга по face_embedding_id
export const deleteFaceEmbeddingById = async (faceEmbeddingId: number): Promise<void> => {
    try {
        const query = 'DELETE FROM face_embeddings WHERE face_embedding_id = $1';
        await pool.query(query, [faceEmbeddingId]);
    } catch (error) {
        console.error('Error deleting face embedding:', error);
        throw new Error('Error deleting face embedding from the database');
    }
};

// Универсальная функция для проверки существования эмбеддинга
export const checkExistFaceEmbedding = async (value: string, type: keyof FaceEmbedding): Promise<boolean> => {

    // Проверка типа
    if (type !== 'user_id') {
        throw new Error('Invalid type provided');
    }

    try {
        // Формируем запрос в зависимости от типа проверки
        const query = `SELECT EXISTS (SELECT 1 FROM face_embeddings WHERE ${type} = $1) AS exists`;

        // Выполнение запроса
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);

        // Возвращаем значение поля exists (тип данных boolean)
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.log('Error checking face embedding existence:', error);
        throw new Error('Error checking face embedding existence in the database');
    }
};

// Универсальная функция для обновления эмбеддинга
export const updateFaceEmbedding = async (faceEmbeddingId: number, updates: Partial<FaceEmbedding>): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.embedding) {
        fieldsToUpdate.push(`embedding = $${counter++}`);
        values.push(JSON.stringify(updates.embedding));
    }

    // Если есть обновления, добавляем обновление для created_at
    if (fieldsToUpdate.length > 0) {
        fieldsToUpdate.push(`created_at = CURRENT_TIMESTAMP`);
    }

    // Если нет обновлений, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return { success: false };
    }

    // Формируем окончательный запрос
    const query = `
        UPDATE face_embeddings
        SET ${fieldsToUpdate.join(', ')}
        WHERE face_embedding_id = $${counter}
        RETURNING *`;

    try {
        // Добавляем face_embedding_id в параметры запроса
        values.push(faceEmbeddingId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, face_embedding_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return { success: false };
        }

        return { success: true };

    } catch (error) {
        console.log('Error updating face embedding:', error);
        throw new Error('Error updating face embedding in the database');
    }
};*/

