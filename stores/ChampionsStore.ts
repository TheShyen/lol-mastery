import {defineStore} from "pinia";
import getChampionsFromApi from "~/services/championService";
import type {ChampionData, ChampionsInfoApi} from "~/types/Champions";

function reformatData(data: { [key: string]: ChampionData }): ChampionData[] {
  return Object.values(data).sort((a, b) => a.name.localeCompare(b.name))
}
export const useChampionStore = defineStore('champion', () => {
  const champions = ref<ChampionData[]>([])

  async function getChampions() {
    const response = await getChampionsFromApi();
    if (response) {
      champions.value = reformatData(response.data)
    }

  }
  return {
    champions,
    getChampions
  }
})