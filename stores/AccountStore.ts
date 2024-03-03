import {getGame, getSummoner} from "~/services/accountService";
import {REGION_FOR_API, REGION_NAME} from "~/constants/region";
import {getFromLocalStorage} from "~/utils/getFromLocalStorage";

export const useAccountStore = defineStore('account', () => {
  const isLoading = ref(false)
  const region = ref(REGION_NAME.RU)
  
  function setRegionFromLocalStorage() {
    const json = getFromLocalStorage('region')
    if (json) {
      region.value = JSON.parse(json)
    }
  }
  async function getAccountInfo(nick: string) {
    try {
      isLoading.value = true;
      return await getSummoner(nick, REGION_FOR_API[region.value])
    } catch (err) {
      console.error(err)
      showError('Ошибка')
      return null
    } finally {
      isLoading.value = false;
    }
  }
  async function getGameInfo(id: string) {
    try {
      isLoading.value = true;
      return await getGame(id, REGION_FOR_API[region.value])
    } catch (err) {
      console.error(err)
      showError('Ошибка')
      return null
    } finally {
      isLoading.value = false;
    }
  }
  return {
    isLoading,
    region,
    setRegionFromLocalStorage,
    getAccountInfo,
    getGameInfo
  }
})