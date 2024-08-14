import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postVerificationCode = (email, code) => {
    const accessToken = localStorage.getItem('accessToken')
    const localhost = getLocalhost();
    const deviceToken = localStorage.getItem('deviceToken')

    const url = `http://${localhost}/api/User/verify-email`;
    const requestUrl = `${url}?verificationCode=${code}`;

    axios.post(`http://${localhost}/api/User/verify-email`, {
        DeviceToken: deviceToken,
        Email: email,
        VerificationCode: code,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(function (response) {
            console.log(response);
            console.log(response.data.value)
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postVerificationCode

