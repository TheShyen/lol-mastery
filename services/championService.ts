import type {ChampionFullInfoFromApi} from "~/types/ChampionInfo";
import type {ChampionsInfoApi} from "~/types/Champions";
import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";
import {getLanguageEndpoint} from "~/utils/getDataUtils/getLanguageEndpoint";


export async function getChampionsFromApi():Promise<ChampionsInfoApi> {
  return await $fetch(urlConstruction(BASE_URL_DATA, 'champion.json', `${getLanguageEndpoint()}/`))
}

export async function getChampionInfoFromApi(name: string): Promise<ChampionFullInfoFromApi>  {
  return await $fetch(urlConstruction(BASE_URL_DATA, `champion/${name}.json`, `${getLanguageEndpoint()}/`))
}