export function calcDifficult(dif: number): string {
    return dif < 4 ? "Низкая" : dif < 7 ? "Средняя" : "Высокая"
}