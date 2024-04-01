import type {Image} from "~/types/ImageType";

export interface SummonerSpellsTypeFromApi {
  type: string,
  version: string,
  data: SummonerSpell[]
}

export interface SummonerSpell {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  description: string;
  effect: (number[] | null)[];
  effectBurn: string[];
  id: string;
  image: Image;
  key: string;
  maxammo: string;
  maxrank: number;
  modes: string[];
  name: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  summonerLevel: number;
  tooltip: string;
  vars: any[];
}