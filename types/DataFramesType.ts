export interface DataFramesType {
  puuid: string,
  championName: string,
  participantId: number,
  itemFrames: [ItemFrame[]],
  skillFrames: SkillFrame[]
}

export interface ItemFrame {
  itemId: number,
  participantId: number,
  timestamp: number,
  type: "ITEM_PURCHASED"
}

export interface SkillFrame {
  skillSlot: number,
  participantId: number,
  timestamp: number,
  type: "SKILL_LEVEL_UP",
  levelUpType:"NORMAL"
}