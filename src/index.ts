import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes";
import embeddingRoutes from "./routes/embeddingRoutes";
//import embeddingRoutes from "./routes/embeddingRoutes";

// Загрузка переменных окружения
dotenv.config();
// Создаём приложение Express
const app = express();
const port = process.env.PORT || 3000;

// Определяем список разрешённых источников для CORS
const allowedOrigins = process.env.CORS_URL ? process.env.CORS_URL.split(',') : [];
// Конфигурация CORS
app.use(cors({
    origin: (origin, callback) => {
        // Если origin пустой (например, при запросах с серверов или в тестах), разрешаем
        if (!origin) return callback(null, true);

        // Проверка, если origin в списке разрешенных источников
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// ограничивает размер запросов с телом в формате JSON
app.use(bodyParser.json({ limit: '10mb' }));

// Роуты
app.use('/api/users', userRoutes);
app.use('/api/embeddings', embeddingRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
