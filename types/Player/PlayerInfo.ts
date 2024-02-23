import type {Teams} from "~/types/Player/Teams";
import type {rankMap} from "~/constants/ranks";
import type {PlayerPerformance} from "~/types/Player/PlayerPerformance";


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
  participants: PlayerPerformance[];
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
export interface GameModeStat {
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
export interface Match {
  info: MatchInfo;
  metadata: MatchMetadata
}

export interface AllPlayerInfo {
  accountInfo: AccountInfo;
  matchList: Match[];
  playerPerformances: PlayerPerformance[];
  gameModesStats: GameModeStat[];
  championMastery: ChampionMastery[]
}


