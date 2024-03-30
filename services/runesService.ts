import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";
import {getLanguageEndpoint} from "~/utils/getDataUtils/getLanguageEndpoint";
import type {MainRuneType} from "~/types/RunesType";

export async function getRunesFromApi():Promise<MainRuneType[]> {
  return await $fetch(urlConstruction(BASE_URL_DATA, 'runesReforged.json', `${getLanguageEndpoint()}/`))
}