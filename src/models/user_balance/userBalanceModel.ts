import pool from '../index';
import {QueryResult} from 'pg';
import {UserBalance} from '../../types/tableTypes';


// Функция для получения баланса пользователя по user_id
export const getUserBalanceByUserId = async (userId: string): Promise<UserBalance | null> => {
    try {
        const query = 'SELECT * FROM user_balance WHERE user_id = $1';
        const result: QueryResult<UserBalance> = await pool.query(query, [userId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.error('Error fetching user balance by user ID:', error);
        throw new Error('Error fetching user balance by user ID from the database');
    }
};

// Функция для добавления баланса пользователя
export const addUserBalance = async (
    userBalanceId: string,
    userId: string,
    balance: number,
    totalEarned: number,
    totalWithdrawn: number
): Promise<void> => {
    try {
        const query = `
            INSERT INTO user_balance (user_balance_id,user_id, balance, total_earned, total_withdrawn)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        await pool.query(query, [
            userBalanceId,
            userId,
            balance,
            totalEarned,
            totalWithdrawn,
        ]);
    } catch (error) {
        console.error('Error adding user balance:', error);
        throw new Error('Error adding user balance to the database');
    }
};
//
// // Функция для удаления баланса пользователя по user_id
// export const deleteUserBalanceByUserId = async (userId: string): Promise<void> => {
//     try {
//         const query = 'DELETE FROM user_balance WHERE user_id = $1';
//         await pool.query(query, [userId]);
//     } catch (error) {
//         console.error('Error deleting user balance:', error);
//         throw new Error('Error deleting user balance from the database');
//     }
// };
//
// // Универсальная функция для проверки существования баланса пользователя
// export const checkExistUserBalance = async (
//     value: string | number,
//     field: keyof UserBalance
// ): Promise<boolean> => {
//     const allowedFields: Array<keyof UserBalance> = [
//         'user_balance_id',
//         'user_id',
//         'balance',
//         'total_earned',
//         'total_withdrawn',
//     ];
//     if (!allowedFields.includes(field)) {
//         throw new Error(`Invalid field provided. Allowed fields: ${allowedFields.join(', ')}`);
//     }
//
//     try {
//         const query = `
//             SELECT EXISTS (
//                 SELECT 1
//                 FROM user_balance
//                 WHERE ${field} = $1
//             ) AS exists`;
//         const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
//         return result.rows[0]?.exists ?? false;
//     } catch (error) {
//         console.error(`Error checking user balance existence by ${field}:`, error);
//         throw new Error(`Error checking user balance existence by ${field} in the database`);
//     }
// };
//
// // Функция для обновления баланса пользователя
// export const updateUserBalance = async (
//     userId: string,
//     updates: Partial<UserBalance>
// ): Promise<{ success: boolean }> => {
//     const fieldsToUpdate: string[] = [];
//     const values: any[] = [];
//     let counter = 1;
//
//     // Подготовка обновляемых полей
//     if (updates.balance !== undefined) {
//         fieldsToUpdate.push(`balance = $${counter++}`);
//         values.push(updates.balance);
//     }
//     if (updates.total_earned !== undefined) {
//         fieldsToUpdate.push(`total_earned = $${counter++}`);
//         values.push(updates.total_earned);
//     }
//     if (updates.total_withdrawn !== undefined) {
//         fieldsToUpdate.push(`total_withdrawn = $${counter++}`);
//         values.push(updates.total_withdrawn);
//     }
//
//     // Добавляем обновление времени
//     if (fieldsToUpdate.length > 0) {
//         fieldsToUpdate.push(`updated_at = CURRENT_TIMESTAMP`);
//     }
//
//     // Если нет обновляемых полей, возвращаем false
//     if (fieldsToUpdate.length === 0) {
//         return {success: false};
//     }
//
//     const query = `
//         UPDATE user_balance
//         SET ${fieldsToUpdate.join(', ')}
//         WHERE user_id = $${counter}
//         RETURNING *`;
//
//     try {
//         values.push(userId);
//         const result = await pool.query(query, values);
//
//         // Если обновлений не было, возвращаем false
//         if (result.rowCount === 0) {
//             return {success: false};
//         }
//
//         return {success: true};
//     } catch (error) {
//         console.error('Error updating user balance:', error);
//         throw new Error('Error updating user balance in the database');
//     }
// };
//
// // Функция для получения всех балансов пользователей
// export const getAllUserBalances = async (): Promise<UserBalance[]> => {
//     try {
//         const query = 'SELECT * FROM user_balance';
//         const result: QueryResult<UserBalance> = await pool.query(query);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching user balances:', error);
//         throw new Error('Error fetching user balances from the database');
//     }
// };
