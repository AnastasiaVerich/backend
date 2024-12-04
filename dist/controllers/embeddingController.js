"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identification = void 0;
// src/controllers/embeddingController.ts
const faceapi = __importStar(require("@vladmandic/face-api"));
const embeddingModel_1 = require("../models/embeddingModel");
const embeddingService_1 = require("../services/embeddingService");
// Загрузка моделей face-api
(0, embeddingService_1.loadModels)().catch(console.error);
const identification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(200).send({ status: 2, text: "Нет изображения" });
        }
        const detections = yield (0, embeddingService_1.detectFaces)(req.file.buffer);
        if (detections.length === 0) {
            return res.status(200).send({ status: 2, text: "Лицо не найдено" });
        }
        const embeddingsFromDB = yield (0, embeddingModel_1.getEmbeddingByUserId)(req.body.userId);
        if (embeddingsFromDB.length === 0) {
            return res.status(200).send({ status: 0, text: "user_not_exist" });
        }
        const embeddingFromDB = embeddingsFromDB[0];
        const faceEmbedding = detections[0].descriptor;
        const distance = faceapi.euclideanDistance(faceEmbedding, embeddingFromDB.embedding);
        if (distance < 0.6) {
            return res.status(200).send({ status: 1, text: "success" });
        }
        return res.status(200).send({ status: 0, text: "different_face" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Упс" });
    }
});
exports.identification = identification;
