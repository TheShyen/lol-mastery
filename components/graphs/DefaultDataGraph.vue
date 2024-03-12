<template>
  <div class="statistics">
    <div class="statistics__progress-line">
      <ProgressLine
        v-for="(item, index) of data.playersData.slice(0,5)"
        :championName="accountStore.matchChampions[index]"
        :progress="calcProgress(item)"
        :label="item"
      />
    </div>
    <div class="graph">
      <canvas ref="myChart"></canvas>
      <div class="graph__data">
        <div>{{data.teamData[0]}}</div>
        <div class="divider"></div>
        <div class="red">{{data.teamData[1]}}</div>
      </div>
    </div>
    <div class="statistics__progress-line">
      <ProgressLine
        v-for="(item, index) of data.playersData.slice(5)"
        :championName="accountStore.matchChampions[index + 5]"
        :progress="calcProgress(item)"
        :label="item"
        color="red"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import Chart from 'chart.js/auto';
import ProgressLine from "~/components/UI/ProgressLine.vue";
import type {InfoForDefaultGraph} from "~/types/AllMatchData";

const accountStore = useAccountStore()
const maxValue = ref(0)
const myChart = ref(null)
const props = defineProps<{
  data: InfoForDefaultGraph
}>()

onMounted(() => {
  if(!myChart.value) return
  const ctx = myChart.value;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: props.data.teamData,
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        borderAlign: 'inner',
        borderWidth: 0,
        cutout: '60%',
        weight: 1
      }],
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
  maxValue.value = Math.max(...props.data.playersData)
});

function calcProgress(value) {
  return (value / maxValue.value)
}
</script>

<style scoped lang="sass">
.statistics
  display: flex
  align-items: center

  &__progress-line
    display: flex
    flex-direction: column
    row-gap: 5px

.graph
  width: 150px
  height: 150px
  margin: 0 10px 0 10px
  position: relative
  &__data
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    color: $blue-text
  .red
    color: rgb(234,73,88)
.divider
  border: 0.1px solid white
</style>