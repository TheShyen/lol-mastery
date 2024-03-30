import {version} from "~/constants/version";
import {UrlConstructor} from "#imports";
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/`
export const BASE_URL_DATA = UrlConstructor(BASE_URL, 'data/')
export const BASE_URL_IMAGE = UrlConstructor(BASE_URL, 'img/')
export const BASE_URL_RUNE_IMAGE = 'https://ddragon.leagueoflegends.com/cdn/img/'