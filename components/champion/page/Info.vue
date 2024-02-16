<template>
  <section class="champion-info">
    <div class="champion-info__wrapper">
      <div class="info">
        <div class="info__left">
          <div class="role">
            <div class="head">{{ $t('role') }}</div>
            <div class="subhead">{{ calcRole(champion.tags[0]) }}</div>
          </div>
          <div class="difficult">
            <div class="head">{{ $t('difficulty') }}</div>
            <div class="subhead">{{ calcDifficult(champion.info.difficulty) }}</div>
          </div>
        </div>
        <div class="info__divider"></div>
        <div class="info__right">{{ champion.blurb }}</div>
      </div>
      <div class="spells">
        <div class="spells-info">
          <div class="title spells-info__title">{{ $t('abilities') }}</div>
          <q-card class="spells-info__abilities">
            <q-tabs
                v-model="tab"
                dense
                class="text-yellow-2"
                active-color="yellow"
                indicator-color="yellow"
                align="justify"
                narrow-indicator
            >
              <q-tab :name="champion.passive.name">
                <img :src="getPassiveImageURL(champion.passive.image.full)" alt="passive"/>
              </q-tab>
              <q-tab v-for="spell of champion.spells" :name="spell.name">
                <img :src="getSpellImageURL(spell.image.full)" alt="spell"/>
              </q-tab>
            </q-tabs>

            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              transition-next="jump-up"
              transition-prev="jump-up"
            >
              <q-tab-panel :name="champion.passive.name" class="ability">
                <div class="text-h5 ability__text">{{ champion.passive.name }}</div>
                <div v-html="champion.passive.description" class="ability__desc"></div>
              </q-tab-panel>
              <q-tab-panel v-for='ability of champion.spells' :name="ability.name" class="ability" >
                <div class="text-h5 ability__text">{{ ability.name }}</div>
                <div class="ability__cost-cooldown">{{$t('cost')}} {{ability?.costBurn}}</div>
                <div class="ability__cost-cooldown">{{$t('cooldown')}} {{ability?.cooldownBurn}}</div>
                <div class="ability__tooltip" v-html="reformatAbilityDesc(ability.tooltip)"></div>
                <div v-html="ability.description" class="ability__desc"></div>
                <div class="ability__text" style="padding-top: 10px">{{$t('symbolInfo')}}</div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <div class="spells-video">
          <video class="spells-video__source" muted autoplay loop v-show="tab === champion.passive.name">
            <source :src="getSpellVideoURL(reformatChampionKey(champion.key), 'P')" type="video/webm">
          </video>
          <template v-for="(spell, index) of champion.spells" :key="spell.name">
            <video class="spells-video__source" muted autoplay loop v-show="tab === spell.name">
              <source :src="getSpellVideoURL(reformatChampionKey(champion.key), keys[index])" type="video/webm">
            </video>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import {getPassiveImageURL, getSpellImageURL} from "~/services/getSpellImageUrl";
import {getSpellVideoURL} from "~/services/getSpellVideoURL";
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";
import {calcDifficult} from "~/utils/calcDifficult";
import {calcRole} from "~/utils/calcRole";


const props = defineProps<{
  champion: ChampionDetailedInfo,
}>()

onMounted(() => {
  if (props.champion) {
    tab.value = props.champion.passive.name
  }
  
})
const keys = ['Q', 'W', 'E', 'R']
const tab = ref('')
function reformatAbilityDesc(inputString: string) {
  return inputString.replace(/{{(.*?)}}/g, '?');
}
</script>

<style scoped lang="sass">
.champion-info
  background: $secondary-bg-color
  font-family: "Helvetica Neue Bold", sans-serif
  &__wrapper
    max-width: 1300px
    margin: 0 auto
    min-height: 850px

.info
  display: flex
  justify-content: center
  align-items: center
  flex-direction: row
  padding-top: 40px
  min-height: 200px

  &__left
    display: flex
    justify-content: space-around
    align-items: center
    flex-direction: row
    text-align: center
    padding: 3.75rem
    width: 500px

  &__divider
    width: 1px
    height: 180px
    background: rgba(255, 255, 255, 0.5)

  &__right
    padding: 3.75rem
    max-width: 500px
    color: #FFFFFF

.head
  font-size: 18px
  color: #FFFFFF

.subhead
  font-family: "Beaufort for LOL Bold", sans-serif
  font-size: 20px
  color: $gold-color

.spells
  display: flex
  justify-content: space-between
  align-items: flex-start
  flex-direction: row

.spells-info
  display: flex
  justify-content: space-around
  flex-direction: column
  padding-left: 50px
  &__title
    font-size: 50px
    padding: 26px 20px

  &__abilities
    background-color: $secondary-bg-color
    width: 500px
.spells-video
  padding-top: 50px
  &__source
    width: 550px
    height: 400px


.keybind
  position: absolute
  top: 65%
  font-size: 18px
  color: #ffffff
  left: 70%
.q-card
  box-shadow: none
.q-tab-panels
  background: none
.ability
  padding-bottom: 60px
  min-height: 500px
  &__text
    color: $gold-color
  &__desc
    color: $blue-color
    font-size: 14px
    margin-top: 10px
  &__tooltip
    color: #f86b6b
    font-size: 14px
    margin-top: 10px
  &__cost-cooldown
    color: #56cca8
    font-size: 13px
    margin-top: 2px
</style>