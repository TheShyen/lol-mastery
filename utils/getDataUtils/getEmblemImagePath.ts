import {rankMap} from "~/constants/ranks";

export function getEmblemImagePath(tier: keyof typeof rankMap): string {
    return `https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/${rankMap[tier]}.png?v=9`
}