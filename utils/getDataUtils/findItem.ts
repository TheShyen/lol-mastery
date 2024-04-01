import type {RuneType} from "~/types/RunesType";
import type {SummonerSpell} from "~/types/SummonerSpellsType";

export function findItem(data: RuneType[] | SummonerSpell[], target: number) {
  return data.find(item => +item.key === target)
}