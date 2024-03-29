import type {ItemFromApi} from "~/types/ItemsType";
import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";
import {getLanguageEndpoint} from "~/utils/getDataUtils/getLanguageEndpoint";

export async function getRunesFromApi():Promise<ItemFromApi> {
  return await $fetch(urlConstruction(BASE_URL_DATA, 'runesReforged.json', `${getLanguageEndpoint()}/`))
}