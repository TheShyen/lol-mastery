import type {Match} from "~/types/Player/PlayerInfo";

export interface AllMatchData {
  matchInfo: Match,
  goldDifference: number[],
  matchChampions: string[],
  dataForGraphs: InfoForDefaultGraph[]
}
export interface InfoForDefaultGraph {
  playersData: number[],
  teamData: number[],
  name: string
}
