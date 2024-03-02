<template>
  <div class="graph">
    <div class="graph__title">
      Нанесенный урон
    </div>
    <canvas id="damage"></canvas>
    <div class="champions">
      <img v-for="player of data.info.participants" :src="getSquareChampionImg(player.championName + '.png')" class="champions__icon" alt="champion"/>
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
  return props.data.info.participants.map(player => player.magicDamageDealtToChampions + player.physicalDamageDealtToChampions)
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
        backgroundColor: 'rgb(54, 162, 235)',
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
  justify-content: center
  flex-direction: column
  align-items: center
  &__title
    color: $blue-color
    font-size: 18px
.champions
  display: flex
  flex-direction: row
  margin-left: 5%
  justify-content: space-between
  width: 89%
  &__icon
    width: 36px
    height: 36px
</style>