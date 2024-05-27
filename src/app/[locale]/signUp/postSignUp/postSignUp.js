import axios from "axios";

const postSignUpData = (email, password, successRedirect) => {


    axios.post('http://localhost:7280/api/User/register', {
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