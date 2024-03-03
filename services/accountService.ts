import type {AllPlayerInfo, Match} from "~/types/Player/PlayerInfo";
import urlConstruction from "~/utils/UrlConstructor";
const proxyUrl = import.meta.env.VITE_APP_PROXY_URL
export async function getSummoner(nick: string, region: string): Promise<AllPlayerInfo> {
  let baseUrl: string;

  if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://radiant-tanuki-4cd95c.netlify.app/';
  } else {
    baseUrl = proxyUrl;
  }

  return await $fetch(urlConstruction(baseUrl, `${region}/summoner/${nick}`));
}

export async function getGame(id: string, region: string): Promise<Match> {
  let baseUrl: string;

  if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://radiant-tanuki-4cd95c.netlify.app/';
  } else {
    baseUrl = proxyUrl;
  }
  return await $fetch(urlConstruction(baseUrl, `${region}/match/${id}`))
}