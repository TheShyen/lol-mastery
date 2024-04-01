<template>
  <table class="skill-table">
    <thead>
    <tr>
      <th class="skill-table__header"></th>
      <th class="skill-table__header" v-for="index of playerSkillFrames.length">{{ index }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="i of 4">
      <th>
        <q-img v-if="championsInfo" :src="getSpellImageURL(championsInfo[playerId].spells[i-1].image.full)" width="32px">
          <SkillInfoPopup :ability="championsInfo[playerId].spells[i-1]" :championKey="championsInfo[playerId].key"/>
        </q-img>
      </th>
      <template v-for="skill of playerSkillFrames">
        <td v-if="skill.skillSlot === i">{{ SKILLS[skill.skillSlot as keyof typeof SKILLS] }}</td>
        <td v-else></td>
      </template>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {getSpellImageURL} from "~/services/getSpellImageUrl";
import {SKILLS} from "~/constants/skills";
import type {SkillFrame} from "~/types/DataFramesType";
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";


defineProps<{
  playerSkillFrames: SkillFrame[],
  championsInfo: ChampionDetailedInfo[] | null,
  playerId: number
}>()
</script>

<style scoped lang="sass">
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