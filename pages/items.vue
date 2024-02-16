<template>
  <div class="items">
    <div class="items__wrapper">
      <div class="items-section" v-for="(itemGroup, key) in store.groupedItems" :key="key">
        <div class="items-section__name">{{ $t(key) }}</div>
        <q-skeleton height="60px" style="padding-bottom: 20px" v-if="store.isLoading">
        </q-skeleton>
        <div class="items-list">
          <div class="item" v-for="item in itemGroup">
            <q-img :alt="item.name" :src="getItemImageUrl(item.image.full)" loading="lazy" class="item__icon">
              <template v-slot:loading>
                <q-skeleton square size="50px"/>
              </template>
            </q-img>
            <q-menu fit anchor="bottom start" self="top left" dark square max-height="300">
              <div class="item-info">
                <div class="item-info__name">{{ item.name }}</div>
                <div v-html="formatItemText(item.description)"></div>
                <div class="item-info__cost">{{ $t('goldCost') }} {{ item.gold.total }}</div>
              </div>
            </q-menu>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useItemStore} from "~/stores/ItemsStore";
import {getItemImageUrl} from "~/services/getSpellImageUrl";
import {formatItemText} from "~/utils/formatItemText";


const store = useItemStore()




</script>

<style scoped lang="sass">
.items
  background: $secondary-bg-color
  padding-top: 80px
  padding-bottom: 40px
  color: #b41a7b
  font-family: "Helvetica Neue Bold", sans-serif

  &__wrapper
    margin: 0 auto
    max-width: 1300px
    min-height: 800px

.items-list
  display: flex
  flex-wrap: wrap
  gap: 10px 10px

.items-section
  display: flex
  flex-wrap: wrap
  flex-direction: column
  margin-top: 10px
  min-height: 100px
  &__name
    font-size: 20px
    color: $blue-color
    margin-bottom: 5px

.item
  text-align: center
  cursor: pointer

  &:hover
    transition: 0.5s all
    transform: scale(1.1)

  &__icon
    width: 50px
    height: 50px

  &__text
    font-size: 12px
    color: #FFFFFF

.item-info
  padding: 10px 10px
  max-width: 500px

  &__name
    color: #eacaa0

  &__cost
    color: $gold-color
    padding-top: 10px
</style>