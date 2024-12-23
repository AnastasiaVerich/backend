import pool from '../index';
import { QueryResult } from 'pg';
import { OperatorRegion } from '../../types/tableTypes';
/*

// Функция для получения всех связей операторов с регионами
export const getAllOperatorRegions = async (): Promise<OperatorRegion[]> => {
    try {
        const query = 'SELECT * FROM operator_regions';
        const result: QueryResult<OperatorRegion> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching operator regions:', error);
        throw new Error('Error fetching operator regions from the database');
    }
};

// Функция для получения связи по operator_region_id
export const getOperatorRegionById = async (operatorRegionId: number): Promise<OperatorRegion | null> => {
    try {
        const query = 'SELECT * FROM operator_regions WHERE operator_region_id = $1';
        const result: QueryResult<OperatorRegion> = await pool.query(query, [operatorRegionId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.error('Error fetching operator region by ID:', error);
        throw new Error('Error fetching operator region by ID from the database');
    }
};

// Функция для добавления новой связи оператора с регионом
export const addOperatorRegion = async (operatorId: string, regionId: number): Promise<void> => {
    try {
        const query = `
            INSERT INTO operator_regions (operator_id, region_id, created_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
        `;
        await pool.query(query, [operatorId, regionId]);
    } catch (error) {
        console.error('Error adding operator region:', error);
        throw new Error('Error adding operator region to the database');
    }
};

// Функция для удаления связи по operator_region_id
export const deleteOperatorRegionById = async (operatorRegionId: number): Promise<void> => {
    try {
        const query = 'DELETE FROM operator_regions WHERE operator_region_id = $1';
        await pool.query(query, [operatorRegionId]);
    } catch (error) {
        console.error('Error deleting operator region:', error);
        throw new Error('Error deleting operator region from the database');
    }
};

// Универсальная функция для проверки существования записи в таблице operator_regions
export const checkExistOperatorRegion = async (
    value: string | number,
    field: keyof OperatorRegion
): Promise<boolean> => {
    // Проверка допустимых полей
    const allowedFields: Array<keyof OperatorRegion> = ['operator_region_id', 'operator_id', 'region_id', 'created_at'];
    if (!allowedFields.includes(field)) {
        throw new Error(`Invalid field provided. Allowed fields: ${allowedFields.join(', ')}`);
    }

    try {
        // Формируем запрос в зависимости от указанного поля
        const query = `
            SELECT EXISTS (
                SELECT 1
                FROM operator_regions
                WHERE ${field} = $1
            ) AS exists
        `;

        // Выполнение запроса
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);

        // Возвращаем результат проверки
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.error(`Error checking operator region existence by ${field}:`, error);
        throw new Error(`Error checking operator region existence by ${field} in the database`);
    }
};

// Универсальная функция для обновления связи оператора с регионом
export const updateOperatorRegion = async (
    operatorRegionId: number,
    updates: Partial<OperatorRegion>
): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.operator_id) {
        fieldsToUpdate.push(`operator_id = $${counter++}`);
        values.push(updates.operator_id);
    }
    if (updates.region_id) {
        fieldsToUpdate.push(`region_id = $${counter++}`);
        values.push(updates.region_id);
    }

    // Если нет обновлений, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return { success: false };
    }

    // Формируем окончательный запрос
    const query = `
        UPDATE operator_regions
        SET ${fieldsToUpdate.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE operator_region_id = $${counter}
        RETURNING *
    `;

    try {
        // Добавляем operatorRegionId в параметры запроса
        values.push(operatorRegionId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, operator_region_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating operator region:', error);
        throw new Error('Error updating operator region in the database');
    }
};
*/
