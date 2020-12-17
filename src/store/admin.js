import firebase from '../firebase/index';

export default  {
    state: {
        users: []
    },

    mutations: {
        createUser(store, payload) {
            store.users.push(payload);
        }
    },

    actions: {
        async createUser(state, payload) {
            await firebase.createUser(payload);
        }
    },

    getters: {
        
    }
}