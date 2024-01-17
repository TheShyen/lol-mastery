<template>
  <q-card class="champion-card" square flat @click="router.push(`/champions/${champion.id}`)">
    <img :src="getSplashArtImageURL(champion.id)" :alt="champion.name" class="champion-card__image">

    <q-card-section>
      <div class="champion-card__name text-h6">{{champion.name}}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {getSplashArtImageURL} from "~/services/getSplashArtImageURL";
import type {ChampionData} from "~/types/Champions";
const router = useRouter()

defineProps<{
  champion: ChampionData
}>()
</script>

<style scoped lang="sass">
.q-card__section--vert
  padding: 0px
.champion-card
  width: 100%
  max-width: 250px
  max-height: 340px
  transition: .3s
  &__image
    height: 280px
    max-width: 260px
    object-fit: cover
    object-position: 80% center
    
  &__name
    padding: 8px 15px
    background-color: $gold-color
    text-transform: uppercase
    font-family: "Beaufort for LOL Bold"
    transition: .3s
      
  &:hover
    transform: scale(1.02)
    cursor: pointer
    color: $gold-color
    .champion-card__name
      padding: 8px 23px
      background-color: #12211a
</style>