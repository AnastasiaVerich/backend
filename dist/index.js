"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const embeddingRoutes_1 = __importDefault(require("./routes/embeddingRoutes"));
//import embeddingRoutes from "./routes/embeddingRoutes";
// Загрузка переменных окружения
dotenv_1.default.config();
// Создаём приложение Express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Определяем список разрешённых источников для CORS
const allowedOrigins = process.env.CORS_URL ? process.env.CORS_URL.split(',') : [];
// Конфигурация CORS
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Если origin пустой (например, при запросах с серверов или в тестах), разрешаем
        if (!origin)
            return callback(null, true);
        // Проверка, если origin в списке разрешенных источников
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.log(origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
// ограничивает размер запросов с телом в формате JSON
app.use(body_parser_1.default.json({ limit: '10mb' }));
// Роуты
app.use('/api/users', userRoutes_1.default);
app.use('/api/embeddings', embeddingRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
