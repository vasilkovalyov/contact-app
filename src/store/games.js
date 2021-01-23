import firebase from '../firebase/index';

export default  {
    state: {
        quizGames: []
    },

    mutations: {
        setLoadGames(state, payload) {
            state.quizGames = payload;
        },

        setGame(state, payload) {
            state.quizGames.push(payload);
        },

        setQuestionForGame(state, payload) {
            const { key, data, keyPostCollection } = payload;
            state.quizGames.forEach(function(game, i) {
                
                if(game.key === key) {
                    if(game.questions === undefined) {
                        let questionObj = {};

                        questionObj[keyPostCollection] = {
                            ...data
                        }

                        state.quizGames[i] = {
                            ...game,
                            questions: questionObj
                        }
                    } else {
                        const questions = state.quizGames[i].questions;
                        questions[keyPostCollection] = { ...data }
                    }
                }
            })
        }
    },

    actions: {
        async onLoadGames(state) {
            const data = await firebase.loadPosts('games');
            state.commit('setLoadGames', data);
        },

        async onCreateGame(state, payload) {
            state.commit('setGame', payload);
            await firebase.createPostAndGetData('games', {
                ...payload,
                questions: {}
            })
        },

        async onCreateQuestionForGame(state, payload) {
            try {
                const { key, data } = payload;
                const keyPostCollection =  await firebase.addToCollectionPost('games', 'questions', { key, data })
                state.commit('setQuestionForGame', { ...payload, keyPostCollection });
            } catch(e) {
                console.log(e);
            }
            
        }
    },

    getters: {
        getQuizGames(store) {
            return store.quizGames;
        },
    }
}