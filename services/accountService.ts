import type {AllPlayerInfo} from "~/types/Player/PlayerInfo";
import urlConstruction from "~/utils/UrlConstructor";
import type {AllMatchData} from "~/types/AllMatchData";
const proxyUrl = import.meta.env.VITE_APP_PROXY_URL
export async function getSummoner(nick: string, region: string): Promise<AllPlayerInfo> {
  return await $fetch(urlConstruction(proxyUrl, `${region}/summoner/${nick}`))
}

export async function getGame(id: string, region: string): Promise<AllMatchData> {
  return await $fetch(urlConstruction(proxyUrl, `${region}/match/${id}`))
}

export async function getTopPlayers(region: string) {
  return await $fetch(urlConstruction(proxyUrl, `${region}/topPlayers`))
}