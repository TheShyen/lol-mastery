<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Spinner from "~/components/UI/DownloadPageSpinner.vue";

const route = useRoute()
const lang = useLangStore()
const champStore = useChampionStore()
const itemStore = useItemStore()
const accountStore = useAccountStore()

onMounted(() => {
  lang.locale = JSON.parse(localStorage.getItem('language')  || 'Ru')
  champStore.getChampions()
  itemStore.getItems()
})
watch(() => lang.locale, () => {
  champStore.getChampions()
  itemStore.getItems()
  localStorage.setItem('language', JSON.stringify(lang.locale))
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