
export default  {
    state: {
        quizGames: [
            {
                id: 1,
                name: 'php quiz',
                description: 'This contains php questions',
                time: '10'
            },
            {
                id: 2,
                name: 'Laravel quiz',
                description: 'This includes Laravel questions',
                time: '10'
            },
            {
                id: 3,
                name: 'HTML exam',
                description: 'Only html',
                time: '10'
            },
            {
                id: 4,
                name: 'JS Quiz',
                description: 'Includes js questions',
                time: '10'
            }
        ]
    },

    mutations: {
        
    },

    actions: {
        
    },

    getters: {
        getQuizGames(store) {
            return store.quizGames;
        },
    }
}