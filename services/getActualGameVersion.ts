
export async function getActualGameVersion(): Promise<string> {
  try {
    const response:string[] = await $fetch('https://ddragon.leagueoflegends.com/api/versions.json')
    return response[0]
  } catch (err) {
    const error = err as Error;
    throw new Error('Ошибка при получении данных:' + error.message);
  }
}