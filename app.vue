<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {addToLocalStorage} from "~/utils/addToLocalStorage";
import {getFromLocalStorage} from "~/utils/getFromLocalStorage";

const route = useRoute()
const langStore = useLangStore()
const champStore = useChampionStore()
const itemStore = useItemStore()
const appStore = useAppStore()


onMounted(() => {
  langStore.setLanguageFromLocalStorage()
  appStore.setRecentPlayersFromLocalStorage()
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