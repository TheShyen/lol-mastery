import {type ChampionsInfoApi} from "~/types/Champions";
import type {_AsyncData} from "#app/composables/asyncData";
import {FetchError} from "ofetch";

export default async function getChampionsFromApi() {
  try {
    const {data: champions}:  _AsyncData<ChampionsInfoApi, FetchError<FetchError> | null> = await useFetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ru_RU/champion.json');
    return champions.value
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}