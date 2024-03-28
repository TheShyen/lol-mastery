import type {Match} from "~/types/Player/PlayerInfo";
import type {DataFramesType} from "~/types/DataFramesType";

export interface AllMatchData {
  matchInfo: Match,
  goldDifference: number[],
  matchChampions: string[],
  dataForGraphs: InfoForDefaultGraph[],
  playersFrames: DataFramesType[]
}
export interface InfoForDefaultGraph {
  playersData: number[],
  teamData: number[],
  name: string
}

