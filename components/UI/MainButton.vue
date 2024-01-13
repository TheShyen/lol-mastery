<template>
  <div class="button">
    <q-btn>
      <slot/>
    </q-btn>
  </div>
  
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.button
  display: flex
  justify-content: center
  align-items: center
</style>