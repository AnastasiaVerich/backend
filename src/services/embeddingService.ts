// src/services/embeddingService.ts
import * as faceapi from "@vladmandic/face-api";
import path from "path";
import * as tf from "@tensorflow/tfjs-node";
import {ComputeAllFaceDescriptorsTask, FaceDetection, WithFaceLandmarks} from "@vladmandic/face-api";

// Функция для загрузки моделей
export async function loadModels(): Promise<void> {
    const modelsPath = path.join(__dirname, "ia_models");

    // Загружаем модели для обнаружения лиц, маркировки и эмбеддингов
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath); // Обнаружение лиц
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath); // Маркировка лиц
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath); // Эмбеддинги

    console.log("Модели загружены.");
}

// Функция для обнаружения лиц на изображении
export async function detectFaces(imageBuffer: Buffer): Promise<ComputeAllFaceDescriptorsTask<WithFaceLandmarks<{
    detection: FaceDetection
}>>> {
    // Преобразуем изображение в тензор с помощью TensorFlow.js
    const tensor: tf.Tensor3D | tf.Tensor4D = tf.node.decodeImage(imageBuffer);

    // Получаем все лица с их маркерами и дескрипторами
    const detections = await faceapi
        .detectAllFaces(tensor as unknown as faceapi.TNetInput)
        .withFaceLandmarks()
        .withFaceDescriptors();

    return detections;
}
