import {QueryResult} from 'pg';
import {Operator, operator_status_enum} from "../../types/tableTypes";
import pool from "../index"; // Для типизации результатов запроса


// Функция для добавления нового оператора
export const addOperator = async (operatorId: string, tg_account: string): Promise<void> => {
    try {
        const query = `
            INSERT INTO operators (operator_id, tg_account) 
            VALUES ($1, $2)`;
        await pool.query(query, [operatorId, tg_account]);
    } catch (error) {
        console.error('Error adding operator:', error);
        throw new Error('Error adding operator to the database');
    }
};
// Универсальная функция для проверки существования оператора
export const checkOperatorExists = async (operator_id: string | null, phone: string | null, tg_account: string | null): Promise<boolean> => {

    try {
        // Проверка, что хотя бы одно из значений передано
        if (!operator_id && !phone && !tg_account) {
            throw new Error("At least one of accountId or phoneNumber must be provided.");
        }
        const query = `
           SELECT 1 
           FROM operators 
           WHERE operator_id = $1 OR phone = $2 OR tg_account = $3
            ;`
        const result: QueryResult<Operator> = await pool.query(query, [operator_id, phone, tg_account]);
        return result.rows.length > 0
    } catch (error) {
        console.error('Error checking operator existence:', error);
        throw new Error('Error checking operator existence in the database');
    }
};
// Функция для получения всех операторов по региону и статусу
export const getAllOperatorsByRegionAndStatus = async (regionId: number, status: operator_status_enum): Promise<Operator> => {
    try {
        const query = `
          SELECT *
            FROM operators o
            JOIN operator_regions orr ON o.operator_id = orr.operator_id
            WHERE orr.region_id = $1 AND o.status = $2;
        `;
        const result: QueryResult<Operator> = await pool.query(query, [regionId, status]);

        return result.rows[0];
    } catch (error) {
        console.error('Error fetching operators:', error);
        throw new Error('Error fetching operators from the database');
    }
};


/*

// Функция для получения всех операторов
export const getAllOperators = async (): Promise<Operator[]> => {
    try {
        const query = 'SELECT * FROM operators';
        const result: QueryResult<Operator> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching operators:', error);
        throw new Error('Error fetching operators from the database');
    }
};

// Функция для получения оператора по operator_id
export const getOperatorById = async (operatorId: string): Promise<Operator | null> => {
    try {
        const query = 'SELECT * FROM operators WHERE operator_id = $1';
        const result: QueryResult<Operator> = await pool.query(query, [operatorId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.error('Error fetching operator by ID:', error);
        throw new Error('Error fetching operator by ID from the database');
    }
};


// Функция для удаления оператора по operator_id
export const deleteOperatorById = async (operatorId: string): Promise<void> => {
    try {
        const query = 'DELETE FROM operators WHERE operator_id = $1';
        await pool.query(query, [operatorId]);
    } catch (error) {
        console.error('Error deleting operator:', error);
        throw new Error('Error deleting operator from the database');
    }
};


// Универсальная функция для обновления оператора
export const updateOperator = async (operatorId: string, updates: Partial<Operator>): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.status) {
        fieldsToUpdate.push(`status = $${counter++}`);
        values.push(updates.status);
    }

    // Если есть обновления, добавляем обновление для updated_at
    if (fieldsToUpdate.length > 0) {
        fieldsToUpdate.push(`created_at = CURRENT_TIMESTAMP`);
    }

    // Если нет обновлений, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return {success: false};
    }

    // Формируем окончательный запрос
    const query = `
        UPDATE operators
        SET ${fieldsToUpdate.join(', ')}
        WHERE operator_id = $${counter}
        RETURNING *`;

    try {
        // Добавляем operator_id в параметры запроса
        values.push(operatorId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, operator_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return {success: false};
        }

        return {success: true};

    } catch (error) {
        console.error('Error updating operator:', error);
        throw new Error('Error updating operator in the database');
    }
};
*/
