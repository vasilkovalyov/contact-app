import firebase from '../firebase/index';

export default  {
    state: {
        users: []
    },

    mutations: {
        createUser(store, payload) {
            store.users.push(payload);
        },
        setAllUsers(store, payload) {
            store.users = payload;
        }
    },

    actions: {
        async createUser(state, payload) {
            await firebase.createUser(payload);
        },

        async loadUsers(state, payload) {
            const users = await firebase.loadPosts(payload);
            state.commit('setAllUsers', users);
        },

        async removeUser(state, payload) {
            await firebase.removePost('users', payload)
            .then(() => {
                const users = firebase.loadPosts('users');
                state.commit('setAllUsers', users);
            })
            .catch((e) => {
                throw e;
            });
        }
    },

    getters: {
        getUsers(store) {
            return store.users;
        }
    }
}