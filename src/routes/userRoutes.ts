// src/routes/photoRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { registration, check_exist_by_id } from '../controllers/userController';

const router = Router();

// Настройка multer для загрузки изображений
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Маршруты
router.post('/registration', upload.single('photo'), registration);
router.post('/check_exist_by_id', check_exist_by_id);

export default router;
