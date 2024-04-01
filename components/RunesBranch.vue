<template>
  <div class="rune">
    <div class="rune__name text-h6">{{ runes.name }}</div>
    <div v-for="slot of runes.slots" class="runeSlots">
      <div v-for="runeFromSlot of slot.runes">
        <q-img :src="getRuneImageUrl(runeFromSlot.icon)" height="48px" width="48px" class="runeSlots__icon">
          <RuneOrSkillInfoPopup :data="runeFromSlot"/>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getRuneImageUrl} from "~/services/getRuneImageUrl";
import RuneOrSkillInfoPopup from "~/components/RuneOrSkillInfoPopup.vue";
import type {RuneType} from "~/types/RunesType";

const props = defineProps<{
  runes: RuneType,
}>()
</script>

<style scoped lang="sass">
.rune
  display: flex
  align-items: center
  flex-direction: column
  row-gap: 15px
  &__name
    color: #9cb6ec
.runeSlots
  display: flex
  flex-direction: row
  gap: 0 15px
  &__icon
    cursor: pointer
    transition: 0.6s all
    &:hover
      transform: scale(1.15)
</style>