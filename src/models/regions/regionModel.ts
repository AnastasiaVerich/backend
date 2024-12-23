import pool from '../index';
import { QueryResult } from 'pg';
import { RegionSettings } from "../../types/tableTypes";

// Функция для получения всех региональных настроек
export const getAllRegionSettings = async (): Promise<RegionSettings[]> => {
    try {
        const query = 'SELECT * FROM region_settings';
        const result: QueryResult<RegionSettings> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching region settings:', error);
        throw new Error('Error fetching region settings from the database');
    }
};

// Функция для получения настройки региона по region_id
export const getRegionSettingById = async (regionId: number): Promise<RegionSettings | null> => {
    try {
        const query = 'SELECT * FROM region_settings WHERE region_id = $1';
        const result: QueryResult<RegionSettings> = await pool.query(query, [regionId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.error('Error fetching region setting by ID:', error);
        throw new Error('Error fetching region setting by ID from the database');
    }
};
/*

// Функция для добавления новой настройки региона
export const addRegionSetting = async (
    regionName: string,
    reservationTime: string,
    queryFrequency: string,
    similarTopicDays: number,
    polygon: object
): Promise<void> => {
    try {
        const query = `
            INSERT INTO region_settings (region_name, reservation_time, query_frequency, similar_topic_days, polygon, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        await pool.query(query, [regionName, reservationTime, queryFrequency, similarTopicDays, polygon]);
    } catch (error) {
        console.error('Error adding region setting:', error);
        throw new Error('Error adding region setting to the database');
    }
};

// Функция для удаления настройки региона по region_id
export const deleteRegionSettingById = async (regionId: number): Promise<void> => {
    try {
        const query = 'DELETE FROM region_settings WHERE region_id = $1';
        await pool.query(query, [regionId]);
    } catch (error) {
        console.error('Error deleting region setting:', error);
        throw new Error('Error deleting region setting from the database');
    }
};

// Универсальная функция для проверки существования настройки региона
export const checkRegionSettingExists = async (value: string | number, type: keyof RegionSettings): Promise<boolean> => {

    // Проверка допустимых типов
    if (type !== 'region_name' && type !== 'region_id') {
        throw new Error('Invalid type provided');
    }

    try {
        const query = `SELECT EXISTS (SELECT 1 FROM region_settings WHERE ${type} = $1) AS exists`;
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.error('Error checking region setting existence:', error);
        throw new Error('Error checking region setting existence in the database');
    }
};

// Универсальная функция для обновления настройки региона
export const updateRegionSetting = async (
    regionId: number,
    updates: Partial<RegionSettings>
): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.region_name) {
        fieldsToUpdate.push(`region_name = $${counter++}`);
        values.push(updates.region_name);
    }
    if (updates.reservation_time_min) {
        fieldsToUpdate.push(`reservation_time = $${counter++}`);
        values.push(updates.reservation_time_min);
    }
    if (updates.query_frequency_days) {
        fieldsToUpdate.push(`query_frequency = $${counter++}`);
        values.push(updates.query_frequency_days);
    }
    if (updates.query_similar_topic_days !== undefined) {
        fieldsToUpdate.push(`similar_topic_days = $${counter++}`);
        values.push(updates.query_similar_topic_days);
    }
    if (updates.polygon) {
        fieldsToUpdate.push(`polygon = $${counter++}`);
        values.push(updates.polygon);
    }

    // Добавляем updated_at, если есть обновления
    if (fieldsToUpdate.length > 0) {
        fieldsToUpdate.push(`updated_at = CURRENT_TIMESTAMP`);
    }

    // Если нет обновляемых полей, выбрасываем ошибку
    if (fieldsToUpdate.length === 0) {
        return { success: false };
    }

    // Формируем окончательный запрос
    const query = `
        UPDATE region_settings
        SET ${fieldsToUpdate.join(', ')}
        WHERE region_id = $${counter}
        RETURNING *`;

    try {
        // Добавляем region_id в параметры запроса
        values.push(regionId);

        // Выполнение запроса
        const result = await pool.query(query, values);

        // Если обновлений не было (например, region_id не существует), возвращаем false
        if (result.rowCount === 0) {
            return { success: false };
        }

        return { success: true };

    } catch (error) {
        console.error('Error updating region setting:', error);
        throw new Error('Error updating region setting in the database');
    }
};
*/
