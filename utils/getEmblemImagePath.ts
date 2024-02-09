import type {RankInfo} from "~/types/Player/PlayerInfo";
import {rankMap} from "~/constants/ranks";



export function getEmblemImagePath(tier: RankInfo[]): string {
    const rank: keyof typeof rankMap = tier[0].tier
    return `https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/${rankMap[rank]}.png?v=9`
}