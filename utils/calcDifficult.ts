import {LANGUAGE} from "~/constants/language";

export function calcDifficult(dif: number): string {
  const langStore = useLangStore()
  if(langStore.locale === LANGUAGE.Ru) {
    return dif < 4 ? "Низкая" : dif < 7 ? "Средняя" : "Высокая"
  } else {
    return dif < 4 ? "Low" : dif < 7 ? "Middle" : "High"
  }

}