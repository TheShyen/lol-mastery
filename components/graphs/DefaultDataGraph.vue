<template>
  <div>
    <div style="width: 100px">
      <q-linear-progress size="15px" :value="progress">
        <div class="absolute-full flex flex-center">
          <q-badge text-color="white" :label="200" />
        </div>
      </q-linear-progress>
    </div>
    
  </div>
</template>

<script setup lang="ts">
const progress = ref(0.4)
</script>

<style scoped lang="sass">

</style>