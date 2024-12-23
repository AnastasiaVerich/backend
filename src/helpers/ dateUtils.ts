export function hasPassedNDays(date: string | Date, NDays:number): {has:boolean, date:string} {
    // Преобразуем входную дату в объект мс
    const inputDate_timestamp = Number(new Date(date));

    // Получаем текущую дату и время
    const currentDate_timestamp = Number(new Date());

    // Преобразуем N дней (N дней = N * 24 * 60 * 60 * 1000 миллисекунд)
    const NDaysInMillis_timestamp = NDays * 24 * 60 * 60 * 1000;

    // Находим +NDays от выбранного времени
    const inputDatePlusNDays_timestamp = inputDate_timestamp+NDaysInMillis_timestamp;


    // Проверяем, прошло ли ровно N дней (с учетом возможных погрешностей в вычислениях)
    return ({has:inputDatePlusNDays_timestamp<=currentDate_timestamp, date: formatTimestamp(inputDatePlusNDays_timestamp)} );
}

function formatTimestamp(timestamp: number): string {
    // Создаем объект Date из метки времени
    const date = new Date(timestamp);

    // Получаем день, месяц, год, часы и минуты
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // месяцы начинаются с 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Форматируем строку в нужном формате
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
