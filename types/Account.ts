export interface Puuid {
  puuid: string,
  gameName: string,
  tagLine: string
}

export interface SummonerInfo {
  id: string,
  accountId: string,
  puuid: string,
  name: string,
  profileIconId: number,
  revisionDate: number,
  summonerLevel: number
}