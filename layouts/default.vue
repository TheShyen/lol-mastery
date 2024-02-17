<template>
    <q-layout view="hhh lpR fFf" :class="{ 'bg-color':champStore.isLoading || itemsStore.isLoading || accountStore.isLoading}">
      <Header></Header>
      <slot/>
    </q-layout>
</template>

<script setup lang="ts">

const champStore = useChampionStore()
const itemsStore = useItemStore()
const accountStore = useAccountStore()

</script>

<style scoped lang="sass">
.bg-color
  background: $secondary-bg-color
</style>