import type {ItemFromApi} from "~/types/ItemsType";
import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";
import {getLanguageEndpoint} from "~/utils/getDataUtils/getLanguageEndpoint";

export async function getItemsFromApi():Promise<ItemFromApi> {
  try {
    return await $fetch(urlConstruction(BASE_URL_DATA, 'item.json', `${getLanguageEndpoint()}/`))
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}