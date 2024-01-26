export enum LANGUAGE {
  Ru = "Ru",
  Eng = "Eng"
}
type LangMapType = {
  Ru: string;
  Eng: string;
  [key: string]: string;
};
export const languageMap:LangMapType = {
  Ru: "ru_RU",
  Eng: "en_US"
}
export const languageArray:LANGUAGE[] = [LANGUAGE.Ru, LANGUAGE.Eng]