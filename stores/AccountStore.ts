import {getGame, getSummoner} from "~/services/accountService";

export const useAccountStore = defineStore('account', () => {
  const isLoading = ref(false)
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
    getAccountInfo,
    getGameInfo
  }
})