
import type {ChampionFullInfoFromApi} from "~/types/ChampionInfo";
import type {ChampionsInfoApi} from "~/types/Champions";

export async function getChampionsFromApi():Promise<ChampionsInfoApi> {
  try {
    return await $fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ru_RU/champion.json')
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}

export async function getChampionInfoFromApi(name: string): Promise<ChampionFullInfoFromApi>  {
  try {
    return await $fetch(`https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ru_RU/champion/${name}.json`)
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}