

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
    }
  }
}))