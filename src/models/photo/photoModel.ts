import pool from '../index';
import {QueryResult} from 'pg';
import {Photo} from "../../types/tableTypes";

// Функция для добавления фотографии
export const addPhoto = async (userId: string, image: Buffer): Promise<void> => {
    try {
        const query = 'INSERT INTO photos (user_id, image) VALUES ($1, $2)';
        await pool.query(query, [userId, image]);
    } catch (error) {
        console.error('Error adding photo:', error);
        throw new Error('Error adding photo to the database');
    }
};

/*

// Функция для получения всех фотографий
export const getAllPhotos = async (): Promise<Photo[]> => {
    try {
        const query = 'SELECT * FROM photos';
        const result: QueryResult<Photo> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Error fetching photos:', error);
        throw new Error('Error fetching photos from the database');
    }
};

// Функция для получения фотографии по photo_id
export const getPhotoById = async (photoId: number): Promise<Photo | null> => {
    try {
        const query = 'SELECT * FROM photos WHERE photo_id = $1';
        const result: QueryResult<Photo> = await pool.query(query, [photoId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.log('Error fetching photo by ID:', error);
        throw new Error('Error fetching photo by ID from the database');
    }
};


// Функция для удаления фотографии по photo_id
export const deletePhotoById = async (photoId: number): Promise<void> => {
    try {
        const query = 'DELETE FROM photos WHERE photo_id = $1';
        await pool.query(query, [photoId]);
    } catch (error) {
        console.error('Error deleting photo:', error);
        throw new Error('Error deleting photo from the database');
    }
};

// Универсальная функция для проверки существования фото
export const checkExistPhoto = async (value: string, type: keyof Photo): Promise<boolean> => {
    // Проверка типа
    if ( type !== 'user_id') {
        throw new Error('Invalid type provided');
    }
    try {
        const query = `SELECT EXISTS (SELECT 1 FROM photos WHERE ${type} = $1) AS exists`;
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.log('Error checking photo existence:', error);
        throw new Error('Error checking photo existence in the database');
    }
};

// Универсальная функция для обновления фото
export const updatePhoto = async (
    photoId: number,
    updates: Partial<Photo>
): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.user_id) {
        fieldsToUpdate.push(`user_id = $${counter++}`);
        values.push(updates.user_id);
    }
    if (updates.image) {
        fieldsToUpdate.push(`image = $${counter++}`);
        values.push(updates.image);
    }

    // Если нет обновлений, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return { success: false };
    }

    // Формируем окончательный запрос
    const query = `
        UPDATE photos
        SET ${fieldsToUpdate.join(', ')}
        WHERE photo_id = $${counter}
        RETURNING *`;

    try {
        // Добавляем photo_id в параметры запроса
        values.push(photoId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, photo_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return { success: false };
        }

        return { success: true };

    } catch (error) {
        console.log('Error updating photo:', error);
        throw new Error('Error updating photo in the database');
    }
};
*/
