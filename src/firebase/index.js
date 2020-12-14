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
}

const fb = new Firebase();

export default fb;