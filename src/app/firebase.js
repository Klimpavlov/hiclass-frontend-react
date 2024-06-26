import firebase from 'firebase/app';
import 'firebase/messaging';

    const firebaseConfig = {
        apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
        authDomain: "hiclass-ff338.firebaseapp.com",
        projectId: "hiclass-ff338",
        storageBucket: "hiclass-ff338.appspot.com",
        messagingSenderId: "526521652695",
        appId: "1:526521652695:web:d166d6d34aaf7c63132792"
    };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;