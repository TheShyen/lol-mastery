<template>
  <main class="game-stats">
    <div class="game-stats__wrapper" v-if="fullGameInfo">
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

const route = useRoute()
const accountStore = useAccountStore()

const fullGameInfo = shallowRef<AllMatchData | null>(null)
onMounted(async () => {
  fullGameInfo.value = await accountStore.getGameInfo(route.params.matchId as string)
  if (fullGameInfo.value) {
    accountStore.matchChampions = fullGameInfo.value.matchChampions
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
  background-color: #282828
  margin-top: 15px

</style>