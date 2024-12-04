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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModels = loadModels;
exports.detectFaces = detectFaces;
// src/services/embeddingService.ts
const faceapi = __importStar(require("@vladmandic/face-api"));
const path_1 = __importDefault(require("path"));
const tf = __importStar(require("@tensorflow/tfjs-node"));
// Функция для загрузки моделей
function loadModels() {
    return __awaiter(this, void 0, void 0, function* () {
        const modelsPath = path_1.default.join(__dirname, "ia_models");
        // Загружаем модели для обнаружения лиц, маркировки и эмбеддингов
        yield faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath); // Обнаружение лиц
        yield faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath); // Маркировка лиц
        yield faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath); // Эмбеддинги
        console.log("Модели загружены.");
    });
}
// Функция для обнаружения лиц на изображении
function detectFaces(imageBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        // Преобразуем изображение в тензор с помощью TensorFlow.js
        const tensor = tf.node.decodeImage(imageBuffer);
        // Получаем все лица с их маркерами и дескрипторами
        const detections = yield faceapi
            .detectAllFaces(tensor)
            .withFaceLandmarks()
            .withFaceDescriptors();
        return detections;
    });
}
