<template>
  <div class="graph">
    <div class="graph__title">{{$t('goldAdvantage')}}</div>
    <canvas id="goldAdvantage"></canvas>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps(['data'])
onMounted(() => {
  new Chart('goldAdvantage', {
    type: 'line',
    data: {
      labels: props.data.map((_, index) => index),
      datasets: [{
        label: 'My First Dataset',
        data: props.data,
        borderColor: 'rgb(75, 192, 192)',
        fill: {
          target: 'origin',
          above: 'rgb(54, 162, 235)',
          below: 'rgb(234,73,88)'
        },
        tension: 0.1
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function() {
              return null;
            },
            title: function (tooltipItems) {
              return tooltipItems[0].formattedValue;
            },
          }
        }
      },
      scales: {
        x: {
          ticks: {
            stepSize: 5,
            callback: function(value, index) {
              if (index % 5 === 0) {
                return value;
              } else {
                return '';
              }
            }
          }
        },
        y: {
          stacked: true
        }
      }
    }
  })
});
</script>
<style lang="sass" scoped>
.graph
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 30px
  width: 35em
  background-color: #282828
  &__title
    margin-top: 10px
    color: $blue-color
    font-size: 18px
</style>