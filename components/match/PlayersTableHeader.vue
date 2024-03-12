<template>
  <div class="match-table__results">
    <div class="teams-results">
      <div
        class="teams-results__game"
        :class="{red : !matchInfo.teams[0].win}"
      >
        {{ getGameResult(matchInfo.teams[0].win, $t) }}
      </div>
      <div class="objectives">
        <template v-for="(object, objectName) of matchInfo.teams[0].objectives">
          <div v-if="objectName != 'champion'" class="objectives__icon">
            <img :src="`/objectIcons/${objectName}.svg`"/>
            <div class="objectives__text">
              {{ object.kills }}
            </div>
            <q-tooltip>
              {{ $t(`${objectName}`) }}
            </q-tooltip>
          </div>

        </template>
      </div>
    </div>
    <div class="game-duration">
      {{ formatGameDuration(matchInfo.gameDuration) }}
    </div>
    <div class="teams-results_right">
      <div
        class="teams-results__game"
        :class="{red : !matchInfo.teams[1].win}"
      >
        {{ getGameResult(matchInfo.teams[1].win, $t) }}
      </div>
      <div class="objectives_right">
        <template v-for="(object, objectName) of matchInfo.teams[1].objectives">
          <div v-if="objectName != 'champion'" class="objectives__icon">
            <img :src="`/objectIcons/${objectName}.svg`"/>
            <div class="objectives__text">
              {{ object.kills }}
            </div>
            <q-tooltip>
              {{ $t(`${objectName}`) }}
            </q-tooltip>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {MatchInfo} from "~/types/Player/PlayerInfo";

defineProps<{
  matchInfo: MatchInfo
}>()

function formatGameDuration(gameDurationInSeconds: number) {
  const minutes = Math.floor(gameDurationInSeconds / 60);
  const seconds = gameDurationInSeconds % 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${formattedSeconds}`;
}
</script>

<style scoped lang="sass">
.match-table
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
</style>