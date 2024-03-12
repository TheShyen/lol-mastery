<template>
  <div class="team-analysis-graph" v-for="graph of dataForGraphs">
    <div>{{ $t(`${graph.name}`) }}</div>
    <DefaultDataGraph :data="graph"/>
  </div>
</template>

<script setup lang="ts">
import DefaultDataGraph from "~/components/graphs/DefaultDataGraph.vue";
import type {InfoForDefaultGraph} from "~/types/AllMatchData";

defineProps<{
  dataForGraphs: InfoForDefaultGraph[]
}>()
</script>

<style scoped lang="sass">
.team-analysis-graph
  display: flex
  flex-direction: column
  justify-content: center
  row-gap: 5px
  align-items: center
  color: $blue-color
  margin: 10px 0 10px 0
</style>