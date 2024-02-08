<template>
  <Spinner v-if="accountStore.isLoading "/>
  <div v-else>
    <Error v-if="!summonerInfo"/>
    <div class="summoner">
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
            <img class="ratings__emblem" :src="getEmblemImagePath(summonerInfo.rankInfo[0].tier)" alt="emblem"/>
            <div class="ratings__text">{{summonerInfo.rankInfo[0].tier}} {{summonerInfo.rankInfo[0].rank}}</div>
            <div class="ratings__text">Wins: {{summonerInfo.rankInfo[0].wins}}  Losses: {{summonerInfo.rankInfo[0].losses}}</div>
            <div class="ratings__text">LP: {{summonerInfo.rankInfo[0].leaguePoints}}</div>
          </div>
          <div class="graphs">
            <div class="ratings__text">Winrate: {{Math.floor((summonerInfo.rankInfo[0].wins / (summonerInfo.rankInfo[0].losses + summonerInfo.rankInfo[0].wins)) * 100)}}%</div>
          </div>
        </section>
        <section class="match-list">
        
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Error from "~/components/error.vue";
import Spinner from "~/components/UI/Spinner.vue";
import type {SummonerInfo} from "~/types/Account";
import {getSplashArtImageURL} from "~/services/getSplashArtImageURL";
import type {ChampionData} from "~/types/Champions";
import {getProfileIconUrl} from "~/services/getProfileIconUrl";
import {getEmblemImagePath} from "~/utils/getEmblemImagePath";

const route = useRoute()
const accountStore = useAccountStore()
const championStore = useChampionStore()
const summonerInfo = ref<SummonerInfo | null>(null)
const champion = ref<ChampionData | null>(null)
summonerInfo.value = await accountStore.getAccountInfo(route.params.nick as string)
await getChampForBanner()

async function getChampForBanner() {
  await championStore.getChampions()
  console.log(summonerInfo.value)
  champion.value = championStore.champions.find(elem => elem.key == summonerInfo.value.championMastery[0].championId) || null
}
</script>

<style scoped lang="sass">
.summoner
  background-color: $secondary-bg-color
  min-height: 100vh
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
    font-family:  "Helvetica Neue Bold", sans-serif
    font-size: 18px
    color: $gold-color
    text-align: center
.graphs
  display: flex
  align-items: center
</style>