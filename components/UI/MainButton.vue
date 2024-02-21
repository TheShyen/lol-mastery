<template>
  <q-btn class="button" square>
    <slot/>
  </q-btn>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.button
  background-color: $gold-color
  font-weight: 900
  text-transform: uppercase
</style>