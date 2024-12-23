import pool from '../index';
import { QueryResult } from 'pg';
import { UserSurveyTask } from '../../types/tableTypes';
//
// // Функция для получения всех записей выполнения заданий
// export const getAllUserSurveyTasks = async (): Promise<UserSurveyTask[]> => {
//     try {
//         const query = 'SELECT * FROM user_survey_tasks';
//         const result: QueryResult<UserSurveyTask> = await pool.query(query);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching user survey tasks:', error);
//         throw new Error('Error fetching user survey tasks from the database');
//     }
// };
//
// // Функция для получения записи выполнения задания по progress_id
// export const getUserSurveyTaskById = async (progressId: number): Promise<UserSurveyTask | null> => {
//     try {
//         const query = 'SELECT * FROM user_survey_tasks WHERE progress_id = $1';
//         const result: QueryResult<UserSurveyTask> = await pool.query(query, [progressId]);
//         return result.rows[0] ?? null;
//     } catch (error) {
//         console.error('Error fetching user survey task by ID:', error);
//         throw new Error('Error fetching user survey task by ID from the database');
//     }
// };
//
// // Функция для получения записей выполнения заданий по user_id
// export const getUserSurveyTasksByUserId = async (userId: string): Promise<UserSurveyTask[]> => {
//     try {
//         const query = 'SELECT * FROM user_survey_tasks WHERE user_id = $1';
//         const result: QueryResult<UserSurveyTask> = await pool.query(query, [userId]);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching user survey tasks by user ID:', error);
//         throw new Error('Error fetching user survey tasks by user ID from the database');
//     }
// };
//
// // Функция для добавления новой записи выполнения задания
// export const addUserSurveyTask = async (
//     userId: string,
//     surveyId: number,
//     taskId: number | null,
//     progressPercentage: number,
//     status: string
// ): Promise<void> => {
//     try {
//         const query = `
//             INSERT INTO user_survey_tasks (user_id, survey_id, task_id, progress_percentage, status, started_at)
//             VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
//             RETURNING *`;
//         await pool.query(query, [
//             userId,
//             surveyId,
//             taskId,
//             progressPercentage,
//             status,
//         ]);
//     } catch (error) {
//         console.error('Error adding user survey task:', error);
//         throw new Error('Error adding user survey task to the database');
//     }
// };
//
// // Функция для удаления записи выполнения задания по progress_id
// export const deleteUserSurveyTaskById = async (progressId: number): Promise<void> => {
//     try {
//         const query = 'DELETE FROM user_survey_tasks WHERE progress_id = $1';
//         await pool.query(query, [progressId]);
//     } catch (error) {
//         console.error('Error deleting user survey task:', error);
//         throw new Error('Error deleting user survey task from the database');
//     }
// };
//
// // Универсальная функция для проверки существования записи
// export const checkExistUserSurveyTask = async (
//     value: string | number,
//     field: keyof UserSurveyTask
// ): Promise<boolean> => {
//     const allowedFields: Array<keyof UserSurveyTask> = [
//         'progress_id',
//         'user_id',
//         'survey_id',
//         'task_id',
//         'progress_percentage',
//         'status',
//         'started_at',
//         'completed_at',
//     ];
//     if (!allowedFields.includes(field)) {
//         throw new Error(`Invalid field provided. Allowed fields: ${allowedFields.join(', ')}`);
//     }
//
//     try {
//         const query = `
//             SELECT EXISTS (
//                 SELECT 1
//                 FROM user_survey_tasks
//                 WHERE ${field} = $1
//             ) AS exists`;
//         const result: QueryResult<{ exists: boolean }> = await pool.query(query, [value]);
//         return result.rows[0]?.exists ?? false;
//     } catch (error) {
//         console.error(`Error checking user survey task existence by ${field}:`, error);
//         throw new Error(`Error checking user survey task existence by ${field} in the database`);
//     }
// };
//
// // Функция для обновления записи выполнения задания
// export const updateUserSurveyTask = async (
//     progressId: number,
//     updates: Partial<UserSurveyTask>
// ): Promise<{ success: boolean }> => {
//     const fieldsToUpdate: string[] = [];
//     const values: any[] = [];
//     let counter = 1;
//
//     // Подготовка обновляемых полей
//     if (updates.user_id) {
//         fieldsToUpdate.push(`user_id = $${counter++}`);
//         values.push(updates.user_id);
//     }
//     if (updates.survey_id) {
//         fieldsToUpdate.push(`survey_id = $${counter++}`);
//         values.push(updates.survey_id);
//     }
//     if (updates.task_id !== undefined) {
//         fieldsToUpdate.push(`task_id = $${counter++}`);
//         values.push(updates.task_id);
//     }
//     if (updates.progress_percentage !== undefined) {
//         fieldsToUpdate.push(`progress_percentage = $${counter++}`);
//         values.push(updates.progress_percentage);
//     }
//     if (updates.status) {
//         fieldsToUpdate.push(`status = $${counter++}`);
//         values.push(updates.status);
//     }
//     if (updates.completed_at !== undefined) {
//         fieldsToUpdate.push(`completed_at = $${counter++}`);
//         values.push(updates.completed_at);
//     }
//
//     // Добавляем обновление времени
//     if (fieldsToUpdate.length > 0) {
//         fieldsToUpdate.push(`updated_at = CURRENT_TIMESTAMP`);
//     }
//
//     // Если нет обновляемых полей, возвращаем false
//     if (fieldsToUpdate.length === 0) {
//         return { success: false };
//     }
//
//     const query = `
//         UPDATE user_survey_tasks
//         SET ${fieldsToUpdate.join(', ')}
//         WHERE progress_id = $${counter}
//         RETURNING *`;
//
//     try {
//         values.push(progressId);
//         const result = await pool.query(query, values);
//
//         // Если обновлений не было, возвращаем false
//         if (result.rowCount === 0) {
//             return { success: false };
//         }
//
//         return { success: true };
//     } catch (error) {
//         console.error('Error updating user survey task:', error);
//         throw new Error('Error updating user survey task in the database');
//     }
// };
//

