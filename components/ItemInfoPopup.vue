<template>
  <q-menu fit anchor="bottom start" self="top left" dark square max-height="300">
    <div class="item-info">
      <div class="item-info__name">{{ itemInfo.name }}</div>
      <div v-html="formatItemText(itemInfo.description)"></div>
      <div class="item-info__cost">{{$t('goldCost')}} {{ itemInfo.gold.total }}</div>
    </div>
  </q-menu>
</template>

<script setup lang="ts">
import {formatItemText} from "~/utils/formatItemText";
import type {ItemData} from "~/types/ItemsType";
defineProps<{
  itemInfo: ItemData
}>()
</script>

<style scoped lang="sass">
.item-info
  padding: 10px 10px
  max-width: 500px
  font-family: "Beaufort for LOL Bold", sans-serif
  &__name
    color: #eacaa0
  &__cost
    color: $gold-color
    padding-top: 10px
</style>