import firebase from '../firebase/index';

export default  {
    state: {
        authUser: null,
    },

    mutations: {
        setAuthUser(store, payload) {
            store.authUser = payload;
        }
    },

    actions: {
        async signIn(store, payload) {
            const { email, password } = payload;

            const response = await firebase.signInWithEmailAndPassword(email, password)
            .then(response => {
                if(response) {
                    store.commit('setAuthUser', response);
                }
            })

            return response;
        },

        async signUp(store, payload) {
            const { name, email, password } = payload;

            const response = await firebase.signUp(name, email, password)
            .then(response => {
                if(response) {
                    store.commit('setAuthUser', response);
                }
            })

            return response;
        },

        async signOut(store) {
            const response = await firebase.signOut()
            .then(response => {
                store.commit('setAuthUser', null);
                return response;
            })
            .catch(function(error) {
                return error;
            });

            return response;
        },

        async onAuthUser(store) {
            const response = await firebase.auth.currentUser;
            console.log(response);
            if(response) {
                store.commit('setAuthUser', response);
            }
        }
    },

    getters: {
        getAuthUser(store) {
            return store.authUser;
        }
    }
}