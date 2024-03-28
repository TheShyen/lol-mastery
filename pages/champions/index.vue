<template>
  <div class="champions">
    <div class="champions__wrapper">
      <ChampionList :champions="store.champions"/>
    </div>
  </div>
</template>

<script setup lang="ts">

const store = useChampionStore()

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