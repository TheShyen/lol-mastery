<template>
    <q-layout view="hhh lpR fFf"  :class="{ 'bg-color': store.isLoading}" >
      <Header></Header>
      <slot />
    </q-layout>
</template>

<script setup lang="ts">

const store = useChampionStore()
</script>

<style scoped lang="sass">
.bg-color
  background: $secondary-bg-color
</style>