<template>
  <div class="players-table">
    <div>
      <GameResultItem
        :playerPerformance="player"
        :isMatchPage="true"
        v-for="player of matchInfo.participants.slice(0, 5)"
        class="players-table__item"
        @click="goToSummonerPage(player.riotIdGameName, player.riotIdTagline)"
      />
    </div>
    <div class="players-table__divider"></div>
    <div>
      <GameResultItem
        :playerPerformance="player"
        :isMatchPage="true"
        v-for="player of matchInfo.participants.slice(5)"
        class="players-table__item-right"
        @click="goToSummonerPage(player.riotIdGameName, player.riotIdTagline)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameResultItem from "~/components/summoner/GameResultItem.vue";
import type {MatchInfo} from "~/types/Player/PlayerInfo";
const router = useRouter()
defineProps<{
  matchInfo: MatchInfo
}>()

function goToSummonerPage(name: string, tag: string) {
  router.push(`/summoner/${name}+${tag}`)
}
</script>

<style scoped lang="sass">
.players-table
  display: flex
  justify-content: center
  align-content: center
  flex-wrap: wrap
  &__divider
    padding: 0 4px
  &__item
    width: 35em
    &-right
      flex-direction: row-reverse
      width: 35em
      text-align: right
</style>