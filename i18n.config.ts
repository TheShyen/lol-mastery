

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'Ru',
  messages: {
    Eng: {
      main: 'Main',
      items: 'Items',
      champions: 'Champions',
      slogan: 'Analyze. Study. Win.',
      mainChampPromo: 'Learn the strengths and weaknesses of champions',
      role: 'Role',
      difficulty: 'Difficulty',
      abilities: 'Abilities',
      symbolInfo: '"?" indicates data not available from Riot API. You can confirm undisclosed values in League of Legends game client',
      cost: 'Cost(mana/energy):',
      cooldown: 'Cooldown(second):',
      goldCost: 'Price:',
      search: 'Search',
      level: 'Level'

    },
    Ru: {
      champions: 'Чемпионы',
      main: 'Главная',
      items: 'Предметы',
      slogan: 'Анализируй. Изучай. Побеждай.',
      mainChampPromo: 'Изучай сильные и слабые стороны чемпионов',
      role: 'Роль',
      difficulty: 'Сложность',
      abilities: 'Умения',
      symbolInfo: '"?" обозначает что данные не доступны с Riot API. Вы можете уточнить скрытые данные в клиенте игры League of Legends',
      cost: 'Стоимость(маны/энергии):',
      cooldown: 'Перезарядка(секунды):',
      goldCost: 'Стоимость:',
      search: 'Поиск',
      level: 'Уровень'
    }
  }
}))