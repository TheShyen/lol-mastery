import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";
import {getLanguageEndpoint} from "~/utils/getDataUtils/getLanguageEndpoint";
import type {MainRuneType} from "~/types/RunesType";
import type {SummonerSpellsTypeFromApi} from "~/types/SummonerSpellsType";

export async function getRunesFromApi():Promise<MainRuneType[]> {
  return await $fetch(urlConstruction(BASE_URL_DATA, 'runesReforged.json', `${getLanguageEndpoint()}/`))
}
export async function getSummonerSpellsFromApi():Promise<SummonerSpellsTypeFromApi> {
  return await $fetch(urlConstruction(BASE_URL_DATA, 'summoner.json', `${getLanguageEndpoint()}/`))
}