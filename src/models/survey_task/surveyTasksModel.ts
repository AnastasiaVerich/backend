import pool from '../index';
import { QueryResult } from 'pg';
import { SurveyTask } from '../../types/tableTypes';

/*
// Функция для получения всех заданий
export const getAllSurveyTasks = async (): Promise<SurveyTask[]> => {
    try {
        const query = 'SELECT * FROM survey_tasks';
        const result: QueryResult<SurveyTask> = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching survey tasks:', error);
        throw new Error('Error fetching survey tasks from the database');
    }
};

// Функция для получения задания по task_id
export const getSurveyTaskById = async (taskId: number): Promise<SurveyTask | null> => {
    try {
        const query = 'SELECT * FROM survey_tasks WHERE task_id = $1';
        const result: QueryResult<SurveyTask> = await pool.query(query, [taskId]);
        return result.rows[0] ?? null;
    } catch (error) {
        console.error('Error fetching survey task by ID:', error);
        throw new Error('Error fetching survey task by ID from the database');
    }
};

// Функция для получения заданий по survey_id
export const getSurveyTasksBySurveyId = async (surveyId: number): Promise<SurveyTask[]> => {
    try {
        const query = 'SELECT * FROM survey_tasks WHERE survey_id = $1';
        const result: QueryResult<SurveyTask> = await pool.query(query, [surveyId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching survey tasks by survey ID:', error);
        throw new Error('Error fetching survey tasks by survey ID from the database');
    }
};

// Функция для добавления нового задания
export const addSurveyTask = async (
    surveyId: number,
    description: string,
    price: number,
    taskType: string
): Promise<void> => {
    try {
        const query = `
            INSERT INTO survey_tasks (survey_id, description, price, task_type, created_at)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`;
        await pool.query(query, [surveyId, description, price, taskType]);

    } catch (error) {
        console.error('Error adding survey task:', error);
        throw new Error('Error adding survey task to the database');
    }
};

// Функция для удаления задания по task_id
export const deleteSurveyTaskById = async (taskId: number): Promise<void> => {
    try {
        const query = 'DELETE FROM survey_tasks WHERE task_id = $1';
        await pool.query(query, [taskId]);
    } catch (error) {
        console.error('Error deleting survey task:', error);
        throw new Error('Error deleting survey task from the database');
    }
};

// Универсальная функция для проверки существования задания
export const checkExistSurveyTask = async (
    value: string | number,
    field: keyof SurveyTask
): Promise<boolean> => {
    const allowedFields: Array<keyof SurveyTask> = ['task_id', 'survey_id', 'description', 'price', 'task_type', 'created_at'];
    if (!allowedFields.includes(field)) {
        throw new Error(`Invalid field provided. Allowed fields: ${allowedFields.join(', ')}`);
    }

    try {
        const query = `
            SELECT EXISTS (
                SELECT 1
                FROM survey_tasks
                WHERE ${field} = $1
            ) AS exists`;
        const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
        return result.rows[0]?.exists ?? false;
    } catch (error) {
        console.error(`Error checking survey task existence by ${field}:`, error);
        throw new Error(`Error checking survey task existence by ${field} in the database`);
    }
};

// Функция для обновления задания
export const updateSurveyTask = async (
    taskId: number,
    updates: Partial<SurveyTask>
): Promise<{ success: boolean }> => {
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // Подготовка обновляемых полей
    if (updates.survey_id) {
        fieldsToUpdate.push(`survey_id = $${counter++}`);
        values.push(updates.survey_id);
    }
    if (updates.description) {
        fieldsToUpdate.push(`description = $${counter++}`);
        values.push(updates.description);
    }
    if (updates.price) {
        fieldsToUpdate.push(`price = $${counter++}`);
        values.push(updates.price);
    }
    if (updates.task_type) {
        fieldsToUpdate.push(`task_type = $${counter++}`);
        values.push(updates.task_type);
    }

    // Добавляем обновление времени
    if (fieldsToUpdate.length > 0) {
        fieldsToUpdate.push(`updated_at = CURRENT_TIMESTAMP`);
    }

    // Если нет обновляемых полей, возвращаем false
    if (fieldsToUpdate.length === 0) {
        return { success: false };
    }

    const query = `
        UPDATE survey_tasks
        SET ${fieldsToUpdate.join(', ')}
        WHERE task_id = $${counter}
        RETURNING *`;

    try {
        values.push(taskId);
        const result = await pool.query(query, values);

        // Если обновлений не было, возвращаем false
        if (result.rowCount === 0) {
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating survey task:', error);
        throw new Error('Error updating survey task in the database');
    }
};
*/
