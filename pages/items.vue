<template>
  <Spinner v-if="store.isLoading"/>
  <div v-else class="items">
    <div  class="items__wrapper">
      <div class="items-list">
        <div v-for="item in store.items" :key="item.name" class="item" @click="console.log(item)">
          <img :alt="item.name" :src="getItemImageUrl(item.image.full)" class="item__icon"/>
<!--          <div class="item__text">{{ item.name }}</div>-->
        </div>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">

import Spinner from "~/components/UI/Spinner.vue";
import {useItemStore} from "~/stores/ItemsStore";
import {getItemImageUrl} from "~/services/getSpellImageUrl";
const store = useItemStore()

onMounted( () => {
  store.getItems()
})
</script>

<style scoped lang="sass">
.items
  background: $secondary-bg-color
  padding-top: 100px
  &__wrapper
    margin: 0 auto
    max-width: 1300px
    min-height: 800px
.items-list
  display: flex
  flex-wrap: wrap
  justify-content: space-between
.item
  text-align: center
  margin: 10px
  &__icon
    width: 50px
    height: 50px
  &__text
    font-family: "Helvetica Neue Bold", sans-serif
    font-size: 12px
    color: #FFFFFF
</style>