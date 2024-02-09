<template>
  <div>
    <NuxtLayout >
      <NuxtPage :key="lang.locale"/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const lang = useLangStore()
</script>