import firebase from '../firebase/index';

export default  {
    state: {
        authUser: null,
        authUserData: null
    },

    mutations: {
        setAuthUser(store, payload) {
            store.authUser = payload;
        },

        setAuthUserData(store, payload) {
            store.authUserData = payload;
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
            const { firstName, lastName, email, password } = payload;

            const response = await firebase.signUp(`${firstName} ${lastName}`, email, password)
           
            if(!response) return;
    
                const uIdAuthUser = response.uid;
                const key = await firebase.createPostAndGetData('auth-users', payload);
                const authUserPost = await firebase.getPostById('auth-users', key);
                await firebase.addUidAuthUserToPost('auth-users', authUserPost, key, uIdAuthUser);

                store.commit('setAuthUserData', {
                    ...authUserPost,
                    key,
                    uId: uIdAuthUser,
                });

                store.commit('setAuthUser', response);
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

            if(response) {
                const uid = response.uid;
                const authPost = await firebase.getPostByPropUid('auth-users', uid);
                store.commit('setAuthUserData', authPost);
                store.commit('setAuthUser', response);
            }
        },
        
        async updateAuthUser(store, payload) {
            await firebase.updateAuthUser(payload)
            .then(function(response) {
                store.commit('setAuthUserData', {...response});
            })
        },

        onAuthUserKey(store, payload) {
            store.commit('setAuthUserKey', payload);
        }
    },

    getters: {
        getAuthUser(store) {
            return store.authUser;
        },
        
        getAuthUserDate(store) {
            return store.authUserData;
        },

    }
}