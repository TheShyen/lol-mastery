<template>
  <Spinner v-if="store.isLoading"/>
  <div v-else class="champions">
    <div class="champions__wrapper">
      <ChampionList :champions="store.champions"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Spinner from "~/components/UI/Spinner.vue";
const store = useChampionStore()

onMounted( () => {
 store.getChampions()
})

</script>

<style scoped lang="sass">
.champions
  background: $secondary-bg-color
  padding-top: 100px
  &__wrapper
    margin: 0 auto
    max-width: 1300px
    min-height: 800px

</style>