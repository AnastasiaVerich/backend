import pool from '../index';
import {QueryResult} from 'pg';
import {User} from "../../types/tableTypes";


// Функция для получения пользователя по user_id
export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const result: QueryResult<User> = await pool.query(query, [userId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.log('Error fetching user by ID', error);
        throw new Error('Error fetching user by ID from the database');
    }
};

// Функция для добавления пользователя
export const addUser = async (userId: string, userPhone: string): Promise<void> => {
    try {
        const query = 'INSERT INTO users (user_id, phone, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
        await pool.query(query, [userId, userPhone]);
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Error adding user to the database');
    }
};
// Универсальная функция для проверки существования пользователя
export const checkExistUser = async (value: string, type: keyof User): Promise<boolean> => {

    // Проверка типа
    if (type !== 'phone' && type !== 'user_id') {
        throw new Error('Invalid type provided');
    }

    try {
        // Формируем запрос в зависимости от типа проверки
        const query = `SELECT EXISTS (SELECT 1 FROM users WHERE ${type} = $1) AS exists`;

        // Выполнение запроса
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);

        // Возвращаем значение поля exists (тип данных boolean)
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.log('Error checking user existence:', error);
        throw new Error('Error checking user existence in the database');
    }
};
/*

// Функция для получения всех пользователей
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const query = 'SELECT * FROM users';
        const result: QueryResult<User> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Error fetching users:', error);
        throw new Error('Error fetching users from the database');
    }
};

// Функция для удаления пользователя по user_id
export const deleteUserById = async (userId: string): Promise<void> => {
    try {
        const query = 'DELETE FROM users WHERE user_id = $1';
        await pool.query(query, [userId]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user to the database');
    }
};


// Универсальная функция для обновления пользователя
export const updateUser = async (userId: string, updates: Partial<User>): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.phone) {
        fieldsToUpdate.push(`phone = $${counter++}`);
        values.push(updates.phone);
    }
    if (updates.status) {
        fieldsToUpdate.push(`status = $${counter++}`);
        values.push(updates.status);
    }

    // Если есть обновления, добавляем обновление для updated_at
    if (fieldsToUpdate.length > 0) {
        fieldsToUpdate.push(`updated_at = CURRENT_TIMESTAMP`);
    }

    // Если нет обновлений, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return {success: false};
    }

    // Формируем окончательный запрос
    const query = `
        UPDATE users
        SET ${fieldsToUpdate.join(', ')}
        WHERE user_id = $${counter}
        RETURNING *`;

    try {
        // Добавляем user_id в параметры запроса
        values.push(userId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, user_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return {success: false};
        }

        return {success: true};

    } catch (error) {
        console.log('Error updating user:', error);
        throw new Error('Error updating user in the database');
    }
};

*/
