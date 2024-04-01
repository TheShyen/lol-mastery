<template>
  <section class="detailed-info">
    <q-card class="detailed-info__card">
      <q-tabs
        v-model="player"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab v-for="player of playersFrames" :name="player.puuid">
          <img
            :src="getSquareChampionImg(player.championName + '.png')"
            alt="spell"
            width="36px"
            height="36px"
          />
        </q-tab>
      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="player" animated class="information">
        <q-tab-panel :name="playerFrame.puuid" v-for="(playerFrame, index) of playersFrames">
          <PlayerItemsTimeline :player-items-frames="playerFrame.itemFrames"/>
          <PlayerSkillLeveling
            :player-skill-frames="playerFrame.skillFrames"
            :champions-info="championsInfo"
            :playerId="index"
          />
          <PlayerRunes :selectedRunes="playersPerfomance[index].perks.styles"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";
import PlayerRunes from "~/components/match/PlayerRunes.vue";
import type {DataFramesType} from "~/types/DataFramesType";
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";
import type {PlayerPerformance} from "~/types/Player/PlayerPerformance";
import PlayerItemsTimeline from "~/components/match/PlayerItemsTimeline.vue";
import PlayerSkillLeveling from "~/components/match/PlayerSkillLeveling.vue";

const props = defineProps<{
  playersFrames: DataFramesType[],
  championsInfo: ChampionDetailedInfo[] | null,
  playersPerfomance: PlayerPerformance[]
}>()



const player = ref('')

onMounted(() => {
  player.value = props.playersFrames[0].puuid
})
</script>

<style scoped lang="sass">
.detailed-info
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  margin-top: 50px

  &__card
    width: 100%
    background-color: $content-bg-color

.information
  background-color: $content-bg-color
  min-height: 500px
  overflow: hidden

</style>