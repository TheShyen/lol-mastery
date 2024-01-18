<template>
  <Spinner v-if="store.isLoading"/>
  <div v-else class="items">
    <div  class="items__wrapper">
    </div>
  </div>
</template>

<script setup lang="ts">

import Spinner from "~/components/UI/Spinner.vue";
import {useItemStore} from "~/stores/ItemsStore";
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

</style>