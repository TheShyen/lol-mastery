import {getSummoner} from "~/services/accountService";

export const useAccountStore = defineStore('account', () => {
  const accountInfo = ref(null)

  function getAccountInfo(nick: string) {
    return getSummoner(nick)
  }
  return {
    accountInfo,
    getAccountInfo
  }
})