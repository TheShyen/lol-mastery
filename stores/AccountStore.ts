import {getSummoner} from "~/services/accountService";

export const useAccountStore = defineStore('account', () => {
  const isLoading = ref(false)
  async function getAccountInfo(nick: string) {
    try {
      isLoading.value = true;
      return await getSummoner(nick)
    } catch (err) {
      showError('Ошибка')
      console.error(err)
      return null
    } finally {
      isLoading.value = false;
    }

  }
  return {
    isLoading,
    getAccountInfo
  }
})