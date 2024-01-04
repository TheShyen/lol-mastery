<template>
  <q-card class="champion-card">
    <img :src="getSplashArtImage(champion.id)" :alt="champion.name" class="champion-card__image">

    <q-card-section>
      <div class="champion-card__name text-h6">{{champion.name}}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {getSplashArtImage} from "~/services/getSplashArtImage";

defineProps(['champion'])
</script>

<style scoped lang="sass">
.q-card__section--vert
  padding: 0px
.champion-card
  width: 100%
  max-width: 260px
  max-height: 340px
  &__image
    height: 31vh
    max-width: 260px
    object-fit: cover
  &__name
    padding: 8px 15px
    background-color: #212121
    color: white

    text-transform: uppercase
    font-family: "Beaufort for LOL Bold"
</style>