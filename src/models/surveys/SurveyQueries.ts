import {Survey} from "../../types/tableTypes";
import {QueryResult} from "pg";
import pool from "../index";

//Функция для нахождения недавних типов опросов
export const getRecentSurveyTypesForUser = async (userId: string, querySimilarTopicDays: number): Promise<string[]> => {
    try {
        const query = `
            SELECT DISTINCT s.survey_type
            FROM user_survey_tasks ust
            JOIN surveys s ON ust.survey_id = s.survey_id
            WHERE ust.user_id = $1 AND ust.started_at >= NOW() - $2 * INTERVAL '1 day'
        `;
        const result: QueryResult<{ survey_type: string }> = await pool.query(query, [userId, querySimilarTopicDays]);
        return result.rows?.map(row => row.survey_type)??[];
    } catch (error) {
        console.error("Error fetching recent survey types for user:", error);
        throw new Error("Error fetching recent survey types for user from the database");
    }
};

export const findAvailableSurvey = async (
    userId: string,
    regionId: number,
    recentSurveyTypes: string[]
): Promise<Survey | null> => {
    try {
        let query = `
            SELECT s.*
            FROM surveys s
            LEFT JOIN user_survey_tasks ust
                ON s.survey_id = ust.survey_id
                AND ust.user_id = $1
            WHERE s.region_id = $2
                AND s.status = 'available'
        `;
        if (recentSurveyTypes.length > 0) {
            const formattedRecentSurveyTypes = recentSurveyTypes.map((type) => `'${type}'`).join(", ");
            query += ` AND s.survey_type NOT IN (${formattedRecentSurveyTypes})`; //Исключаем темы, которые уже прошел пользователь
        }

        query += ` AND ust.survey_id IS NULL`; //Проверяем, что пользователь еще не проходил этот опрос
        // Конвертируем массив тем в строку для IN-условия

        const result: QueryResult<Survey> = await pool.query(query, [userId, regionId]);

        // Если найден хотя бы один опрос, возвращаем его
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Error finding available survey:', error);
        throw new Error('Error finding available survey');
    }
};

