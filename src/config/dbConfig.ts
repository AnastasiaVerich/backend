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
    database: 'test2',
    password: 'test2',
    port: 5432, // Порт может быть строкой, если переменная окружения задана
};

export default dbConfig;
