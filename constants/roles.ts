export enum ROLES {
    Fighter = "Воин",
    Mage = "Маг",
    Assassin = 'Убийца',
    Tank = 'Танк',
    Support = 'Поддержка',
    Marksman = 'Стрелок',
}
export const ROLES_MAP: { [key in ROLES]: string } = {
  [ROLES.Fighter]: "Воин",
  [ROLES.Mage]: "Маг",
  [ROLES.Assassin]: "Убийца",
  [ROLES.Tank]: "Танк",
  [ROLES.Support]: "Поддержка",
  [ROLES.Marksman]: "Стрелок",
};