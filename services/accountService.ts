import type {AllPlayerInfo, Match} from "~/types/Player/PlayerInfo";
import urlConstruction from "~/utils/UrlConstructor";
const proxyUrl = import.meta.env.VITE_APP_PROXY_URL
export async function getSummoner(nick: string, region: string): Promise<AllPlayerInfo> {
  return await $fetch(urlConstruction(proxyUrl, `${region}/summoner/${nick}`))
}

export async function getGame(id: string, region: string): Promise<Match> {
  return await $fetch(urlConstruction(proxyUrl, `${region}/match/${id}`))
}