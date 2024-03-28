<template>
  <q-menu fit anchor="bottom start" self="top left" dark square v-if="ability">
    <div class="ability">
      <div class="text-h6 ability__name">{{ ability.name }}</div>
      <div class="ability__cost-cooldown">{{$t('cost')}} {{ability?.costBurn}}</div>
      <div class="ability__cost-cooldown">{{$t('cooldown')}} {{ability?.cooldownBurn}}</div>
      <div class="ability__tooltip" v-html="reformatAbilityDesc(ability.tooltip)"></div>
      <div v-html="ability.description" class="ability__desc"></div>
      <div class="ability__api-info">{{$t('symbolInfo')}}</div>
    </div>
    <div class="spells-video">
      <video class="spells-video__source" muted autoplay loop>
        <source :src="getSpellVideoURL(reformatChampionKey(championKey), ability.id.slice(-1))" type="video/webm">
      </video>
    </div>
  </q-menu>
</template>

<script setup lang="ts">

import {getSpellVideoURL} from "~/services/getSpellVideoURL";
import type {Spell} from "~/types/ChampionInfo";
import {reformatAbilityDesc} from "~/utils/reformatDataUtils/reformatAbilityDesc";
import {reformatChampionKey} from "~/utils/reformatDataUtils/reformatChampionKey";
defineProps<{
  ability: Spell,
  championKey: string
}>()
</script>

<style scoped lang="sass">
.ability
  padding: 15px 15px 0 15px
  max-width: 500px
  font-family: "Beaufort for LOL Bold"
  &__name
    color: $gold-color
  &__api-info
    font-size: 12px
    padding-top: 10px
  &__desc
    color: $blue-color
    font-size: 14px
    margin-top: 10px
  &__tooltip
    color: #f86b6b
    font-size: 14px
    margin-top: 10px
  &__cost-cooldown
    color: #56cca8
    font-size: 12px
    margin-top: 2px

.spells-video
  display: flex
  justify-content: center
  &__source
    width: 300px
    height: 250px
</style>