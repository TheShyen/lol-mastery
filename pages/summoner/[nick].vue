<template>
  <DownloadPageSpinner v-if="accountStore.isLoading"/>
  <div v-if="summonerInfo" class="summoner">
    <div class="summoner__wrapper">
      <SummonerBanner :mainChampion="champion" :summonerAccountInfo="summonerInfo.accountInfo"/>
      <SummonerRankInfo :gameModesStats="summonerInfo.gameModesStats"/>
      <section class="match-list">
        <SummonerGameResultItem
          v-for="playerPerformance in summonerInfo.playerPerformances"
          :matchTime="getMatchTimes(playerPerformance, $t)"
          :playerPerformance="playerPerformance"
          :playersInfo="getAllPlayersInfo(playerPerformance)"
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



const route = useRoute()
const accountStore = useAccountStore()
const championStore = useChampionStore()
const summonerInfo = ref<AllPlayerInfo | null >(null)
const champion = ref<ChampionData | null>(null)
const itemStore = useItemStore()

onMounted(async () => {
  summonerInfo.value = await accountStore.getAccountInfo(route.params.nick as string)
  if (!itemStore.items) {
    await itemStore.getItems()
  }
  await getChampForBanner()
})

async function getChampForBanner() {
  if (!championStore.champions) {
    await championStore.getChampions()
  }
  champion.value = championStore.champions.find(elem => elem.key == summonerInfo.value?.championMastery[0].championId) || null
  console.log(champion.value)
}
function getAllPlayersInfo(game: PlayerPerformance) {
  let playersInfo: PlayerPerformance[] = []
  summonerInfo.value?.matchList.forEach(item => {
    if(item.info.gameId == game.matchID) {
      playersInfo = item.info.participants
    }
  })
  return playersInfo
}
function getMatchTimes(game: PlayerPerformance, $t: VueI18n['t']) {
  let gameEndTime = 0
  summonerInfo.value?.matchList.forEach(item => {
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


.match-list
  font-family: "Helvetica Neue Bold", sans-serif
  margin: 20px auto
  width: 54%

</style>