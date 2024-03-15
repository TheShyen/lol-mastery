<template>
    <q-layout view="hhh lpR fFf" class="bg-color">
      <CommonHeader/>
      <slot/>
    </q-layout>
</template>

<script setup lang="ts">
</script>

<style scoped lang="sass">
.bg-color
  background: $secondary-bg-color
</style>