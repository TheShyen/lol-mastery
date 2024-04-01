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
        <TeamGoldAdvantage :data="fullGameInfo.goldDifference"/>git
      </section>
      <section class="team-analysis">
        <TeamAnalysisGraphs :data-for-graphs="fullGameInfo.dataForGraphs"/>
      </section>
      <DetailedInfoAboutPlayerInMatch
        :players-frames="fullGameInfo.playersFrames"
        :champions-info="championsInfo"
        :players-perfomance="fullGameInfo.matchInfo.info.participants"
      />
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
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";
import DetailedInfoAboutPlayerInMatch from "~/components/match/DetailedInfoAboutPlayerInMatch.vue";


const route = useRoute()
const accountStore = useAccountStore()


const championsInfo = ref<ChampionDetailedInfo[] | null>(null)

const fullGameInfo = shallowRef<AllMatchData | null>(null)
onMounted(async () => {
  fullGameInfo.value = await accountStore.getGameInfo(route.params.matchId as string)
  if (fullGameInfo.value) {
    championsInfo.value = await accountStore.getMatchChampions(fullGameInfo.value.matchChampions)
  }
})

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


.timeline
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  margin-top: 50px

  &__info
    width: 100%
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


.skill-table__header, .skill-table td
  border: 1px solid #3a3232
  padding: 8px
  text-align: center

.skill-table th
  border: 1px solid #3a3232
  background-color: #4b4242
  color: #efefef

.skill-table th img
  cursor: pointer

.skill-table td:not(:empty)
  background-color: lightblue

</style>