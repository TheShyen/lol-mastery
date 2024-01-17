<template>
  <Spinner v-if="store.isLoading"/>
  <div v-else>
    <Error v-if="!champion"/>
    <ChampionPage v-else>
      <ChampionPagePreview :champion="champion"/>
      <ChampionPageInfo :champion="champion"/>
    </ChampionPage>
  </div>
</template>

<script setup lang="ts">

import type {ChampionDetailedInfo} from "~/types/ChampionInfo";

import Error from "~/components/error.vue";
import Spinner from "~/components/UI/Spinner.vue";



const route = useRoute()
const store = useChampionStore()
const champion = ref<ChampionDetailedInfo | null>(null)
onMounted(async () => {
  champion.value = await store.getChampion(route.params.id as string)
})
</script>

<style lang="sass">

.subtitle
  font-family: "Beaufort for LOL Bold"
  font-style: italic
  font-weight: bolder
  color: white
  text-transform: uppercase

.title
  font-family: "Beaufort for LOL Bold"
  font-style: italic
  color: white
  text-transform: uppercase

</style>