<template>
  <div class="champion-list">
    <ChampionCard v-for="champion in champions" :champion="champion" :key="champion.name"/>
  </div>
</template>

<script setup lang="ts">
defineProps(['champions'])
</script>

<style scoped lang="sass">
.champion-list
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  gap: 10px
</style>