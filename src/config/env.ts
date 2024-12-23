import dotenv from 'dotenv';
// Загрузка переменных окружения
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CORS_URL = process.env.CORS_URL ? process.env.CORS_URL.split(',') : [];
export const PORT_DB = process.env.PORT_DB ?? 5432;
