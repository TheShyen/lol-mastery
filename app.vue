<template>
  <NuxtLayout>
    <NuxtPage :key="langStore.locale"/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {addToLocalStorage} from "~/utils/addToLocalStorage";

const route = useRoute()
const langStore = useLangStore()
const champStore = useChampionStore()
const itemStore = useItemStore()
const runesAndSpellsStore = useRunesAndSpellsStore()
const appStore = useAppStore()
const accountStore = useAccountStore()

onMounted(async () => {
  langStore.setLanguageFromLocalStorage()
  appStore.setRecentPlayersFromLocalStorage()
  accountStore.setRegionFromLocalStorage()
  await Promise.all([
    champStore.getChampions(),
    itemStore.getItems(),
    runesAndSpellsStore.getRunes(),
    runesAndSpellsStore.getSummonerSpells()
  ])
  console.log(runesAndSpellsStore.runes)
})
watch(() => langStore.locale, () => {
  champStore.getChampions()
  itemStore.getItems()
  runesAndSpellsStore.getRunes()
  runesAndSpellsStore.getSummonerSpells()
  addToLocalStorage('language', JSON.stringify(langStore.locale))
})

watch(() => route.fullPath, () => {
  if (!itemStore.items.length) {
    itemStore.getItems()
  }
  if (!champStore.champions.length) {
    champStore.getChampions()
  }
  if (!runesAndSpellsStore.runes.length) {
    runesAndSpellsStore.getRunes()
  }
  if (!runesAndSpellsStore.spells.length) {
    runesAndSpellsStore.getSummonerSpells()
  }

})
</script>