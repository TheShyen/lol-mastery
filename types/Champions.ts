import type {Image} from "~/types/ImageType";

interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}



interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface ChampionData {
  version: string;
  id: string;
  key: number;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: Image;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}

export interface ChampionsInfoApi {
  type: string;
  format: string;
  version: string;
  data: {
    [key: string]: ChampionData;
  };
}