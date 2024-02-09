<template>
  <div>
    <canvas id="games"></canvas>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['games'])
onMounted(() => {
  new Chart('games', {
    type: 'doughnut',
    data: {
      labels: [
        'Win',
        'Defeat',
      ],
      datasets: [{
        data: [props.games.wins, props.games.losses],
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
});
</script>