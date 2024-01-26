import {languageMap} from "~/constants/language";

export function getLanguageEndpoint() {
  const myStore = useLangStore()
  return languageMap[myStore.locale]
}