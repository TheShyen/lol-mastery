import type {MainRuneType, RuneType} from "~/types/RunesType";
import {getRunesFromApi, getSummonerSpellsFromApi} from "~/services/runesAndSpellsService";
import type {SummonerSpell} from "~/types/SummonerSpellsType";
import type {RuneSelection} from "~/types/Player/PlayerPerformance";


export const useRunesAndSpellsStore = defineStore('runes', () => {
  const isLoading = ref(false)
  const runes = ref<MainRuneType[]>([])
  const spells = ref<SummonerSpell[]>([])

  let selectedRunesIds: (number | RuneType)[] = [];

  function getPlayerRunes(runeIds: RuneSelection[]) {
    return runeIds.map(item => {
      item.selections.forEach(selectedRuneId => {
        selectedRunesIds.push(selectedRuneId.perk);
      });
      return getRune(item.style);
    });
  }

  function createRunesArray(runeIds: RuneSelection[]) {
    const runes = getPlayerRunes(runeIds);
    return runes.flatMap(item => {
      if (item) {
        return item.slots.flatMap(slot => {
          return slot.runes.map(rune => rune);
        });
      }
    });
  }

  function getSelectedRunes(runeIds: RuneSelection[]) {
    selectedRunesIds = [];
    const allRunes = createRunesArray(runeIds);
    return selectedRunesIds.map(runeId => {
      return allRunes.find(item => item?.id == runeId);
    });
  }
  function getRune(id: number) {
    return runes.value.find(item => item.id == id)
  }
  async function getRunes() {
    try {
      isLoading.value = true;
      runes.value = await getRunesFromApi();
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }
  async function getSummonerSpells() {
    try {
      isLoading.value = true;
      let response = await getSummonerSpellsFromApi();
      spells.value = Object.values(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }
  return {
    isLoading,
    runes,
    spells,
    getSelectedRunes,
    getRunes,
    getSummonerSpells
  }
})