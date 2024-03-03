import {defineStore} from "pinia";
import {getFromLocalStorage} from "~/utils/getFromLocalStorage";
import {addToLocalStorage} from "~/utils/addToLocalStorage";

export const useAppStore = defineStore('app', () => {
  const recentPlayers = ref<string[]>([])
  function setRecentPlayersFromLocalStorage() {
    const json = getFromLocalStorage('recent')
    if (json) {
      recentPlayers.value = JSON.parse(json)
    }
  }
  function addPlayerToRecentList(nick: string) {
    nick = nick.replace('+', '#')
    if (!recentPlayers.value.includes(nick)) {
      recentPlayers.value.unshift(nick)
      recentPlayers.value = recentPlayers.value.slice(0, 5)
      addToLocalStorage('recent', JSON.stringify(recentPlayers.value))
    }
  }
  return {
    recentPlayers,
    setRecentPlayersFromLocalStorage,
    addPlayerToRecentList
  }
})