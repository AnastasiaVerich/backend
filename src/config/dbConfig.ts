// src/config/dbConfig.ts
interface DbConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number; // Порт может быть строкой или undefined, если переменная окружения не задана
}

const dbConfig: DbConfig = {
    user: 'myuser',
    host: 'localhost',
    database: 'test',
    password: 'test',
    port: Number(process.env.PORT_DB) ?? 5432, // Порт может быть строкой, если переменная окружения задана
};

export default dbConfig;
