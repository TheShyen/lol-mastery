<template>
  <Spinner v-if="store.isLoading"/>
  <div v-else class="items">
    <div class="items__wrapper">
      <div class="items-list">
        <div v-for="item in store.items" :key="item.name" class="item" @click="console.log(item)">
          <img :alt="item.name" :src="getItemImageUrl(item.image.full)" class="item__icon"/>
          <q-menu fit anchor="bottom start" self="top left" dark square max-height="300">
            <div class="item-info">
              <div class="item-info__name">{{ item.name }}</div>
              <div>{{ item.plaintext }}</div>
              <div v-html="formatText(item.description)"></div>
              <div>{{ item.gold.total }}</div>
            </div>
          </q-menu>
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

onMounted(() => {
  store.getItems()
})

const colorMap = {
  attention: '#b9265d',
  passive: '#00D2F4',
  rules: '#f17006',
  status: '#7fe193',
  lifeSteal: 'red',
  ornnBonus: '#b9265d',
};
function formatText(originalText: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(originalText, 'text/html');

  const applyStyles = (element: HTMLElement) => {
    const tagName = element.tagName.toLowerCase();
    if (colorMap[tagName]) {
      element.style.color = colorMap[tagName];
    }
    Array.from(element.children).forEach(applyStyles);
  };

  Array.from(doc.body.children).forEach(applyStyles);
  return doc.body.innerHTML;
}
</script>

<style scoped lang="sass">
.items
  background: $secondary-bg-color
  padding-top: 100px
  color: #8fc4ad
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
.item-info
  padding: 10px 10px
  max-width: 500px
  &__name
    color: burlywood
</style>