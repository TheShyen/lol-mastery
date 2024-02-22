import {defineStore} from "pinia";
import {getFromLocalStorage} from "~/utils/getFromLocalStorage";

export const useAppStore = defineStore('app', () => {
  const recentPlayers = ref<string[]>([])
  function setRecentPlayersFromLocalStorage() {
    const json = getFromLocalStorage('recent')
    if (json) {
      recentPlayers.value = JSON.parse(json)
    }
  }
  return {
    recentPlayers,
    setRecentPlayersFromLocalStorage
  }
})