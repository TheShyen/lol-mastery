<template>
  <div class="timeline-list">
    <div v-for="(playerFrames, index) of playerItemsFrames" class="timeline-item">
      <div class="timeline-info">
        <div class="timeline-item__items">
          <q-img v-for="frame of playerFrames" :src="getItemImageUrl(frame.itemId + '.png')" width="36px">
            <ItemInfoPopup :itemInfo="itemStore.getItemById(frame.itemId)"/>
          </q-img>
        </div>
        <div class="timeline-item__time">{{ formatMilliseconds(playerFrames[0].timestamp) }}</div>
      </div>
      <img
        v-if="index !== playerItemsFrames.length - 1"
        src="/arrow.svg"
        alt="arrow"
        width="32px"
        class="timeline-item__arrow"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import {getItemImageUrl} from "~/services/getSpellImageUrl";
import ItemInfoPopup from "~/components/ItemInfoPopup.vue";
import dayjs from "dayjs";
import type {ItemFrame} from "~/types/DataFramesType";

defineProps<{
  playerItemsFrames: [ItemFrame[]]
}>()

const itemStore = useItemStore()

function formatMilliseconds(milliseconds: number) {
  return dayjs(milliseconds).format('mm:ss')
}
</script>

<style scoped lang="sass">
.timeline-list
  display: flex
  flex-direction: row
  flex-wrap: wrap
  row-gap: 15px
  column-gap: 10px
  padding: 10px
  border-radius: 5px
  background-color: #212121

.timeline-item
  display: flex
  align-items: center

  &__arrow
    margin-left: 5px
    margin-bottom: 6px

  &__items
    display: flex
    column-gap: 5px
    cursor: pointer

.timeline-info
  display: flex
  flex-direction: column
  align-items: center
  color: #fff

</style>