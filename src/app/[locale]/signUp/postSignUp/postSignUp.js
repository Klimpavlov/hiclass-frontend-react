import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postSignUpData = (email, password, successRedirect) => {
    const localhost = getLocalhost();

    axios.post(`http://${localhost}/api/User/register`, {
        Email: email,
        Password: password
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
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postSignUpData