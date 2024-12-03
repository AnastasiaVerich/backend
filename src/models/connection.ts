// src/db/dbConnection.ts
import { Pool } from 'pg';
import dbConfig from '../config/dbConfig';

// Настройка подключения к базе данных
const pool = new Pool(dbConfig);

// Экспорт объекта pool для использования в других модулях
export default pool;
