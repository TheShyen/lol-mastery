import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_IMAGE} from "~/constants/baseUrls";

export function getSpellImageURL(name: string):string {
    return urlConstruction(BASE_URL_IMAGE, `spell/${name}`)
}

export function getPassiveImageURL(name: string):string {
    return urlConstruction(BASE_URL_IMAGE, `passive/${name}`)
}

export function getItemImageUrl(name: string): string {
  return urlConstruction(BASE_URL_IMAGE, `item/${name}`)
}
