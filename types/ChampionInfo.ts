import type {Image} from "~/types/ImageType";

export interface ChampionFullInfoFromApi {
    type: string;
    format: string;
    version: string;
    data: { [championId: string]: ChampionDetailedInfo };
}

export interface ChampionDetailedInfo {
    id: string;
    key: string;
    name: string;
    title: string;
    image: Image;
    skins: Skin[];
    lore: string;
    blurb: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficulty: number;
    };
    stats: ChampionStats;
    spells: Spell[];
    passive: {
        name: string;
        description: string;
        image: Image;
    };
    recommended: [];
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
interface Skin {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
}

export interface Spell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    leveltip: {
        label: string[];
        effect: string[];
    };
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: {};
    effect: Array<null | number[]>;
    effectBurn: Array<null | string>;
    vars: [];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
    resource: string;
}