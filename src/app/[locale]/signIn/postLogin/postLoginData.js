import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postLoginData = (email, password, successRedirect, handleLoginError, deviceToken) => {
    const localhost = getLocalhost();

    axios.post(`http://${localhost}/api/User/login`, {
        Email: email,
        Password: password,
        DeviceToken: deviceToken
    })
        .then(function (response) {
            const accessToken = response.data.value.accessToken;
            console.log(response);
            console.log(response.data.value.accessToken)
            localStorage.setItem('accessToken', accessToken);
            successRedirect()
        })
        .catch(function (error) {
            console.log(error);
            handleLoginError();
        });
}

export default postLoginData