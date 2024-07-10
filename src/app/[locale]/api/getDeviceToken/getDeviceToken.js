import {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";

const useDeviceToken = () => {
    const [deviceToken, setDeviceToken] = useState('');

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
            authDomain: "hiclass-ff338.firebaseapp.com",
            projectId: "hiclass-ff338",
            storageBucket: "hiclass-ff338.appspot.com",
            messagingSenderId: "526521652695",
            appId: "1:526521652695:web:d166d6d34aaf7c63132792"
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        const getDeviceTokenAndSave = async () => {
            try {
                const currentToken = await getToken(messaging, { vapidKey: 'BMV5zY2GipaHYmj87jqJniSgMpJqiYgtbVBzBLfruOV2caEss56w_4AZcI74hAPgACjvVDKXlAPXfb3g3xg5wv4' });
                if (currentToken) {
                    console.log('Device token:', currentToken);
                    setDeviceToken(currentToken);
                    localStorage.setItem('deviceToken', currentToken);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            } catch (err) {
                console.log('An error occurred while retrieving token. ', err);
            }
        };

        getDeviceTokenAndSave();
    }, []);

    return deviceToken;
};

export default useDeviceToken;
