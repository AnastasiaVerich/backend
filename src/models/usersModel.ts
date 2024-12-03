// src/models/usersModel.ts
import pool from './connection'; // Импортируем объект pool
import { QueryResult } from 'pg'; // Для типизации результатов запроса

// Типизация результата запросов для методов findUserByNumber и findUserById
interface UserExists {
    exists: boolean;
}

// Функция для добавления пользователя
export const addUser = async (userId: string, userPhone: string): Promise<number> => {
    const query = 'INSERT INTO users (id_user, phone, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id_user';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query, [userId, userPhone]);

    // Возвращаем ID записи
    return result.rows[0].id_user;
};

// Функция для проверки существования пользователя по номеру телефона
export const findUserByNumber = async (userPhone: string): Promise<boolean> => {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE phone = $1) AS exists';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query, [userPhone]);

    // Возвращаем значение поля exists (тип данных boolean)
    return result.rows[0].exists;
};

// Функция для проверки существования пользователя по ID
export const findUserById = async (userId: string): Promise<boolean> => {
    const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE id_user = $1) AS exists';

    // Выполнение запроса
    const result: QueryResult = await pool.query(query, [userId]);

    // Возвращаем значение поля exists (тип данных boolean)
    return result.rows[0].exists;
};
