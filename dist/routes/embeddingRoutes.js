"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/embeddingRoutes.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const embeddingController_1 = require("../controllers/embeddingController");
const router = (0, express_1.Router)();
// Настройка multer для загрузки изображений
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// Маршрут для верификации
router.post('/identification', upload.single('photo'), embeddingController_1.identification);
exports.default = router;
