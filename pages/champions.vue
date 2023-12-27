<template>
  <div>
    <div class="champions">
      <div class="champion-list">
        <div v-for="champion in champions" :key="champion.name" class="champion-item">
          <img :src="getImage(champion.image.full)" :alt="champion.name" class="champion-icon" />
          <p>{{ champion.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ChampionData} from "~/types/Champions";
import {getImage} from "~/services/getImage";

const store = useChampionStore()

const champions = ref<ChampionData[] | []>([]);
onMounted(() => {
  store.getChampions()
  champions.value = store.champions
})
</script>

<style scoped lang="sass">
.champions
  max-width: 1050px
  margin: 0 auto
  margin-top: 100px
.champion-list
  display: flex
  flex-wrap: wrap
  justify-content: space-between


.champion-item
  text-align: center
  margin: 10px


.champion-icon
  width: 100px
  height: 100px

</style>