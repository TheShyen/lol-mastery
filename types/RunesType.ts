export interface MainRuneType {
  id: number,
  name: string,
  key: string,
  icon: string,
  slots: {runes: RuneType[]}[]
}

export interface RuneType {
  id: number,
  name: string,
  key: string,
  icon: string,
  longDesc: string,
  shortDesc: string
}