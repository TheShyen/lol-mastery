import type {VueI18n} from "vue-i18n";

export function getTimeElapsed(milliseconds: number, $t:VueI18n['t'] ) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - milliseconds;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (hours < 1) {
        return `${minutes} ${$t('minutes')} ${$t('ago')}`;
    } else if (days < 1) {
        return `${hours} ${$t('hours')} ${$t('ago')}`;
    } else {
        if (days < 1) {
            return `${$t('oneDay')} ${$t('ago')}`;
        } else if (days < 5){
            return `${days} ${$t('day')} ${$t('ago')}`
        } else {
            return `${days} ${$t('days')} ${$t('ago')}`;
        }

    }
}