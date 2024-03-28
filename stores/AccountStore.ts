import {getGame, getSummoner, getTopPlayers} from "~/services/accountService";
import {REGION_FOR_API, REGION_NAME} from "~/constants/region";
import {getFromLocalStorage} from "~/utils/getDataUtils/getFromLocalStorage";
import {getChampionInfoFromApi} from "~/services/championService";

export const useAccountStore = defineStore('account', () => {
  const isLoading = ref(false)
  const region = ref(REGION_NAME.RU)
  const matchChampions = ref<string[]>([])

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
      showError( {cause: 'accountErrorName', statusMessage: 'accountError'})
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
      showError( {cause: 'pageNotFound', statusMessage: 'pageNotFoundMessage'})
      return null
    } finally {
      isLoading.value = false;
    }
  }
  
  async function getTopPlayersInfo() {
    try {
      isLoading.value = true;
      return await getTopPlayers(REGION_FOR_API[region.value])
    } catch (err) {
      console.error(err)
      showError( {cause: 'pageNotFound', statusMessage: 'pageNotFoundMessage'})
      return null
    } finally {
      isLoading.value = false;
    }
  }
  async function getMatchChampions(champions: string[]) {
    try {
      matchChampions.value = champions
      const championPromises = champions.map(async champion => {
        const response = await getChampionInfoFromApi(champion)
        return response.data[champion]
      });
      return await Promise.all(championPromises);
    } catch (err) {
      console.error(err)
      showError( {cause: 'pageNotFound', statusMessage: 'pageNotFoundMessage'})
      return null
    } finally {
      isLoading.value = false;
    }
  }
  return {
    isLoading,
    region,
    matchChampions,
    setRegionFromLocalStorage,
    getAccountInfo,
    getGameInfo,
    getTopPlayersInfo,
    getMatchChampions
  }
})