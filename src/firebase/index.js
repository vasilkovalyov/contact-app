import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyCVBU4IJLeYPotwUTt5zyHVXEHcTb1tKkk",
    authDomain: "contactapp-ce0cc.firebaseapp.com",
    projectId: "contactapp-ce0cc",
    storageBucket: "contactapp-ce0cc.appspot.com",
    messagingSenderId: "43557068909",
    appId: "1:43557068909:web:0094775c1a6475fd75df64"
};


class Firebase {
    constructor() {
        // Initialize Firebase
		firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.database = firebase.database();
		this.firebase = firebase;
    }
    
    async signInWithEmailAndPassword(email, password) {
        const response = await this.auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
            return response.user;
        })
        .catch((error) => {
            throw error;
        });

        return response;
    }

    async signUp(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        .then(function(response) {
			return response.user.updateProfile({
				displayName: name
			})
        })  
    }

    async signOut() {
        const response = this.auth.signOut()
        .then(function() {
            return true;
        }).catch(function(error) {
            return error;
        });

        return response;
    }

    async createUser(userData) {
        const newUserKey = await this.database.ref().child('users').push(userData).key;
    }

    loadPosts(typePost) {
        const firebaseDb = this.database;

        return new Promise(
            function(resolve, reject) {
                firebaseDb.ref(typePost)
				.once('value', function(snapshot) {
                    let posts = snapshot.val();
                    const arrayOfPosts = [];

					// if(posts != null) {
					// 	for(let key in posts) {
					// 		arrayOfPosts.push({
					// 			key,
					// 			...posts[key]
					// 		})
                    //     }

					// 	return resolve(arrayOfPosts);
					// } else {
					// 	reject([]);
                    // }
                    
                    try {
                        if(posts != null) {
                            for(let key in posts) {
                                arrayOfPosts.push({
                                    key,
                                    ...posts[key]
                                })
                            }
    
                            return resolve(arrayOfPosts);
                        } else {
                            reject([]);
                        }
                    } catch(e) {
                        reject(e);
                    }
				})
            }
        )
    }

    removePost(typePost, idPost) {
        const self = this;

        return new Promise(
            function(resolve, reject) {
                try {
                    self.database.ref(`${typePost}/${idPost}`).remove();
                    return resolve();
                } catch(e) {
                    reject(e);
                }
            }
        )
    }

    getPostById(typePost, idPost) {
        const self = this;
        return new Promise(
            function(resolve, reject) {
                try {
                    self.database.ref(`${typePost}/`+idPost).once('value')
                    .then(response => {
                        const data = response.val();
                        if(data) {
                            return resolve(data);
                        } else {
                            return reject(new Error);
                        }
                    })
                } catch(e) {
                    reject(e);
                }
            }
        )
    }

    savePost(typePost, payload) {
        const self = this;
        const {post, key} = payload;

        self.database.ref(`${typePost}/` + key).set({
            ...post
        })
        
    }
}

const fb = new Firebase();

export default fb;