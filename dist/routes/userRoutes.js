"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/photoRoutes.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Настройка multer для загрузки изображений
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Маршруты
router.post('/registration', upload.single('photo'), userController_1.registration);
router.post('/check_exist_by_id', userController_1.check_exist_by_id);
exports.default = router;
