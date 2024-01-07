<template>
  <q-card class="champion-card" square flat @click="router.push(`/champions/${champion.id}`)">
    <img :src="getSplashArtImage(champion.id)" :alt="champion.name" class="champion-card__image">

    <q-card-section>
      <div class="champion-card__name text-h6">{{champion.name}}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {getSplashArtImage} from "~/services/getSplashArtImage";
const router = useRouter()

defineProps(['champion'])
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
    height: 35vh
    max-width: 260px
    object-fit: cover
    
  &__name
    padding: 8px 15px
    background-color: #F2E437
    text-transform: uppercase
    font-family: "Beaufort for LOL Bold"
    transition: .3s
      
  &:hover
    transform: scale(1.02)
    cursor: pointer
    color: #F2E437
    .champion-card__name
      padding: 8px 23px
      background-color: #12211a
</style>