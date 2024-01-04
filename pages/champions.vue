<template>
  <div>
    <div class="champions">
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
  max-width: 1350px
  margin: 100px auto 0
  min-height: 800px

</style>