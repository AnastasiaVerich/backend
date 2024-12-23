import pool from '../index';
import { QueryResult } from 'pg';
import { WithdrawalLog } from '../../types/tableTypes';
/*

// Функция для получения всех записей о снятиях
export const getAllWithdrawalLogs = async (): Promise<WithdrawalLog[]> => {
    try {
        const query = 'SELECT * FROM withdrawal_logs';
        const result: QueryResult<WithdrawalLog> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching withdrawal logs:', error);
        throw new Error('Error fetching withdrawal logs from the database');
    }
};

// Функция для получения записи о снятии по withdrawal_id
export const getWithdrawalLogById = async (withdrawalId: number): Promise<WithdrawalLog | null> => {
    try {
        const query = 'SELECT * FROM withdrawal_logs WHERE withdrawal_id = $1';
        const result: QueryResult<WithdrawalLog> = await pool.query(query, [withdrawalId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.error('Error fetching withdrawal log by ID:', error);
        throw new Error('Error fetching withdrawal log by ID from the database');
    }
};

// Функция для добавления записи о снятии
export const addWithdrawalLog = async (
    userId: string,
    amount: number
): Promise<void> => {
    try {
        const query = `
            INSERT INTO withdrawal_logs (user_id, amount)
            VALUES ($1, $2)
            RETURNING *`;
        await pool.query(query, [userId, amount]);
    } catch (error) {
        console.error('Error adding withdrawal log:', error);
        throw new Error('Error adding withdrawal log to the database');
    }
};

// Функция для удаления записи о снятии по withdrawal_id
export const deleteWithdrawalLogById = async (withdrawalId: number): Promise<void> => {
    try {
        const query = 'DELETE FROM withdrawal_logs WHERE withdrawal_id = $1';
        await pool.query(query, [withdrawalId]);
    } catch (error) {
        console.error('Error deleting withdrawal log:', error);
        throw new Error('Error deleting withdrawal log from the database');
    }
};

// Универсальная функция для проверки существования записи о снятии
export const checkExistWithdrawalLog = async (
    value: string | number,
    field: keyof WithdrawalLog
): Promise<boolean> => {
    const allowedFields: Array<keyof WithdrawalLog> = [
        'withdrawal_id',
        'user_id',
        'amount',
        'withdrawn_at',
    ];
    if (!allowedFields.includes(field)) {
        throw new Error(`Invalid field provided. Allowed fields: ${allowedFields.join(', ')}`);
    }

    try {
        const query = `
            SELECT EXISTS (
                SELECT 1
                FROM withdrawal_logs
                WHERE ${field} = $1
            ) AS exists`;
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.error(`Error checking withdrawal log existence by ${field}:`, error);
        throw new Error(`Error checking withdrawal log existence by ${field} in the database`);
    }
};

// Функция для обновления записи о снятии (если требуется обновить, например, сумму)
export const updateWithdrawalLog = async (
    withdrawalId: number,
    updates: Partial<WithdrawalLog>
): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.amount !== undefined) {
        fieldsToUpdate.push(`amount = $${counter++}`);
        values.push(updates.amount);
    }

    // Если нет обновлений, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return { success: false };
    }

    // Формируем запрос
    const query = `
        UPDATE withdrawal_logs
        SET ${fieldsToUpdate.join(', ')}
        WHERE withdrawal_id = $${counter}
        RETURNING *`;

    try {
        // Добавляем withdrawal_id в параметры запроса
        values.push(withdrawalId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, withdrawal_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating withdrawal log:', error);
        throw new Error('Error updating withdrawal log in the database');
    }
};
*/
