export function getDifficult(dif: number): string {
  return dif < 4 ? "lowDifficulty" : dif < 7 ? "mediumDifficulty" : "highDifficulty"
}