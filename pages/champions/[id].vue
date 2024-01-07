<template>
  <div class="champion">
    <div class="champion__wrapper">
      <div class="preview">
        <div class="splash-art">
          <img :src="getSplashArtImage(<string>champion?.id)" :alt="champion?.id" class="splash-art__img"/>
          <div class="splash-art__subtitle">{{champion?.name}}</div>
          <div class="splash-art__title">{{champion?.title}}</div>
        </div>
        <div class="info">
          <div class="info__left">
            <div class="role"></div>
            <div class="difficult"></div>
          </div>
          <div class="info__divider"></div>
          <div class="info__right"></div>
        </div>
      </div>
      <div class="spells"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ChampionData} from "~/types/Champions";
import {getSplashArtImage} from "~/services/getSplashArtImage";

const route = useRoute()
const store = useChampionStore()
const champion = ref<ChampionData | null>(null)

onMounted(()=> {
  champion.value = store.getChampion(route.params.id as string)
})
 
</script>

<style scoped lang="sass">
.champion
  background: #212121
  padding-top: 80px
  &__wrapper
    max-width: 1100px
    margin: 0 auto
    min-height: 800px
    
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
    top: 60%
    left: 50%
    font-family: "Beaufort for LOL Bold"
    font-style: italic
    font-size: calc(43.27px + 2.12vw)
    letter-spacing: 0.03em
    font-weight: bolder
    color: white
    text-transform: uppercase
    transform: translateX(-50%)
  &__title
    position: absolute
    top: 58%
    left: 50%
    font-family: "Beaufort for LOL Bold"
    font-style: italic
    font-size: 1.4rem
    letter-spacing: 0.1em
    color: white
    text-transform: uppercase
    transform: translateX(-50%)
    
</style>