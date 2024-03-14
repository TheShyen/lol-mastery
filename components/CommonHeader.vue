<template>
  <q-header class="text-white header" reveal>
    <q-toolbar class="justify-evenly">
      <q-toolbar-title class="text-h5 name" shrink @click="route.push('/')">
        <q-avatar size="lg">
          <img alt="logo" src="/headerLogo.png">
        </q-avatar>
        LoLMastery
      </q-toolbar-title>
      <q-tabs class="tabs" >
        <q-route-tab class="tab" name="videos" @click="route.push('/champions')">{{ $t('champions') }}</q-route-tab>
        <q-route-tab class="tab" name="articles" @click="route.push('/items')">{{ $t('items') }}</q-route-tab>
        <q-route-tab class="tab" name="articles" @click="route.push('/topPlayers')">{{$t('bestPlayers')}}</q-route-tab>
      </q-tabs>
    </q-toolbar>
    <q-select borderless dark v-model="accountStore.region" :popup-content-style="regionStyle" class="region" :options="regionNamesArray" />
    <div class="search">
      <q-input
        v-model="search"
        :input-style="{color: 'yellow'}"
        ref="searchElementRef"
        color="yellow"
        @focus="isFocus = true"
        filled
        type="search"
        label-slot
        label-color="yellow"
        square
      >
        <template v-slot:append>
          <q-icon color="yellow" name="search"/>
        </template>
        <template v-slot:label>
          {{$t('search')}}
        </template>
      </q-input>
      <q-list v-if="search.length || isFocus" separator>
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
        <q-separator dark />
        <q-item
          v-for="recentItem in appStore.recentPlayers"
          v-ripple
          class="search-item"
          clickable
          @click="searchAccount(recentItem)"
        >
          <q-item-section>
            <q-item-label class="search-item__text">{{recentItem}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-select square filled v-model="languageStore.locale" color="black" bg-color="yellow" :popup-content-style="languageStyle" :options="languageArray" class="lang"/>
  </q-header>
</template>

<script setup lang="ts">
import {languageArray} from "~/constants/language";
import type {ChampionData} from "~/types/Champions";
import {getSquareChampionImg} from "~/services/getChampionSquareImageUrl";
import {nickConversion} from "~/utils/nickConversion";
import type {VNodeRef} from "vue";
import {regionNamesArray} from "~/constants/region";

const route = useRouter()
const languageStore = useLangStore()
const champStore = useChampionStore()
const appStore = useAppStore()
const accountStore = useAccountStore()
const {t} = useI18n()

const languageStyle = { backgroundColor: '#F2E437', fontFamily: 'Helvetica Neue Bold'}
const regionStyle = {fontFamily: 'Helvetica Neue Bold', fontSize: '12px'}

const search = ref('')
const searchResult = ref<(ChampionData | string)[]>([])
const isFocus = ref(false)
const searchElementRef = ref<VNodeRef>('')

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})
function handleClickOutside (event: Event) {
  if(event.target !== searchElementRef.value.nativeEl) {
    isFocus.value = false
  }
}
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

function searchAccount(val:string) {
  route.push('/summoner/' + nickConversion(val))
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
  cursor: pointer
  transition: 0.6s all
  &:hover
    transform: scale(1.05)
    
.header
  background: $primary-bg-color

.tabs
  color: $gold-color
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 22px
.tab
  text-transform: none
.region
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 12px
  width: 80px
  margin-top: 3px
  margin-right: 10px
  margin-left: 50px
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
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    
</style>