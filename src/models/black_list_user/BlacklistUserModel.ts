import pool from '../index';
import {QueryResult} from 'pg';
import {BlacklistUser} from "../../types/tableTypes";

// Функция для получения фотографии по photo_id
export const checkExistBlockUser = async (accountId: string | null, phoneNumber: string | null): Promise<boolean> => {
    try {
        // Проверка, что хотя бы одно из значений передано
        if (!accountId && !phoneNumber) {
            throw new Error("At least one of accountId or phoneNumber must be provided.");
        }

        // Строим запрос с условием проверки на account_id или phone_number
        const query = `
            SELECT 1 FROM blacklist_users WHERE account_id = $1 OR phone = $2 LIMIT 1;`;
        const result: QueryResult<BlacklistUser> = await pool.query(query, [accountId, phoneNumber]);
        return result.rows.length > 0
    } catch (error) {
        console.error('Error checking if user is in blacklist:', error);
        throw new Error('Error checking user in blacklist');
    }
};

// Функция для добавления пользователя в блок-лист
export const addUserToBlacklist = async (accountId: string | null, phoneNumber: string | null, reason: string | null): Promise<void> => {
    try {
        // Проверка, что хотя бы одно из значений передано
        if (!accountId && !phoneNumber) {
            throw new Error("At least one of accountId or phoneNumber must be provided.");
        }

        // Проверка, существует ли пользователь в блок-листе
        const isInBlacklist = await checkExistBlockUser(accountId, phoneNumber);
        if (isInBlacklist) {
            throw new Error("User is already in the blacklist.");
        }

        // Строим запрос на добавление записи
        const query = `
      INSERT INTO blacklist_users (account_id, phone_number, reason, added_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP);
    `;

        // Выполняем запрос, передавая параметры
        await pool.query(query, [accountId, phoneNumber, reason]);
        console.log("User successfully added to the blacklist.");
    } catch (error) {
        console.error("Error adding user to blacklist:", error);
        throw new Error("Error adding user to blacklist");
    }
};
