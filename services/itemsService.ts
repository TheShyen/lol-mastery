import type {ItemFromApi} from "~/types/ItemsType";
import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";

export async function getItemsFromApi():Promise<ItemFromApi> {
  try {
    return await $fetch(urlConstruction(BASE_URL_DATA, 'ru_RU/item.json'))
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}