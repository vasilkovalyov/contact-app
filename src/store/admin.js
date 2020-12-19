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
        }
    },

    getters: {
        getUsers(store) {
            return store.users;
        }
    }
}