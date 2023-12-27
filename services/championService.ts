import {type ChampionsInfoApi} from "~/types/Champions";

export default async function getChampionsFromApi() {
  try {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ru_RU/champion.json');
    const data: ChampionsInfoApi = await response.json();
    return data;
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}