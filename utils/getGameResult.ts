import type{VueI18n} from "vue-i18n";

export function getGameResult(gameRes: boolean, $t: VueI18n['t']) {
  return gameRes ? `${$t('victory')}` : `${$t('defeat')}`
}