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
        this.storage = firebase.storage();
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
        const auth = this.auth;

        return new Promise(
            function(resolve, reject) {
                auth.createUserWithEmailAndPassword(email, password)
                .then(function(response) {
                    response.user.updateProfile({
                        displayName: name
                    })

                    resolve(response.user);
                })
                .catch(function(e) {
                    reject(e)
                })
            }
        )
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

    async addUidAuthUserToPost(typePost, post, key, uid) {
        await this.database.ref(`${typePost}/` + key).set({
            ...post,
            uId: uid
        })
    }

    createPostAndGetData(typePost, userData) {
        const database = this.database;

        return new Promise(
            function(resolve, reject) {
                const newPostKey = database.ref().child(typePost).push(userData).key;

                if(newPostKey) {
                    return resolve(newPostKey);
                } else {
                    return reject(e);
                }
            }
        )
    }

    loadPosts(typePost) {
        const firebaseDb = this.database;

        return new Promise(
            function(resolve, reject) {
                firebaseDb.ref(typePost)
				.once('value', function(snapshot) {
                    let posts = snapshot.val();
                    const arrayOfPosts = [];
                    
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

    getPostByPropUid(typePost, uId) {
        const self = this;
        return new Promise(
            function(resolve, reject) {
                try {
                    self.database.ref(typePost).orderByChild('uId').equalTo(uId).once('value', function(response) {
                        const data = response.val();
                        if(data) {
                            return resolve(data);
                        }
                    })
                } catch(e) {
                    reject(e);
                }
            }
        )
    }

    async uploadImageAndGetUrl(typePost, image) {
        const storageRef = await this.storage.ref(`${typePost}/${image.name}`);
        return await storageRef.put(image)
        .then(function(snapshot) {
            return snapshot.ref.getDownloadURL();
        })
    }

    async savePost(typePost, payload) {
        let imageUrl = null;
        const { post, key } = payload;

        if(typeof post.image === 'string' && post.image !== null) {
            imageUrl = post.image;
        }

        if(typeof post.image === 'object' && post.image !== null) {
            imageUrl = await this.uploadImageAndGetUrl('users', post.image);
        }

        try {
            this.database.ref(`${typePost}/` + key).set({
                ...post,
                image: imageUrl
            })
        } catch(e) {
            console.log(e);
        }
    }

    async updateAuthUser(user) {
        const {firstName, lastName } = user;
        const userNow = this.auth.currentUser;
        userNow.updateProfile({
            displayName: firstName + ' ' + lastName,
        })
    }
}

const fb = new Firebase();

export default fb;