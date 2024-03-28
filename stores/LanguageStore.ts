import {defineStore} from "pinia";
import {getFromLocalStorage} from "~/utils/getDataUtils/getFromLocalStorage";
export const useLangStore = defineStore('language', () => {
  const locale = ref(useI18n().locale)
  function setLanguageFromLocalStorage() {
    const langJson = getFromLocalStorage('language')
    if(langJson) {
      locale.value = JSON.parse(langJson)
    }
  }
  return {
    locale,
    setLanguageFromLocalStorage
  }
})