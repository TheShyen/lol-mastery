import type {AllPlayerInfo, Match} from "~/types/Player/PlayerInfo";
import urlConstruction from "~/utils/UrlConstructor";
const proxyUrl = import.meta.env.VITE_APP_PROXY_URL
export async function getSummoner(nick: string, region: string): Promise<AllPlayerInfo> {
  try {
    //`http://localhost:4000/summoner/${nick}`
    return await $fetch(urlConstruction(proxyUrl, `${region}/summoner/${nick}`))
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}

export async function getGame(id: string, region: string): Promise<Match> {
  try {
    return await $fetch(urlConstruction(proxyUrl, `${region}/match/${id}`))
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}