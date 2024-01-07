<template>
  <div class="champions">
    <div class="champions__wrapper">
      <ChampionList :champions="champions"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ChampionData} from "~/types/Champions";

const store = useChampionStore()

const champions = ref<ChampionData[] | []>([]);
onMounted(async () => {
  await store.getChampions()
  champions.value = store.champions
})
</script>

<style scoped lang="sass">
.champions
  background: #212121
  padding-top: 100px
  &__wrapper
    margin: 0 auto
    max-width: 1300px
    min-height: 800px

</style>