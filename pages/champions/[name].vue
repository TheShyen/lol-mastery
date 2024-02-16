<template>
  <div v-if="champion">
    <ChampionPage >
      <ChampionPagePreview :champion="champion"/>
      <ChampionPageInfo :champion="champion"/>
    </ChampionPage>
  </div>
</template>

<script setup lang="ts">

import type {ChampionDetailedInfo} from "~/types/ChampionInfo";

const route = useRoute()
const store = useChampionStore()
const champion = ref<ChampionDetailedInfo | null>(null)

champion.value = await store.getChampion(route.params.name as string)
if (!champion.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}


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