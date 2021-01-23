import firebase from '../firebase/index';

export default  {
    state: {
        users: [],
        targetEditUser: null,
    },

    mutations: {
        createUser(store, payload) {
            store.users.push(payload);
        },
        setAllUsers(store, payload) {
            store.users = payload;
        },
        setTargetUserById(store, payload) {
            store.targetEditUser = payload;
        }
    },

    actions: {
        createUser(payload) {
            firebase.createPostAndGetData('users', payload)
        },

        async loadUsers(state, payload) {
            const users = await firebase.loadPosts(payload);
            
            state.commit('setAllUsers', users);
        },

        async removeUser(state, payload) {
            await firebase.removePost('users', payload)
            const users = await firebase.loadPosts('users');
            state.commit('setAllUsers', users);
        },

        async userById(state, payload) {
            const user = await firebase.getPostById('users', payload)
            .catch((e) => {
                throw e;
            });
            state.commit('setTargetUserById', user);
        },

        async saveUser(state, payload) {
            await firebase.savePost('users', {
                post: payload.user,
                key: payload.key
            })
        },
    },

    getters: {
        getUsers(store) {
            return store.users;
        },

        getTargetEditUser(store) {
            return store.targetEditUser;
        }
    }
}