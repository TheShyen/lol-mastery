import {type ChampionsInfoApi} from "~/types/Champions";
import type {_AsyncData} from "#app/composables/asyncData";
import {FetchError} from "ofetch";
import type { ChampionFullInfoFromApi} from "~/types/ChampionInfo";

export async function getChampionsFromApi() {
  try {
    const {data: champions}:  _AsyncData<ChampionsInfoApi, FetchError<FetchError> | null> = await useFetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ru_RU/champion.json');
    return champions.value
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}

export async function getChampionInfoFromApi(name: string)  {
  try {
    const {data: champion}:  _AsyncData<ChampionFullInfoFromApi, FetchError<FetchError> | null> = await useFetch(`https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ru_RU/champion/${name}.json`);
    return champion.value
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}