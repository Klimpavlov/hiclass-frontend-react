import axios from "axios";

const postLoginData = (email, password) => {

    axios.post('http://localhost:7280/api/User/login', {
        Email: email,
        Password: password
    })
        .then(function (response) {
            console.log(response);
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postLoginData