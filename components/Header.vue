<template>
  <q-header class="text-white header" reveal style="height: 62px">
    <q-toolbar class="justify-between">
      <q-toolbar-title class="text-h5 name" shrink >
        <q-avatar size="lg">
          <img alt="logo" src="/headerLogo.png">
        </q-avatar>
        LoLMastery
      </q-toolbar-title>
      <q-tabs class="tabs q-mt-xs" >
        <q-route-tab class="tab" name="images" @click="route.push('/')">{{ $t('main') }}</q-route-tab>
        <q-route-tab class="tab" name="videos" @click="route.push('/champions')">{{ $t('champions') }}</q-route-tab>
        <q-route-tab class="tab" name="articles" @click="route.push('/items')">{{ $t('items') }}</q-route-tab>
      </q-tabs>
      <q-select square filled v-model="languageStore.locale" color="black" bg-color="yellow" :popup-content-style="languageStyle" :options="languageArray" class="lang"/>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import {languageArray} from "~/constants/language";
import {useLangStore} from "~/stores/LanguageStore";

const route = useRouter()
const languageStore = useLangStore()

const languageStyle = { backgroundColor: '#F2E437', fontFamily: 'Helvetica Neue Bold'}
</script>

<style scoped lang="sass">
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
</style>