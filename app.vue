<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">

const route = useRoute()
const lang = useLangStore()
const champStore = useChampionStore()
const itemStore = useItemStore()


onMounted(() => {
  const getLangFromLS = localStorage.getItem('language')
  if (getLangFromLS) {
    lang.locale = JSON.parse(getLangFromLS)
  }
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