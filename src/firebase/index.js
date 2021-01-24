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
            key,
            uId: uid
        })
    }

    createPostAndGetData(typePost, userData) {
        const database = this.database;

        return new Promise(
            function(resolve, reject) {
                try {
                    const newPostKey = database.ref().child(typePost).push(userData).key;
                    return newPostKey ? resolve(newPostKey) : reject(e);
                } catch(e) {
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
                            return resolve(Object.values(data)[0]);
                        }
                    })
                } catch(e) {
                    reject(e);
                }
            }
        )
    }

    addToCollectionPost(typePost, property, payload) {
        const database = this.database;
        const { key, data } = payload;

        return new Promise(
            function(resolve, reject) {
                try {
                    const newPostKey = database
                        .ref(`${typePost}/${key}`)
                        .child(property)
                        .push({...data}).key;
                
                    return newPostKey ? resolve(newPostKey) : reject(e)

                } catch(e) {
                    return reject(e);
                }
            }
        )
    }

    async getFromCollectionPost(typePost, collection ,payload) {
        const database = this.database;
        const { keyPost, keyCollectionPost } = payload;

        const dbRef = await database.ref(`${typePost}/`+keyPost).orderByChild('questions');
        const response = await dbRef.once('value').then(function(snapshot) {
            const targetPost = snapshot.child(collection).child(keyCollectionPost).val();
            if(targetPost) {
                return targetPost;
            } else {
                return null;
            }
        })

        return response;
    }

    async setPostInTheCollection(typePost, collection, payload) {
        const { keyPost, keyCollectionPost } = payload;
        const { question, questionsArray, trueAnswer } = payload.dataPost.data;

        try {
            const dbCollectionRef = await this.database.ref(`${typePost}/`+keyPost).child(collection);

            dbCollectionRef.child(keyCollectionPost).set({
                ...payload.dataPost.data,
                question: question,
                questionsArray: [...questionsArray],
                trueAnswer: trueAnswer,
            });
        } catch(e) {
            console.log(e);
        }
    }

    async removePostFromTheCollection(typePost, collection, payload) {
        const { keyPost, keyCollectionPost } = payload;
        
        try {
            const dbCollectionRef = await this.database.ref(`${typePost}/`+keyPost).child(collection);
            await dbCollectionRef.child(keyCollectionPost).remove();
        } catch(e) {
            console.log(e);
        }
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
            imageUrl = await this.uploadImageAndGetUrl(typePost, post.image);
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
        const database = this.database;
        const typePost = 'auth-users';
        let imageUrl = null;
        const {firstName, lastName, image, key } = user;
        const userNow = this.auth.currentUser;

        userNow.updateProfile({
            displayName: firstName + ' ' + lastName,
        })

        if(typeof image === 'string' && image !== null) {
            imageUrl = image;
        }

        if(typeof image === 'object' && image !== null) {
            imageUrl = await this.uploadImageAndGetUrl(typePost, image);
        }

        return new Promise(
            function(resolve, reject) {
                try {
                    database.ref(`${typePost}/` + key).set({
                        ...user,
                        image: imageUrl
                    })
                    resolve({
                        ...user,
                        image: imageUrl
                    });
                } catch(e) {
                    reject(e);
                }
            }
        );
    }
}

const fb = new Firebase();

export default fb;