<template>
  <NuxtLayout>
    <div class="error">
      <div class="info">
        <div class="info__title">Страница не найдена</div>
        <div class="info__desc">Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно
          она устарела, была удалена, или введен неверный адрес в адресной строке.
        </div>
        <MainButton @click="handleError" class="info__btn">Перейти на главную</MainButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import MainButton from "~/components/UI/MainButton.vue";

const handleError = () => clearError({ redirect: '/' })
</script>

<style lang="sass" scoped>
.error
  margin: 0 auto
  padding-top: 30vh
  font-family: "Helvetica Neue Bold", serif
.info
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  color: $gold-color
  &__title
    font-size: 28px
    font-weight: 900
    text-transform: uppercase
  &__desc
    font-size: 20px
    font-weight: 500
    text-align: center
  &__btn
    margin-top: 15px
    font-size: 16px
    color: black
</style>