<template>
  <q-header class="text-white header" reveal style="height: 60px">
    <q-toolbar class="justify-center">
      <q-toolbar-title class="text-h4 name" shrink >
        <q-avatar>
          <img alt="logo" src="/headerLogo.png">
        </q-avatar>
        LoL Mastery
      </q-toolbar-title>
      <q-tabs class="tabs text-h7 q-mt-xs" >
        <NuxtLink to="/"><q-route-tab class="tab" name="images">Главная</q-route-tab></NuxtLink>
        <NuxtLink to="/champions"><q-route-tab class="tab" name="videos">Чемпионы </q-route-tab></NuxtLink>
        <q-route-tab class="tab" name="articles">Предметы</q-route-tab>
      </q-tabs>
    </q-toolbar>

  </q-header>
</template>

<script setup lang="ts">

const route = useRouter()
</script>

<style scoped lang="sass">
.name
  color: #FFFFFF
.header
  background: #212121

.tabs
  width: 500px
  color: #F2E437
  font-family: "Helvetica Neue Bold", sans-serif
  font-size: 20px
</style>