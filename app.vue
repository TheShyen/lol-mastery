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
const appStore = useAppStore()
const accountStore = useAccountStore()

onMounted(() => {
  langStore.setLanguageFromLocalStorage()
  appStore.setRecentPlayersFromLocalStorage()
  accountStore.setRegionFromLocalStorage()
  champStore.getChampions()
  itemStore.getItems()
})
watch(() => langStore.locale, () => {
  champStore.getChampions()
  itemStore.getItems()
  addToLocalStorage('language', JSON.stringify(langStore.locale))
})

watch(() => route.fullPath, () => {
  if (!itemStore.items.length) {
    itemStore.getItems()
  }
  if (!champStore.champions.length) {
    champStore.getChampions()
  }
})
</script>