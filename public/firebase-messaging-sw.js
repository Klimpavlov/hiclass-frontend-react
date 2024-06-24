importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
    authDomain: "hiclass-ff338.firebaseapp.com",
    projectId: "hiclass-ff338",
    storageBucket: "hiclass-ff338.appspot.com",
    messagingSenderId: "526521652695",
    appId: "1:526521652695:web:d166d6d34aaf7c63132792"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
