<template>
  <DownloadPageSpinner v-if="accountStore.isLoading"/>
  <main class="game-stats" v-if="fullGameInfo">
    <div class="game-stats__wrapper">
      <section class="match-table">
        <PlayersTableHeader :match-info="fullGameInfo.matchInfo.info"/>
        <PlayersTable :match-info="fullGameInfo.matchInfo.info"/>
      </section>
      <section class="graphs">
        <DamageDealt :data="fullGameInfo.matchInfo"/>
        <TeamGoldAdvantage :data="fullGameInfo.goldDifference"/>
      </section>
      <section class="team-analysis">
        <TeamAnalysisGraphs :data-for-graphs="fullGameInfo.dataForGraphs"/>
      </section>
      <section class="timeline">
        <q-card class="timeline__info">
          <q-tabs
            v-model="player"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab v-for="player of fullGameInfo.playersItemsFrame" :name="player.puuid">
              <img
                :src="getSquareChampionImg(player.championName + '.png')"
                alt="spell"
                width="36px"
                height="36px"
              />
            </q-tab>
          </q-tabs>
          
          <q-separator />
          
          <q-tab-panels v-model="player" animated class="information" >
            <q-tab-panel :name="playerTimeline.puuid" v-for="playerTimeline of fullGameInfo.playersItemsFrame" >
              <div class="text-h6">{{ playerTimeline.championName }}</div>
              <div class="timeline-list">
                <div v-for="(playerFrames, index) of playerTimeline.itemFrames" class="timeline-item">
                  <div class="timeline-info">
                    <div class="timeline-item__items">
                      <q-img  v-for="frame of playerFrames" :src="getItemImageUrl(frame.itemId + '.png')" width="36px">
                        <ItemInfoPopup :itemInfo="itemStore.getItemById(frame.itemId)"/>
                      </q-img>
                      
                    </div>
                    <div class="timeline-item__time">{{formatMilliseconds(playerFrames[0].timestamp)}}</div>
                  </div>
                  <img v-if="index !== playerTimeline.itemFrames.length - 1" src="/arrow.svg" width="32px" class="timeline-item__arrow">
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import DamageDealt from "~/components/graphs/DamageDealt.vue";
import type {AllMatchData} from "~/types/AllMatchData";
import TeamGoldAdvantage from "~/components/graphs/TeamGoldAdvantage.vue";
import PlayersTable from "~/components/match/PlayersTable.vue";
import PlayersTableHeader from "~/components/match/PlayersTableHeader.vue";
import TeamAnalysisGraphs from "~/components/match/TeamAnalysisGraphs.vue";
import DownloadPageSpinner from "~/components/UI/DownloadPageSpinner.vue";
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";
import dayjs from "dayjs";
import {getItemImageUrl} from "~/services/getSpellImageUrl";
import ItemInfoPopup from "~/components/ItemInfoPopup.vue";

const route = useRoute()
const accountStore = useAccountStore()
const itemStore = useItemStore()

const player = ref('')

const fullGameInfo = shallowRef<AllMatchData | null>(null)
onMounted(async () => {
  fullGameInfo.value = await accountStore.getGameInfo(route.params.matchId as string)
  if (fullGameInfo.value) {
    accountStore.matchChampions = fullGameInfo.value.matchChampions
    player.value = fullGameInfo.value.playersItemsFrame[0].puuid
    console.log(fullGameInfo.value)
  }
})

function formatMilliseconds(milliseconds: number) {
  return dayjs(milliseconds).format('mm:ss')
}

</script>

<style scoped lang="sass">
.game-stats
  font-family: "Helvetica Neue Bold", sans-serif

  &__wrapper
    max-width: 1200px
    padding: 100px
    margin: 0 auto

.match-table
  display: flex
  flex-direction: column
  align-items: center


.graphs
  display: flex
  justify-content: space-around
  flex-wrap: wrap

.team-analysis
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr
  row-gap: 25px
  background-color: $content-bg-color
  margin-top: 15px
.information
  background-color: $content-bg-color
  min-height: 500px
  overflow: hidden
.timeline
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  margin-top: 50px
  &__info
    background-color: $content-bg-color
    width: 90%
.timeline-list
  display: flex
  flex-direction: row
  flex-wrap: wrap
  row-gap: 15px
  column-gap: 10px
.timeline-item
  display: flex
  align-items: center
  &__arrow
    margin-left: 5px
    margin-bottom: 6px
  &__items
    display: flex
    column-gap: 5px
    cursor: pointer
.timeline-info
  display: flex
  flex-direction: column
  align-items: center
  color: #fff

    
</style>