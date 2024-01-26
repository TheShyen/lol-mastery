import {defineStore} from "pinia";
export const useLangStore = defineStore('language', () => {
  const locale = ref(useI18n().locale)

  return {
    locale,
  }
})