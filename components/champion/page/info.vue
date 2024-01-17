<template>
  <section class="champion-info">
    <div class="champion-info__wrapper">
      <div class="info">
        <div class="info__left">
          <div class="role">
            <div class="head">Роль</div>
            <div class="subhead">{{ ROLES[champion.tags[0]] }}</div>
          </div>
          <div class="difficult">
            <div class="head">Сложность</div>
            <div class="subhead">{{ champion.info.difficulty }}</div>
          </div>
        </div>
        <div class="info__divider"></div>
        <div class="info__right">{{ champion.blurb }}</div>
      </div>
      <div class="spells">
        <div class="spells-info">
          <div class="title spells-info__title">Умения</div>
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

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel :name="champion.passive.name">
                <div class="text-h5 ability-title">{{ champion.passive.name }}</div>
                <div v-html="champion.passive.description" class="ability-desc"></div>
              </q-tab-panel>
              <q-tab-panel v-for='ability of champion.spells' :name="ability.name">
                <div class="text-h5 ability-title">{{ ability.name }}</div>
                <div v-html="ability.description" class="ability-desc"></div>
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
import {ROLES} from "~/constants/roles";
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";


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
</script>

<style scoped lang="sass">
.champion-info
  background: $secondary-bg-color

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
    justify-content: center
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
    font-family: "Helvetica Neue Bold", sans-serif
    color: #FFFFFF

.head
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 18px
  color: #FFFFFF

.subhead
  font-family: "Beaufort for LOL Bold"
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
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 18px
  color: #ffffff
  left: 70%
.q-card
  box-shadow: none
.q-tab-panels
  background: none
.ability-title
  color: $gold-color
.ability-desc
  color: $blue-color
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 14px
  margin-top: 10px
</style>