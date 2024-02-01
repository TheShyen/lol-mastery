import type {SummonerInfo} from "~/types/Account";

export async function getSummoner(nick: string): Promise<SummonerInfo> {
  try {
    return await $fetch(`http://localhost:4000/summoner/${nick}`)
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}