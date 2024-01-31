import {API_KEY} from "~/constants/apiKey";
import type {Puuid, SummonerInfo} from "~/types/Account";

async function getPUUID(nick:string):Promise<Puuid> {
  const nickName = nick.split("#").join('/')
  try {
    return await $fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nickName}?api_key=${API_KEY}`)
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}

export async function getSummoner(nick: string): Promise<SummonerInfo> {
  const {puuid} = await getPUUID(nick)
  try {
    return await $fetch(`https://ru.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`)
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}