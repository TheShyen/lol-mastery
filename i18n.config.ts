import {EnglishDict} from "~/localization/English";
import {RussianDict} from "~/localization/Russian";


export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'Ru',
  messages: {
    Eng: EnglishDict,
    Ru: RussianDict
  }
}))