import type {PlayerGameStat} from "~/types/Player/PlayerGameStat";
import type {Teams} from "~/types/Player/Teams";
import type {rankMap} from "~/constants/ranks";

export interface Puuid {
  puuid: string,
  gameName: string,
  tagLine: string
}

export interface AccountInfo {
  id: string,
  accountId: string,
  puuid: string,
  name: string,
  profileIconId: number,
  revisionDate: number,
  summonerLevel: number
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  lastPlayTime: number;
  puuid: string;
  summonerId: string;
  tokensEarned: number;
}

export interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: PlayerGameStat[];
  platformId: string;
  queueId: number;
  teams: Teams[];
  tournamentCode: string;
}
export interface MatchMetadata {
    dataVersion: string;
    matchId: string;
    participants: string[]
}
export interface RankInfo {
  freshBlood: boolean;
  hotStreak: boolean;
  inactive: boolean;
  leagueId: string;
  leaguePoints: number;
  losses: number;
  queueType: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  tier: keyof typeof rankMap;
  veteran: boolean;
  wins: number;
}


export interface AllPlayerInfo {
  accountInfo: AccountInfo;
  matchList: {
    info: MatchInfo;
    metadata: MatchMetadata
  }[];
  playerGameStats: PlayerGameStat[];
  rankInfo: RankInfo[];
  championMastery: ChampionMastery[]
}


