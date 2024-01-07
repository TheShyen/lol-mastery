import {defineStore} from "pinia";
import getChampionsFromApi from "~/services/championService";
import type {ChampionData} from "~/types/Champions";

function reformatData(data: { [key: string]: ChampionData }): ChampionData[] {
  return Object.keys(data).map(key => {
    return {
      ...data[key],
    };
  });
}
export const useChampionStore = defineStore('champion', () => {
  const champions = ref<ChampionData[]>([])

  async function getChampions() {
    const response = await getChampionsFromApi();
    if (response) {
      champions.value = reformatData(response.data)
    }
  }

  function getChampion(id: string):ChampionData | null {
    return champions.value.find((item) => item.id === id) || null
  }
  return {
    champions,
    getChampions,
    getChampion
  }
})