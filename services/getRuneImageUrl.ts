import urlConstruction from "~/utils/UrlConstructor";
import {BASE_URL_RUNE_IMAGE} from "~/constants/baseUrls";

export function getRuneImageUrl(name: string): string {
  return urlConstruction(BASE_URL_RUNE_IMAGE, name)
}