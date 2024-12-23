import {loadModels} from "../services/embeddingService";

export const initializeModels = async () => {
    try {
        await loadModels();
        console.log("Модели успешно загружены");
    } catch (error) {
        console.error("Ошибка при загрузке моделей:", error);
    }
};
