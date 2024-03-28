<template>
  <section class="rank-info" v-if="gameModesStats.length">
    <div class="ratings">
      <img class="ratings__emblem" :src="getEmblemImagePath(gameModesStats[0].tier)" alt="emblem"/>
      <div class="ratings__rank">{{ gameModesStats[0].tier }} {{ gameModesStats[0].rank }}</div>
      <div class="ratings__stats">Wins: {{ gameModesStats[0].wins }} Losses: {{ gameModesStats[0].losses }}</div>
      <div class="ratings__lp">LP: {{ gameModesStats[0].leaguePoints }}</div>
    </div>
    <div class="graphs">
      <Winrate style="width: 200px; height: 200px" :games="gameModesStats[0]"></Winrate>
      <div class="graphs__text">Winrate: {{ calcWinrate(gameModesStats[0]) }}%</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {getEmblemImagePath} from "~/utils/getDataUtils/getEmblemImagePath";
import Winrate from "~/components/graphs/Winrate.vue";
import type {GameModeStat} from "~/types/Player/PlayerInfo";


defineProps<{
  gameModesStats: GameModeStat[]
}>()

function calcWinrate(info: GameModeStat) {
  return Math.floor((info.wins / (info.losses + info.wins)) * 100)
}
</script>

<style scoped lang="sass">
.rank-info
  display: flex
  justify-content: space-around
  background-color: $content-bg-color
  margin-top: 10px

.ratings
  text-align: center
  color: #fff

  &__emblem
    width: 200px
    height: 200px

  &__rank
    font-size: 20px

  &__stats
    font-size: 14px
    opacity: 0.7

  &__lp
    opacity: 0.6

.graphs
  display: flex
  align-items: center
  flex-direction: column
  justify-content: center

  &__text
    color: #fff
    font-size: 18px
    margin-top: 20px
</style>