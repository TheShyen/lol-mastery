export function reformatChampionKey(key: string) {
  return key.toString().padStart(4, '0');
}