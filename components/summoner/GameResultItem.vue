<template>
  <div class="game-result">
    <div class="icons">
      <div class="champion-icon">
        <q-img :src="getSquareChampionImg(playerPerformance.championName+'.png')" class="champion-icon__img"></q-img>
        <div class="champion-icon__level">{{playerPerformance.champLevel}}</div>
      </div>
      <div class="champion-icon__runes"></div>
    </div>
    <div v-if="!isMatchPage" class="game-result__status" :class="{red : !playerPerformance.win}">{{getGameResult(playerPerformance.win, $t)}}</div>
    <div v-else class="player-info">
      <div class="player-info__nick">{{playerPerformance.riotIdGameName + "#" + playerPerformance.riotIdTagline}}</div>
      <div class="player-info__rank" v-if="playerPerformance.rank?.length">{{playerPerformance.rank[0].tier}} {{playerPerformance.rank[0].rank}}</div>
    </div>
    <div class="kda-info">
      <div>{{playerPerformance.kills}} / {{playerPerformance.deaths}} / {{playerPerformance.assists}}</div>
      <div>
        <div>{{playerPerformance.totalAllyJungleMinionsKilled + playerPerformance.totalMinionsKilled}} CS</div>
        <div v-if="isMatchPage">{{(playerPerformance.goldEarned / 1000).toFixed(1)}}k {{$t('gold')}}</div>
      </div>
    </div>
    <div class="champion-items">
      <template v-for="key in itemKeys">
        <q-img
          class="champion-items__img"
          @click.stop
          :src="getItemImageUrl(playerPerformance[key] + '.png')"
        >
          <ItemInfoPopup :itemInfo="itemStore.getItemById(playerPerformance[key])"/>
        </q-img>
      </template>
    </div>
    <div v-if="matchTime">
      <div class="match-time">{{matchTime}}</div>
      <div class="match-champions">
        <q-img
          class="match-champions__img"
          :src="getSquareChampionImg(playerInfo.championName + '.png')"
          v-for="playerInfo in playersInfo"
          @click.stop="router.push('/champions/' + playerInfo.championName)"
        >
        </q-img>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";
import {getItemImageUrl} from "~/services/getSpellImageUrl";
import type {PlayerPerformance} from "~/types/Player/PlayerPerformance";
import ItemInfoPopup from "~/components/ItemInfoPopup.vue";
import {getGameResult} from "../../utils/getGameResult";

const router = useRouter()
const itemStore = useItemStore()

const props = withDefaults(defineProps<{
  playerPerformance: PlayerPerformance,
  playersInfo?: PlayerPerformance[],
  matchTime?: string
  isMatchPage?: boolean
}>(), {
  isMatchPage: false
})

const itemKeys = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'];



</script>

<style scoped lang="sass">
.game-result
  display: flex
  justify-content: space-around
  align-items: center
  width: 100%
  height: 90px
  background-color: #282828
  border-bottom: 1px solid #383434
  cursor: pointer
  &:hover
    background-color: #303030
    transition: 0.6s
  &__status
    color: #2DEB90
    min-width: 80px
    text-align: center

.player-info
  min-width: 180px
  color: #ffffff
  &__nick
    font-size: 13px
  &__rank
    font-size: 10px
    font-style: italic
    opacity: 0.7
.red
  color: #ff5859
.kda-info
  min-width: 70px
  color: $blue-color
  text-align: center
.match-time
  color: #fff
  font-size: 13px
.champion-icon
  width: 36px
  height: 36px
  position: relative
  &__level
    position: absolute
    top: 60%
    left: 60%
    color: #ffffff
    font-size: 12px
.champion-items
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  grid-template-rows: 1fr 1fr
  gap: 1px
  &__img
    width: 20px
    height: 20px
    margin: 1px
    border-radius: 4px
    cursor: pointer

.match-champions
  display: flex
  flex-wrap: wrap
  flex-direction: row
  max-width: 125px
  margin-left: 30px
  padding-bottom: 18px
  &__img
    margin: 1px
    width: 20px
    height: 20px
    margin: 1px
    border-radius: 4px
    cursor: pointer
</style>