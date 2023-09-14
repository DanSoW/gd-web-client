/* Константы */
import Api from "src/constants/api";
import { empty } from "src/types/empty";

/**
 * Преобразование DataURL в файл
 * @param dataURL DataURL файла
 * @param filename Название файла
 * @returns {File} Файл
 */
export const dataURLToFile = (dataURL: string, filename: string) => {
  if (dataURL.length === 0) {
    return null;
  }

  let arr = dataURL.split(","),
    // @ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * Операция получение по файлу его DataURL
 * @param file Файл для получения DataURL
 * @returns {Promise<string>}
 */
export const readAsUrl = async (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => resolve(ev?.target?.result as string);
    reader.onerror = (ev) => reject(ev);

    reader.readAsDataURL(file);
  });

/**
 * Функция конвертации URI в Blob объект
 * @param {string} dataURI URI
 * @returns {Blob} Blob
 */
export const dataURLToBlob = (dataURL: string) => {
  // Конвертация base64 в необработанные бинарные данные, хранящиеся в строке
  var byteString = atob(dataURL.split(",")[1]);

  // Выделение компонента MIME
  var mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

  // Запись байтов строки в буфер массива
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

/**
 * Конвертация экземпляра объекта Blob в File
 * @param blob
 * @param fileName Название файла
 */
export const BlobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { type: blob.type });
};

/**
 * Функция для проверки ссылки в качестве URL-адреса на ресурс
 * @param {string} dataURI URL для проверки
 * @returns {boolean} Результат проверки (true - корректная ссылка, false - некорректная ссылка)
 */
export const isDataURL = (
  dataURI: string,
  address = Api.MAIN_SERVER
): boolean => {
  return dataURI.includes(address);
};

/**
 * Функция получения абсолютного пути к файлу на сервере
 * @param {string} address Относительный адрес файла
 * @param {*} server Адрес сервера, где расположены статические файлы (публичные файлы)
 * @returns {string} Абсолютный путь к файлу на сервере
 */
export const getPublicAddress = (
  address: string | empty,
  server: string = Api.MAIN_SERVER
) => {
  if (!address) {
    return "";
  }

  return `${server}/${address}`;
};
