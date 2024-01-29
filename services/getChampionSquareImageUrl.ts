import {BASE_URL_IMAGE} from "~/constants/baseUrls";

export function getSquareChampionImg(name: string):string {
  return UrlConstructor(BASE_URL_IMAGE, `champion/${name}`)
}