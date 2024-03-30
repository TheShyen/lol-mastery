import {getRunesFromApi} from "~/services/runesService";
import type {MainRuneType} from "~/types/RunesType";


export const useRunesStore = defineStore('runes', () => {
  const isLoading = ref(false)
  const runes = ref<MainRuneType[]>([])
  async function getRunes() {
    try {
      isLoading.value = true;
      runes.value = await getRunesFromApi();
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }
  return {
    isLoading,
    runes,
    getRunes
  }
})