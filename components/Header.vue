<template>
  <q-header class="text-white header" reveal>
    <q-toolbar class="justify-evenly">
      <q-toolbar-title class="text-h5 name" shrink >
        <q-avatar size="lg">
          <img alt="logo" src="/headerLogo.png">
        </q-avatar>
        LoLMastery
      </q-toolbar-title>
      <q-tabs class="tabs" >
        <q-route-tab class="tab" name="images" @click="route.push('/')">{{ $t('main') }}</q-route-tab>
        <q-route-tab class="tab" name="videos" @click="route.push('/champions')">{{ $t('champions') }}</q-route-tab>
        <q-route-tab class="tab" name="articles" @click="route.push('/items')">{{ $t('items') }}</q-route-tab>
      </q-tabs>
    </q-toolbar>
    <div class="search">
      <q-input
        v-model="search"
        :input-style="{ color: 'yellow' }"
        color="yellow"
        filled
        label-slot
        label-color="yellow"
        square
      >
        <template v-slot:append>
          <q-icon color="yellow" name="search" @click="searchAccount(search)"/>
        </template>
        <template v-slot:label>
          {{$t('search')}}
        </template>
      </q-input>
      <q-list separator v-if="search.length">
        <q-item v-for="searchListItem in searchResult" v-ripple clickable class="search-item" @click="goToCharacterOrSummonerPage(searchListItem)">
          <q-item-section avatar v-if="typeof searchListItem !== 'string'">
            <q-avatar square>
              <q-img :src="getSquareChampionImg(searchListItem.image.full)"></q-img>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="search-item__text">{{searchListItem.name || searchListItem}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-select square filled v-model="languageStore.locale" color="black" bg-color="yellow" :popup-content-style="languageStyle" :options="languageArray" class="lang"/>
  </q-header>
</template>

<script setup lang="ts">
import {languageArray} from "~/constants/language";
import {useLangStore} from "~/stores/LanguageStore";
import type {ChampionData} from "~/types/Champions";
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";
import {nickConversion} from "~/utils/nickConversion";

const route = useRouter()
const languageStore = useLangStore()
const champStore = useChampionStore()
const {t} = useI18n()
const languageStyle = { backgroundColor: '#F2E437', fontFamily: 'Helvetica Neue Bold'}
const search = ref('')
const searchResult = ref<(ChampionData | string)[]>([])
watch(search, (newSearchValue) => {
  if(newSearchValue.length) {
    searchResult.value = champStore.champions.filter(item => item.name.toLowerCase().startsWith(newSearchValue.toLowerCase()))
    if(newSearchValue.includes('#')) {
      searchResult.value.push(newSearchValue)
    }
    if(newSearchValue && !searchResult.value.length) {
      
      searchResult.value.push(t('nothingFound'))
    }
  }
  else {
    searchResult.value = []
  }
})

function goToCharacterOrSummonerPage(champ: ChampionData | string) {
  if (searchResult.value.includes(t('nothingFound'))) {
    return;
  }
  if (typeof champ == 'string') {
    searchAccount(champ)
  } else {
    route.push(`/champions/${champ.id}`)
  }
  search.value = ''
}

async function searchAccount(val:string) {
  await route.push('/summoner/' + nickConversion(val))
}
</script>

<style scoped lang="sass">
.header
  height: 62px
  display: flex
  justify-content: center
.name
  color: $gold-color
  font-family: "Helvetica Neue Bold", sans-serif
.header
  background: $primary-bg-color

.tabs
  color: $gold-color
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 22px
.tab
  text-transform: none
  
.lang
  color: $gold-color
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 18px
  width: 80px
  margin-top: 3px
  margin-right: 100px
  margin-left: 50px
.search
  margin-top: 3px
  width: 20em
.search-item
  background-color: $primary-bg-color
  &:hover
    transition: 0.5s all
    background-color: $secondary-bg-color
  &__text
    color: $gold-color
    
</style>