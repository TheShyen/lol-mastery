<template>
  <section class="rank-info">
  <div class="ratings">
    <img class="ratings__emblem" :src="getEmblemImagePath(gameModesStats)" alt="emblem"/>
    <div class="ratings__text">{{gameModesStats[0].tier}} {{gameModesStats[0].rank}}</div>
    <div class="ratings__text">Wins: {{gameModesStats[0].wins}}  Losses: {{gameModesStats[0].losses}}</div>
    <div class="ratings__text">LP: {{gameModesStats[0].leaguePoints}}</div>
  </div>
  <div class="graphs">
    <Winrate  style="width: 200px; height: 200px" :games="gameModesStats[0]"></Winrate>
    <div class="graphs__text">Winrate: {{calcWinrate(gameModesStats[0])}}%</div>
  </div>
</section>
</template>

<script setup lang="ts">
import {getEmblemImagePath} from "~/utils/getEmblemImagePath";
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
  background-color: #282828
  margin-top: 10px
.ratings
  &__emblem
    width: 200px
    height: 200px
  &__text
    font-size: 18px
    color: $gold-color
    text-align: center
.graphs
  display: flex
  align-items: center
  flex-direction: column
  justify-content: center
  &__text
    color: $blue-color
    font-size: 18px
    margin-top: 20px
</style>