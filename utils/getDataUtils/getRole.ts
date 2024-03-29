import {LANGUAGE} from "~/constants/language";
import {ROLES} from "~/constants/roles";

export function getRole(tag: keyof typeof ROLES):string {
  const langStore = useLangStore()
  if(langStore.locale === LANGUAGE.Ru) {
    return ROLES[tag]
  } else {
    return tag
  }
}