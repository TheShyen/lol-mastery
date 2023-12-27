<template>
  <div>
    <div class="champions">
      <div class="info">
        <div class="info__title">Чемпионы</div>
        <div class="info__desc"></div>
        <div class="info__btn"></div>
      </div>
      <div class="roles">
        <q-tabs class="roles__tabs">
          <q-tab v-for="role in roles">
            <img src="/media/assasins.svg" alt="aa"/>
            {{ role }}
          </q-tab>
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {ChampionData} from "~/types/Champions";

const store = useChampionStore()

const roles = ref(['Убийцы', 'Войны', 'Маги', 'Стрелки', 'Поддержка', 'Танки'])
const champions = ref<ChampionData[] | []>([]);
onMounted(() => {
  store.getChampions()
  champions.value = store.champions
})
</script>

<style lang="sass" scoped>
.champions
  height: 800px
  background-color: #212121

.info
  color: #F2E437
  display: flex
  justify-content: center
  flex-direction: column
  margin: 0 auto
  padding-top: 150px
  text-align: center
  
  &__title
    font-family: "Beaufort for LOL Bold"
    font-size: 74px

.roles
  &__tabs
    font-family: "Beaufort for LOL Bold"
    color: #F2E437
</style>