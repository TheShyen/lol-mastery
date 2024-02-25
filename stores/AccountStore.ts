import {getGame, getSummoner} from "~/services/accountService";
import {REGION_NAME} from "~/constants/region";

export const useAccountStore = defineStore('account', () => {
  const isLoading = ref(false)
  const region = ref(REGION_NAME.RU)
  async function getAccountInfo(nick: string) {
    try {
      isLoading.value = true;
      return await getSummoner(nick)
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
      return await getGame(id)
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
    getAccountInfo,
    getGameInfo
  }
})