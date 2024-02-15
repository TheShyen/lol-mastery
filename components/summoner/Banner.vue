<template>
  <section class="banner" :style="{ backgroundImage: `url(${getSplashArtImageURL(<string>mainChampion?.id)})` }">
    <div class="banner__icon">
      <q-img :src="getProfileIconUrl(summonerAccountInfo.profileIconId)"/>
    </div>
    <div class="banner-info">
      <div class="banner-info__name">{{ summonerAccountInfo.name }}</div>
      <div class="banner-info__lvl">{{$t('level')}}: {{summonerAccountInfo.summonerLevel}}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {getSplashArtImageURL} from "~/services/getSplashArtImageURL";
import {getProfileIconUrl} from "~/services/getProfileIconUrl";
import type {AccountInfo} from "~/types/Player/PlayerInfo";
import type {ChampionData} from "~/types/Champions";

defineProps<{
  summonerAccountInfo: AccountInfo,
  mainChampion: ChampionData | null
}>()
</script>

<style scoped lang="sass">
.banner
  min-height: 300px
  display: flex
  justify-content: flex-start
  align-items: flex-end
  &__icon
    width: 64px
    height: 64px
    margin-bottom: 20px
    margin-left: 20px
    margin-right: 5px
.banner-info
  font-family: "Helvetica Neue Bold",sans-serif
  color: #ffffff
  padding: 20px 20px
  &__name
    font-size: 34px
  &__lvl
    font-size: 16px
</style>