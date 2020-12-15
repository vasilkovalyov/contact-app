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
}

const fb = new Firebase();

export default fb;