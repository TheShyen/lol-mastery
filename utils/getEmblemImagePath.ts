export function getEmblemImagePath(tier: string ): string {
    const rankMap = {
        'IRON': '1',
        'BRONZE': '2',
        'SILVER': '3',
        'GOLD': '4',
        'PLATINUM': '5',
        'EMERALD': '6',
        'DIAMOND': '7',
        'MASTER': '8',
        'GRANDMASTER': '9',
        'CHALLENGER': '10'
    }
    // @ts-ignore
    return `https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/${rankMap[tier]}.png?v=9`
}