<template>
  <div class="spinner">
    <q-spinner
        :thickness="10"
        color="yellow"
        size="10em"
    />
  </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>
.spinner
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>