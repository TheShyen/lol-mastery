<template>
  <DownloadPageSpinner v-if="accountStore.isLoading"/>
  <div v-if="summonerInfo" class="summoner">
    <div class="summoner__wrapper">
      <SummonerBanner :mainChampion="champion" :summonerAccountInfo="summonerInfo.accountInfo"/>
      <SummonerRankInfo :gameModesStats="summonerInfo.gameModesStats"/>
      <section class="match-list">
        <div class="match-list__recent">{{$t('recentGames')}}</div>
        <SummonerGameResultItem
          v-for="playerPerformance in summonerInfo.playerPerformances"
          :matchTime="getMatchTimes(playerPerformance, $t)"
          :playerPerformance="playerPerformance"
          :playersInfo="getAllPlayersInfo(playerPerformance)"
          :matchResult="true"
          @click="router.push('/match/' + playerPerformance.matchID)"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadPageSpinner from "~/components/UI/DownloadPageSpinner.vue";
import type {AllPlayerInfo} from "~/types/Player/PlayerInfo";
import type {ChampionData} from "~/types/Champions";
import type {PlayerPerformance} from "~/types/Player/PlayerPerformance";
import type {VueI18n} from "vue-i18n";

import {addToLocalStorage} from "~/utils/addToLocalStorage";


const route = useRoute()
const router = useRouter()
const accountStore = useAccountStore()
const championStore = useChampionStore()
const appStore = useAppStore()
const summonerInfo = ref<AllPlayerInfo | null >(null)
const champion = ref<ChampionData | null>(null)
const itemStore = useItemStore()

onMounted(async () => {
  summonerInfo.value = await accountStore.getAccountInfo(route.params.nick as string)
  await getChampForBanner()
  if (!itemStore.items) {
    await itemStore.getItems()
  }
  if (summonerInfo.value) {
    addPlayerToRecentList()
  }
})

async function getChampForBanner() {
  if (!championStore.champions) {
    await championStore.getChampions()
  }
  champion.value = championStore.champions.find(elem => elem.key == summonerInfo.value?.championMastery[0].championId) || null
}
function getAllPlayersInfo(game: PlayerPerformance) {
  let playersInfo: PlayerPerformance[] = []
  summonerInfo.value?.matchList.forEach(item => {
    if(item.metadata.matchId == game.matchID) {
      playersInfo = item.info.participants
    }
  })
  return playersInfo
}
function getMatchTimes(game: PlayerPerformance, $t: VueI18n['t']) {
  let gameEndTime = 0
  summonerInfo.value?.matchList.forEach(item => {
    if(item.metadata.matchId == game.matchID) {
      gameEndTime = item.info.gameEndTimestamp
    }
  })
  return `${getTimeElapsed(gameEndTime, $t)} - ${Math.floor(game.timePlayed / 60)}${$t('minutes')}  ${game.timePlayed % 60}s`
}

function addPlayerToRecentList() {
  const nick = (route.params.nick as string).replace('+', '#')
  if (!appStore.recentPlayers.includes(nick)) {
    appStore.recentPlayers.unshift(nick)
    appStore.recentPlayers = appStore.recentPlayers.slice(0, 5)
    addToLocalStorage('recent', JSON.stringify(appStore.recentPlayers))
  }
}
</script>

<style scoped lang="sass">
.summoner
  min-height: 100vh
  font-family: "Helvetica Neue Bold", sans-serif
  &__wrapper
    max-width: 1200px
    margin: 0 auto
    padding: 62px


.match-list
  font-family: "Helvetica Neue Bold", sans-serif
  margin: 20px auto
  width: 60%
  &__recent
    display: flex
    justify-content: center
    margin-bottom: 10px
    font-size: 18px
    color: $gold-color

</style>