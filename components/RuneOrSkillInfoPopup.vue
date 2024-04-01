<template>
  <q-menu fit anchor="bottom start" self="top left" dark square v-if="data">
    <div class="rune">
      <div class="text-h6 rune__name">{{ data.name }}</div>
      <div class="rune__desc" v-html="data.longDesc || data.description"></div>
    </div>
  </q-menu>
</template>

<script setup lang="ts">

import type {RuneType} from "~/types/RunesType";
import type {SummonerSpell} from "~/types/SummonerSpellsType";

defineProps<{
  data: RuneType | SummonerSpell,
}>()
</script>

<style scoped lang="sass">
.rune
  padding: 15px 15px
  max-width: 500px
  font-family: "Beaufort for LOL Bold"
  &__name
    color: $gold-color
  &__desc
    color: #d7c2ec
    font-size: 14px
    margin-top: 10px

</style>