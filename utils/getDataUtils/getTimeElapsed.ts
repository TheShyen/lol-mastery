import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ru'
dayjs.extend(relativeTime)
export function getTimeElapsed(milliseconds: number, lang: string ) {
    return dayjs(milliseconds).locale(lang.toLowerCase()).fromNow()
}