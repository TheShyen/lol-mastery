import {defineStore} from "pinia";
import {getChampionInfoFromApi, getChampionsFromApi} from "~/services/championService";
import type {ChampionData} from "~/types/Champions";


function reformatData(data: { [key: string]: ChampionData }): ChampionData[] {
  return Object.values(data).sort((a, b) => a.name.localeCompare(b.name))
}
export const useChampionStore = defineStore('champions', () => {
  const champions = ref<ChampionData[]>([])
  const isLoading = ref(false)
  async function getChampions() {
    try {
      isLoading.value = true;
      const response = await getChampionsFromApi();
      champions.value = reformatData(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }

  async function getChampion(name: string) {
    try {
      isLoading.value = true;
      const response =  await getChampionInfoFromApi(name)
      return response.data[name]
    } catch (err) {
      console.error(err)
      return null
    } finally {
      isLoading.value = false;
    }

  }
  return {
    isLoading,
    champions,
    getChampions,
    getChampion,
  }
})