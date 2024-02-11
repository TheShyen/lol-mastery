<template>
  <Spinner v-if="accountStore.isLoading"/>
  <div v-else>
    <Error v-if="!summonerInfo"/>
    <div class="summoner" v-else>
      <div class="summoner__wrapper">
        <section class="banner" :style="{ backgroundImage: `url(${getSplashArtImageURL(<string>champion?.id)})` }">
          <div class="banner__icon">
            <q-img :src="getProfileIconUrl(summonerInfo.accountInfo.profileIconId)"/>
          </div>
          <div class="banner-info">
            <div class="banner-info__name">{{ summonerInfo.accountInfo.name }}</div>
            <div class="banner-info__lvl">{{$t('level')}}: {{summonerInfo.accountInfo.summonerLevel}}</div>
          </div>
        </section>
        <section class="rank-info">
          <div class="ratings">
            <img class="ratings__emblem" :src="getEmblemImagePath(summonerInfo.rankInfo)" alt="emblem"/>
            <div class="ratings__text">{{summonerInfo.rankInfo[0].tier}} {{summonerInfo.rankInfo[0].rank}}</div>
            <div class="ratings__text">Wins: {{summonerInfo.rankInfo[0].wins}}  Losses: {{summonerInfo.rankInfo[0].losses}}</div>
            <div class="ratings__text">LP: {{summonerInfo.rankInfo[0].leaguePoints}}</div>
          </div>
          <div class="graphs">
            <Winrate  style="width: 200px; height: 200px" :games="summonerInfo.rankInfo[0]"></Winrate>
            <div class="graphs__text">Winrate: {{calcWinrate(summonerInfo.rankInfo[0])}}%</div>
          </div>
        </section>
        <section class="match-list">
          <div class="match-list__item" v-for="game in summonerInfo.playerGameStats">
            <div class="champion-icon">
              <div class="champion-icon__img">
                <q-img :src="getSquareChampionImg(game.championName+'.png')"></q-img>
              </div>
              <div class="champion-icon__runes"></div>
            </div>
            <div class="match-result" :class="{red : !game.win}">{{getGameResult(game.win, $t)}}</div>
            <div class="kda-info">
              <div>{{game.kills}} / {{game.deaths}} / {{game.assists}}</div>
              <div>{{game.totalAllyJungleMinionsKilled + game.totalMinionsKilled}} CS</div>
            </div>
            <div class="champion-items">
              <template v-for="key in itemKeys">
                <q-img
                    class="champion-items__img"
                    :src="getItemImageUrl(game[key] + '.png')"
                >
                  <q-menu fit anchor="bottom start" self="top left" dark square max-height="300">
                    <div class="item-info">
                      <div class="item-info__name">{{ getItemById(game[key]).name }}</div>
                      <div v-html="formatItemText(getItemById(game[key]).description)"></div>
                      <div class="item-info__cost">{{$t('goldCost')}} {{ getItemById(game[key]).gold.total }}</div>
                    </div>
                  </q-menu>
                </q-img>
              </template>

            </div>
            <div>
              <div class="match-time">{{getMatchTimes(game, $t)}}</div>
              <div class="match-champions">
                <q-img
                    class="match-champions__img"
                    :src="getSquareChampionImg(playerInfo.championName + '.png')"
                    v-for="playerInfo in getAllPlayersInfo(game)"
                    @click="router.push('/champions/' + playerInfo.championName)"
                >
                </q-img>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Error from "~/components/Error.vue";
import Spinner from "~/components/UI/Spinner.vue";
import type {AllPlayerInfo, RankInfo} from "~/types/Player/PlayerInfo";
import {getSplashArtImageURL} from "~/services/getSplashArtImageURL";
import type {ChampionData} from "~/types/Champions";
import {getProfileIconUrl} from "~/services/getProfileIconUrl";
import {getEmblemImagePath} from "~/utils/getEmblemImagePath";
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";
import {getItemImageUrl} from "~/services/getSpellImageUrl";
import {formatItemText} from "~/utils/formatItemText";
import type {VueI18n} from "vue-i18n";
import type {PlayerGameStat} from "~/types/Player/PlayerGameStat";
import Winrate from "~/components/graphs/Winrate.vue";


const route = useRoute()
const router = useRouter()
const accountStore = useAccountStore()
const championStore = useChampionStore()
const itemStore = useItemStore()
const summonerInfo = ref<AllPlayerInfo | null>(null)
const champion = ref<ChampionData | null>(null)
const itemKeys = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

// onCreated
summonerInfo.value = await accountStore.getAccountInfo(route.params.nick as string)
await getChampForBanner()

async function getChampForBanner() {
  await championStore.getChampions()
  console.log(summonerInfo.value)
  champion.value = championStore.champions.find(elem => elem.key == summonerInfo.value?.championMastery[0].championId) || null
}
function calcWinrate(info: RankInfo) {
  return Math.floor((info.wins / (info.losses + info.wins)) * 100)
}
function getGameResult(gameRes: boolean, $t: VueI18n['t']) {
  return gameRes ? `${$t('victory')}` : `${$t('defeat')}`
}

function getAllPlayersInfo(game: PlayerGameStat) {
  let playersInfo: PlayerGameStat[] = []
  summonerInfo.value?.matchList.map(item => {
    if(item.info.gameId == game.matchID) {
      playersInfo = item.info.participants
    }
  })
  return playersInfo
}
function getItemById(id: string) {
  itemStore.getItems()
  return itemStore.items.find((item) => item.id == id)
}
function getMatchTimes(game: PlayerGameStat, $t: VueI18n['t']) {
  let gameEndTime = 0
  summonerInfo.value?.matchList.map(item => {
    if(item.info.gameId == game.matchID) {
      gameEndTime = item.info.gameEndTimestamp
    }
  })
  return `${getTimeElapsed(gameEndTime, $t)} - ${Math.floor(game.timePlayed / 60)}${$t('minutes')}  ${game.timePlayed % 60}s`
}
</script>

<style scoped lang="sass">
.summoner
  background-color: $secondary-bg-color
  min-height: 100vh
  font-family: "Helvetica Neue Bold", sans-serif
  &__wrapper
    max-width: 1200px
    margin: 0 auto
    padding: 62px
.banner
  min-height: 300px
  display: flex
  justify-content: flex-start
  align-items: flex-end
  &__icon
    width: 64px
    height: 64px
    margin-bottom: 20px
    margin-left: 20px
    margin-right: 5px
.banner-info
  font-family: "Helvetica Neue Bold",sans-serif
  color: #ffffff
  padding: 20px 20px
  &__name
    font-size: 34px
  &__lvl
    font-size: 16px
.rank-info
  display: flex
  justify-content: space-around
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
.match-list
  font-family: "Helvetica Neue Bold", sans-serif
  margin: 50px auto
  width: 54%
  &__item
    display: flex
    justify-content: space-around
    align-items: center
    width: 100%
    height: 90px
    background-color: #282828
    border-bottom: 1px solid #383434
.match-result
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
.item-info
  padding: 10px 10px
  max-width: 500px
  &__name
    color: #eacaa0
  &__cost
    color: $gold-color
    padding-top: 10px
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