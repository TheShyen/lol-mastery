import type {AllPlayerInfo, Match} from "~/types/Player/PlayerInfo";

export async function getSummoner(nick: string): Promise<AllPlayerInfo> {
  try {
    return await $fetch(`http://localhost:4000/summoner/${nick}`)
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}

export async function getGame(id: string): Promise<Match> {
  try {
    return await $fetch(`http://localhost:4000/match/${id}`)
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}