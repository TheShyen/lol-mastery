<template>
  <section class="runes">
    <div class="runes__wrapper">
      <div class="runes-block">
        <div class="rune" v-for="rune of runesStore.runes">
          <div class="rune__name text-h6">{{ rune.name }}</div>
          <div v-for="slot of rune.slots" class="runeSlots">
            <div v-for="runeFromSlot of slot.runes">
              <q-img :src="getRuneImageUrl(runeFromSlot.icon)" height="48px" width="48px" class="runeSlots__icon">
                <RuneInfoPopup :ability="runeFromSlot"/>
              </q-img>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </section>
</template>

<script setup lang="ts">
import {getRuneImageUrl} from "~/services/getRuneImageUrl"

const runesStore = useRunesStore()
onMounted(async () => {
  await runesStore.getRunes()
  console.log(runesStore.runes)
})
</script>

<style scoped lang="sass">
.runes
  background: $secondary-bg-color
  padding-top: 80px
  font-family: "Helvetica Neue Bold", sans-serif
  
  &__wrapper
    margin: 0 auto
    max-width: 1282px
.runes-info
  background-color: $content-bg-color
.runes-block
  display: flex
  justify-content: space-between
.rune
  display: flex
  align-items: center
  flex-direction: column
  row-gap: 15px
  &__name
    color: #9cb6ec
.runeSlots
  display: flex
  flex-direction: row
  gap: 0 15px
  &__icon
    cursor: pointer
    transition: 0.6s all
    &:hover
      transform: scale(1.15)
</style>