<template>
  <div class="progress">
    <img
      :src="getSquareChampionImg(championName + '.png')"
      class="icon"
      alt="champion"
    />
    <q-linear-progress size="20px" :value="progress" :color="color">
      <div class="absolute-full flex flex-start">
        <q-badge :color="color" text-color="white" :label="label"/>
      </div>
    </q-linear-progress>
  </div>
</template>

<script setup lang="ts">


import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";

defineProps<{
  progress: number,
  label: number,
  championName: string,
  color?: string
}>()
</script>

<style scoped lang="sass">
.progress
  display: flex
  width: 100px

.icon
  width: 20px
  height: 20px
</style>