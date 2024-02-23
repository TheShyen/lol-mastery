<template>
  <main class="game-stats">
    <div class="game-stats__wrapper">
      <section class="match-table" v-if="fullGameInfo">
        <div class="match-table__results">
          <div class="left-team">{{getGameResult(fullGameInfo.info.teams[0].win, $t)}}</div>
          <div class="right-team">{{getGameResult(fullGameInfo.info.teams[1].win, $t)}}</div>
        </div>
        <div class="match-list">
          <GameResultItem
            :playerPerformance="player"
            :isMatchPage="true"
            v-for="player of fullGameInfo.info.participants"
            class="match-list__item"
          />
        </div>
        
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import type {Match} from "~/types/Player/PlayerInfo";
import GameResultItem from "~/components/summoner/GameResultItem.vue";
import {getGameResult} from "~/utils/getGameResult";
const route = useRoute()
const accountStore = useAccountStore()

const fullGameInfo = ref<Match | null>(null)

onMounted(async () => {
  fullGameInfo.value = await accountStore.getGameInfo(route.params.matchId as string)
  console.log(fullGameInfo.value)
})
</script>

<style scoped lang="sass">
.game-stats
  min-height: 100vh
  font-family: "Helvetica Neue Bold", sans-serif
  &__wrapper
    max-width: 1200px
    padding: 100px
    margin: 0 auto
.match-table
  display: flex
  flex-direction: column
  align-items: center
  &__results
    display: flex
    flex-direction: row
    width: 90%
    justify-content: space-between
.match-list
  display: flex
  flex-direction: column
  justify-content: center
  align-content: center
  flex-wrap: wrap
  max-height: 500px
  &__item
    width: 35em
</style>