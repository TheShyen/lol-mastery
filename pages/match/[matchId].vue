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
            <q-tab v-for="player of fullGameInfo.playersFrames" :name="player.puuid">
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
            <q-tab-panel :name="playerFrame.puuid" v-for="playerFrame of fullGameInfo.playersFrames" >
              <div class="timeline-list">
                <div v-for="(playerFrames, index) of playerFrame.itemFrames" class="timeline-item">
                  <div class="timeline-info">
                    <div class="timeline-item__items">
                      <q-img  v-for="frame of playerFrames" :src="getItemImageUrl(frame.itemId + '.png')" width="36px">
                        <ItemInfoPopup :itemInfo="itemStore.getItemById(frame.itemId)"/>
                      </q-img>
                    </div>
                    <div class="timeline-item__time">{{formatMilliseconds(playerFrames[0].timestamp)}}</div>
                  </div>
                  <img v-if="index !== playerFrame.itemFrames.length - 1" src="/arrow.svg" width="32px" class="timeline-item__arrow">
                </div>
              </div>
              <table class="skill-table">
                <tr>
                  <th></th>
                  <th v-for="index of playerFrame.skillFrames.length">{{index}}</th>
                </tr>
                <tr v-for="i of 4">
                  <td></td>
                  <template  v-for="skill of playerFrame.skillFrames">
                    <td v-if="skill.skillSlot === i">{{SKILLS[skill.skillSlot]}}</td>
                    <td v-else></td>
                  </template>
                </tr>
              </table>
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
import {SKILLS} from "~/constants/skills";

const route = useRoute()
const accountStore = useAccountStore()
const itemStore = useItemStore()

const player = ref('')

const fullGameInfo = shallowRef<AllMatchData | null>(null)
onMounted(async () => {
  fullGameInfo.value = await accountStore.getGameInfo(route.params.matchId as string)
  if (fullGameInfo.value) {
    accountStore.matchChampions = fullGameInfo.value.matchChampions
    player.value = fullGameInfo.value.playersFrames[0].puuid
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
.timeline-list
  display: flex
  flex-direction: row
  flex-wrap: wrap
  row-gap: 15px
  column-gap: 10px
  padding: 10px
  border-radius: 5px
  background-color: #212121
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

.skill-table
  border-collapse: collapse
  width: 80%
  margin: 30px auto


.skill-table th, .skill-table td
  border: 1px solid #3a3232
  padding: 8px
  text-align: center

.skill-table th
  background-color: #4b4242
  color: #efefef
  width: 30px
.skill-table td:not(:empty)
  background-color: lightblue

</style>