<template>
  <div class="runes">
    <div class="runes-item" v-for="rune of runes">
      <q-img :src="getRuneImageUrl(rune.icon)" class="runes-item__icon"/>
      <div class="runes-info">
        <div class="runes-info__name">{{rune.name}}</div>
        <div class="runes-info__desc" v-html="rune.longDesc"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {RuneType} from "~/types/RunesType";
import type {RuneSelection} from "~/types/Player/PlayerPerformance";
import {getRuneImageUrl} from "~/services/getRuneImageUrl";

const runesStore = useRunesAndSpellsStore()
const runes = ref<(RuneType | undefined)[]>([])

const props = defineProps<{
  selectedRunes: RuneSelection[]
}>()

onMounted(() => {
  runes.value = runesStore.getSelectedRunes(props.selectedRunes)
})

</script>

<style scoped lang="sass">
.runes
  display: flex
  flex-direction: column
  gap: 10px 10px
  justify-content: center
  align-items: center
.runes-item
  display: flex
  gap: 30px 30px
  align-items: center
  background-color: $secondary-bg-color
  border-radius: 50px
  width: 80%
  padding: 10px
  &__icon
    width: 48px
    height: 48px
.runes-info
  width: 100%
  &__name
    color: #efefef
  &__desc
    color: $blue-color
    font-size: 12px
</style>