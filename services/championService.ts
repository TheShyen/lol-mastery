import type {ChampionFullInfoFromApi} from "~/types/ChampionInfo";
import type {ChampionsInfoApi} from "~/types/Champions";
import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_DATA} from "~/constants/baseUrls";


export async function getChampionsFromApi():Promise<ChampionsInfoApi> {
  try {
    return await $fetch(urlConstruction(BASE_URL_DATA, 'ru_RU/champion.json'))
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}

export async function getChampionInfoFromApi(name: string): Promise<ChampionFullInfoFromApi>  {
  try {
    return await $fetch(urlConstruction(BASE_URL_DATA, `ru_RU/champion/${name}.json`))
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}