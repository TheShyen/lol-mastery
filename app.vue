<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {addToLocalStorage} from "~/utils/addToLocalStorage";
import {getFromLocalStorage} from "~/utils/getFromLocalStorage";

const route = useRoute()
const lang = useLangStore()
const champStore = useChampionStore()
const itemStore = useItemStore()


onMounted(() => {
  const langJson = getFromLocalStorage('language')
  if(langJson) {
    lang.locale = JSON.parse(langJson)
  }
  champStore.getChampions()
  itemStore.getItems()
})
watch(() => lang.locale, () => {
  champStore.getChampions()
  itemStore.getItems()
  addToLocalStorage('language', JSON.stringify(lang.locale))
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