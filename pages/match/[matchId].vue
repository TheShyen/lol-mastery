<template>
  <main class="game-stats">
    <div class="game-stats__wrapper" v-if="fullGameInfo">
      <section class="match-table">
        <div class="match-table__results">
          <div class="teams-results">
            <div
              class="teams-results__game"
              :class="{red : !fullGameInfo.info.teams[0].win}"
            >
              {{getGameResult(fullGameInfo.info.teams[0].win, $t)}}
            </div>
            <div class="objectives">
              <template v-for="(object, objectName) of fullGameInfo.info.teams[0].objectives">
                <div v-if="objectName != 'champion'" class="objectives__icon">
                  <img :src="`/_nuxt/assets/objectIcons/${objectName}.svg`"/>
                  <div class="objectives__text">
                    {{object.kills}}
                  </div>
                  <q-tooltip>
                    {{$t(`${objectName}`)}}
                  </q-tooltip>
                </div>
                
              </template>
            </div>
          </div>
          <div class="game-duration">
            {{formatGameDuration(fullGameInfo.info.gameDuration)}}
          </div>
          <div class="teams-results_right">
            <div
              class="teams-results__game"
              :class="{red : !fullGameInfo.info.teams[1].win}"
            >
              {{getGameResult(fullGameInfo.info.teams[1].win, $t)}}
            </div>
            <div class="objectives_right">
              <template v-for="(object, objectName) of fullGameInfo.info.teams[1].objectives">
                <div v-if="objectName != 'champion'" class="objectives__icon">
                  <img :src="`/_nuxt/assets/objectIcons/${objectName}.svg`"/>
                  <div class="objectives__text">
                    {{object.kills}}
                  </div>
                  <q-tooltip>
                    {{$t(`${objectName}`)}}
                  </q-tooltip>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="match-list">
          <div>
            <GameResultItem
              :playerPerformance="player"
              :isMatchPage="true"
              v-for="player of fullGameInfo.info.participants.slice(0, 5)"
              class="match-list__item"
              @click="goToSummonerPage(player.riotIdGameName, player.riotIdTagline)"
            />
          </div>
          <div class="match-list__divider"></div>
          <div>
            <GameResultItem
              :playerPerformance="player"
              :isMatchPage="true"
              v-for="player of fullGameInfo.info.participants.slice(-5)"
              class="match-list__item-right"
              @click="goToSummonerPage(player.riotIdGameName, player.riotIdTagline)"
            />
          </div>
        </div>
      </section>
      <section>
        <DamageDealt :data="fullGameInfo"/>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import type {Match} from "~/types/Player/PlayerInfo";
import GameResultItem from "~/components/summoner/GameResultItem.vue";
import {getGameResult} from "~/utils/getGameResult";
import DamageDealt from "~/components/graphs/DamageDealt.vue";

const route = useRoute()
const router = useRouter()
const accountStore = useAccountStore()

const fullGameInfo = ref<Match | null>(null)
onMounted(async () => {
  fullGameInfo.value = await accountStore.getGameInfo(route.params.matchId as string)
  console.log(fullGameInfo.value)
})

function formatGameDuration(gameDurationInSeconds: number) {
  const minutes = Math.floor(gameDurationInSeconds / 60);
  const seconds = gameDurationInSeconds % 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${formattedSeconds}`;
}

function goToSummonerPage(name: string, tag: string) {
  router.push(`/summoner/${name}+${tag}`)
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
  &__results
    display: flex
    flex-direction: row
    width: 90%
    justify-content: space-between
    
.teams-results,
.teams-results_right
  display: flex
  flex-direction: row
  align-items: center
  column-gap: 20px
  margin-bottom: 10px
  &__game
    color: #2DEB90
    font-size: 18px
    width: 5em
.teams-results_right
  flex-direction: row-reverse
.game-duration
  color: #dccfcf
  font-size: 15px
.red
  color: #ff5859
.objectives,
.objectives_right
  display: flex
  flex-direction: row
  column-gap: 5px
  color: #fff
  &__icon
    display: flex
    flex-wrap: nowrap
    flex-direction: row
  &__text
    margin-left: 3px
.objectives_right
  flex-direction: row-reverse

.match-list
  display: flex
  justify-content: center
  align-content: center
  flex-wrap: wrap
  &__divider
    padding: 0 4px
  &__item
    width: 35em
    &-right
      flex-direction: row-reverse
      width: 35em
      text-align: right
</style>