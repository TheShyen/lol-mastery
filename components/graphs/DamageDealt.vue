<template>
  <div class="graph">
    <div class="graph__title">
      Нанесенный урон
    </div>
    <canvas id="damage"></canvas>
    <div class="champions">
      <img
          v-for="player of data.info.participants"
          :src="getSquareChampionImg(player.championName + '.png')"
          class="champions__icon"
          alt="champion"
      />
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import Chart from 'chart.js/auto';
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";

const props = defineProps(['data'])


function getDamageData() {
  console.log(props.data)
  return props.data.info.participants.map(player => player.totalDamageDealtToChampions)
}

function getNames() {
  return props.data.info.participants.map(player => player.championName)
}

onMounted(() => {
  new Chart('damage', {
    type: 'bar',
    data: {
      labels: getNames(),
      datasets: [{
        data: getDamageData(),
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(234,73,88)',
          'rgb(234,73,88)',
          'rgb(234,73,88)',
          'rgb(234,73,88)',
          'rgb(234,73,88)'
        ],
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })
});
</script>
<style scoped lang="sass">
.graph
  display: flex
  margin-top: 30px
  flex-direction: column
  align-items: center
  width: 35em
  background-color: #282828
  &__title
    margin-top: 10px
    color: $blue-color
    font-size: 18px

.champions
  display: flex
  flex-direction: row
  margin-left: 10%
  justify-content: space-between
  width: 88%
  margin-bottom: 10px
  &__icon
    width: 30px
    height: 30px
</style>