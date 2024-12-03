// src/routes/embeddingRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { verification } from '../controllers/embeddingController';

const router = Router();

// Настройка multer для загрузки изображений
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Маршрут для верификации
router.post('/verification', upload.single('photo'), verification);

export default router;
