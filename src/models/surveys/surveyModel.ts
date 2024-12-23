import pool from '../index';
import {QueryResult} from 'pg';
import {Survey, survey_status_enum, survey_type_enum} from '../../types/tableTypes';


// метод для резервирования опросов
export const reserveSurvey = async (surveyId: number): Promise<{ success: boolean }> => {


    try {
        const query = `
             UPDATE surveys
             SET status = 'reserved', reserved_until = NOW() + INTERVAL '1 hour'
             WHERE survey_id = $1
             RETURNING *`;

        const result = await pool.query(query, [surveyId]);

        // Если обновлений не было, возвращаем false
        if (result.rowCount === 0) {
            return {success: false};
        }

        return {success: true};
    } catch (error) {
        console.error('Error updating survey:', error);
        throw new Error('Error updating survey in the database');
    }
};

//метод сброса истекших брони при запросах к серверу
export const checkAndUpdateSurveyStatus = async (): Promise<{ success: boolean }> => {
    try {
        const query = `
            UPDATE surveys
            SET status = 'available'
            WHERE status = 'reserved' AND reserved_until <= NOW();`;
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            return {success: false};
        }
        return {success: true};
    } catch (error) {
        console.error("Error resetting reserved surveys:", error);
        throw new Error("Failed to reset survey statuses");
    }
};

//
// // Функция для получения опросов по региону и статусу
// export const getAllSurveysByRegionAndStatus = async (region_id: number, status: survey_status_enum,): Promise<Survey[]> => {
//     try {
//         const query = 'SELECT * FROM surveys WHERE region=$1 AND status = $2';
//         const result: QueryResult<Survey> = await pool.query(query, [region_id, status]);
//         return result.rows
//     } catch (error) {
//         console.error('Error fetching survey by ID:', error);
//         throw new Error('Error fetching survey by ID from the database');
//     }
// };
//
// // Функция для получения всех опросов
// export const getAllSurveys = async (): Promise<Survey[]> => {
//     try {
//         const query = 'SELECT * FROM surveys';
//         const result: QueryResult<Survey> = await pool.query(query);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching surveys:', error);
//         throw new Error('Error fetching surveys from the database');
//     }
// };
//
// // Функция для получения опроса по survey_id
// export const getSurveyById = async (surveyId: number): Promise<Survey | null> => {
//     try {
//         const query = 'SELECT * FROM surveys WHERE survey_id = $1';
//         const result: QueryResult<Survey> = await pool.query(query, [surveyId]);
//         return result.rows[0] ?? null;
//     } catch (error) {
//         console.error('Error fetching survey by ID:', error);
//         throw new Error('Error fetching survey by ID from the database');
//     }
// };
//
// // Функция для добавления нового опроса
// export const addSurvey = async (regionId: number, surveyType: string, topic: string): Promise<Survey> => {
//     try {
//         const query = `
//             INSERT INTO surveys (region_id, survey_type, topic, created_at, updated_at)
//             VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//             RETURNING *`;
//         const result: QueryResult<Survey> = await pool.query(query, [regionId, surveyType, topic]);
//         return result.rows[0];
//     } catch (error) {
//         console.error('Error adding survey:', error);
//         throw new Error('Error adding survey to the database');
//     }
// };
//
// // Функция для удаления опроса по survey_id
// export const deleteSurveyById = async (surveyId: number): Promise<void> => {
//     try {
//         const query = 'DELETE FROM surveys WHERE survey_id = $1';
//         await pool.query(query, [surveyId]);
//     } catch (error) {
//         console.error('Error deleting survey:', error);
//         throw new Error('Error deleting survey from the database');
//     }
// };
//
// // Универсальная функция для проверки существования записи в таблице surveys
// export const checkExistSurvey = async (value: string | number | object | survey_type_enum | survey_status_enum, type: keyof Survey): Promise<boolean> => {
//     const allowedFields: Array<keyof Survey> = ['survey_id', 'region_id', 'survey_type', 'topic', 'created_at', 'updated_at'];
//     if (!allowedFields.includes(type)) {
//         throw new Error(`Invalid field provided. Allowed fields: ${allowedFields.join(', ')}`);
//     }
//
//     try {
//         const query = `
//             SELECT EXISTS (
//                 SELECT 1
//                 FROM surveys
//                 WHERE ${type} = $1
//             ) AS exists`;
//         const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
//         return result.rows[0]?.exists ?? false;
//     } catch (error) {
//         console.error(`Error checking survey existence by ${type}:`, error);
//         throw new Error(`Error checking survey existence by ${type} in the database`);
//     }
// };
//
// // Функция для обновления опроса
// export const updateSurvey = async (surveyId: number, updates: Partial<Survey>): Promise<{ success: boolean }> => {
//     const fieldsToUpdate: string[] = [];
//     const values: any[] = [];
//     let counter = 1;
//
//     // Подготовка обновляемых полей
//     if (updates.region_id) {
//         fieldsToUpdate.push(`region_id = $${counter++}`);
//         values.push(updates.region_id);
//     }
//     if (updates.status) {
//         fieldsToUpdate.push(`status = $${counter++}`);
//         values.push(updates.status);
//     }
//     if (updates.survey_type) {
//         fieldsToUpdate.push(`survey_type = $${counter++}`);
//         values.push(updates.survey_type);
//     }
//     if (updates.topic) {
//         fieldsToUpdate.push(`topic = $${counter++}`);
//         values.push(updates.topic);
//     }
//
//     // Добавляем обновление времени
//     if (fieldsToUpdate.length > 0) {
//         fieldsToUpdate.push(`updated_at = CURRENT_TIMESTAMP`);
//     }
//
//     // Если нет обновляемых полей, возвращаем ошибку
//     if (fieldsToUpdate.length === 0) {
//         return {success: false};
//     }
//
//     const query = `
//         UPDATE surveys
//         SET ${fieldsToUpdate.join(', ')}
//         WHERE survey_id = $${counter}
//         RETURNING *`;
//
//     try {
//         values.push(surveyId);
//         const result = await pool.query(query, values);
//
//         // Если обновлений не было, возвращаем false
//         if (result.rowCount === 0) {
//             return {success: false};
//         }
//
//         return {success: true};
//     } catch (error) {
//         console.error('Error updating survey:', error);
//         throw new Error('Error updating survey in the database');
//     }
// };
//
