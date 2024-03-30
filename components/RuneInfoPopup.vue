<template>
  <q-menu fit anchor="bottom start" self="top left" dark square v-if="ability">
    <div class="rune">
      <div class="text-h6 rune__name">{{ ability.name }}</div>
      <div class="rune__desc" v-html="ability.longDesc"></div>
    </div>
  </q-menu>
</template>

<script setup lang="ts">

import type {RuneType} from "~/types/RunesType";

defineProps<{
  ability: RuneType,
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