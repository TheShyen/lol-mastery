<template>
  <section class="champion-promo">
    <div class='bg-image' :style="{ backgroundImage: `url(${getSplashArtImageURL(<string>champion.id)})` }">
      <div class="overlay"></div>
    </div>
    <div class="champion-promo__wrapper">
      <div class="preview">
        <div class="splash-art">
          <img :src="getSplashArtImageURL(<string>champion.id)" :alt="champion.id" class="splash-art__img"/>
          <div class="splash-art__subtitle subtitle">{{ champion.name }}</div>
          <div class="splash-art__title title">{{ champion.title }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {getSplashArtImageURL} from "~/services/getSplashArtImageURL";
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";
defineProps<{
  champion: ChampionDetailedInfo
}>()
</script>

<style scoped lang="sass">
.champion-promo
  padding-top: 80px
  overflow: hidden
  position: relative

  &__wrapper
    max-width: 1100px
    margin: 0 auto
    min-height: 750px

.bg-image
  position: absolute
  top: -5%
  left: -5%
  width: 110%
  height: 110%
  background-size: cover
  filter: blur(5px)
  background-clip: content-box

.overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.65)

.preview
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center

.splash-art
  display: flex
  justify-content: center

  &__img
    width: 70vw
    position: relative

  &__subtitle
    position: absolute
    top: 70%
    left: 50%
    transform: translateX(-50%)
    font-size: calc(43.27px + 2.12vw)
    letter-spacing: 0.03em

  &__title
    position: absolute
    top: 68%
    left: 50%
    font-size: 1.4rem
    letter-spacing: 0.1em
    transform: translateX(-50%)

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