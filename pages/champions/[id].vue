<template>
  <Spinner v-if="store.isLoading"/>
  <div v-else>
    <Error v-if="!champion"/>
    <div v-else>
      <ChampionPagePreview :champion="champion"/>
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
              <div class="spells-info__title title">Умения</div>
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
                  <q-tab-panel :name="champion.passive.name" class="ability-desc">
                    <div class="text-h5">{{ champion.passive.name }}</div>
                    <div v-html="champion.passive.description"></div>
                  </q-tab-panel>
                  <q-tab-panel v-for='ability of champion.spells' :name="ability.name" class="ability-desc">
                    <div class="text-h5">{{ ability.name }}</div>
                    <div v-html="ability.description"></div>
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
    </div>
  </div>
</template>

<script setup lang="ts">

import {getSplashArtImageURL} from "~/services/getSplashArtImageURL";
import type {ChampionDetailedInfo} from "~/types/ChampionInfo";
import {ROLES} from "../../constants/roles";
import {getPassiveImageURL, getSpellImageURL} from "~/services/getSpellImageUrl";
import Error from "~/components/error.vue";
import Spinner from "~/components/UI/Spinner.vue";
import {getSpellVideoURL} from "~/services/getSpellVideoURL";


const route = useRoute()
const store = useChampionStore()
const champion = ref<ChampionDetailedInfo | null>(null)
const tab = ref('aboba')
const keys = ['Q', 'W', 'E', 'R']
onMounted(async () => {
  champion.value = await store.getChampion(route.params.id as string)
  if (champion.value) {
    tab.value = champion.value.passive.name
  }
})
</script>

<style scoped lang="sass">

.champion-promo
  padding-top: 80px
  overflow: hidden
  position: relative

  &__wrapper
    max-width: 1100px
    margin: 0 auto
    min-height: 700px

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
.ability-desc
  color: $gold-color
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 14px
</style>