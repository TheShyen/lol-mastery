<template>
  <div>
    <MainPromo/>
    <MainChampionsPromo/>
  </div>
</template>

<script setup lang="ts">
const championStore = useChampionStore()
onMounted(() => {
  championStore.getChampions()
})
</script>

<style scoped lang="sass">

</style>