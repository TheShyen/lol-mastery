<template>
  <div>
    <div class="champions">
      <div class="info">
        <div class="info__title">Чемпионы</div>
        <div class="info__desc">Изучай их способности и возможности</div>
        <MainButton/>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>

import MainButton from "~/components/UI/MainButton.vue";
</script>

<style lang="sass" scoped>
.champions
  height: 500px
  background-color: #212121

.info
  color: #F2E437
  display: flex
  justify-content: center
  flex-direction: column
  margin: 0 auto
  padding-top: 60px
  text-align: center
  
  &__title
    font-family: "Beaufort for LOL Bold"
    font-size: 74px
    font-style: italic
  &__desc
    font-family: "Beaufort for LOL Bold"
    font-size: 44px
    font-style: italic
.roles
  &__tabs
    font-family: "Beaufort for LOL Bold"
    color: #F2E437
</style>