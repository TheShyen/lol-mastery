<template>
  <div class="game-result">
    <div class="champion-icon">
      <div class="champion-icon__img">
        <q-img :src="getSquareChampionImg(playerPerformance.championName+'.png')"></q-img>
      </div>
      <div class="champion-icon__runes"></div>
    </div>
    <div class="game-result__status" :class="{red : !playerPerformance.win}">{{getGameResult(playerPerformance.win, $t)}}</div>
    <div class="kda-info">
      <div>{{playerPerformance.kills}} / {{playerPerformance.deaths}} / {{playerPerformance.assists}}</div>
      <div>{{playerPerformance.totalAllyJungleMinionsKilled + playerPerformance.totalMinionsKilled}} CS</div>
    </div>
    <div class="champion-items">
      <template v-for="key in itemKeys">
        <q-img
          class="champion-items__img"
          @click.stop
          :src="getItemImageUrl(playerPerformance[key] + '.png')"
        >
          <ItemInfoPopup :itemInfo="getItemById(playerPerformance[key])"/>
        </q-img>
      </template>
    
    </div>
    <div>
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
import type {VueI18n} from "vue-i18n";
import type {PlayerPerformance} from "~/types/Player/PlayerPerformance";
import ItemInfoPopup from "~/components/ItemInfoPopup.vue";

const router = useRouter()
const itemStore = useItemStore()

const props = defineProps<{
  playerPerformance: PlayerPerformance,
  playersInfo: PlayerPerformance[],
  matchTime: string
}>()

const itemKeys = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
function getGameResult(gameRes: boolean, $t: VueI18n['t']) {
  return gameRes ? `${$t('victory')}` : `${$t('defeat')}`
}

function getItemById(id: string) {
  return itemStore.items.find((item) => item.id == id)
}

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
  &__status
    color: #2DEB90
    min-width: 80px
    text-align: center
.red
  color: #ff5859
.kda-info
  min-width: 70px
  color: $blue-color
.match-time
  color: #fff
  font-size: 13px
.champion-icon
  &__img
    width: 36px
    height: 36px
.champion-items
  display: flex
  flex-wrap: wrap
  flex-direction: row
  max-width: 95px
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