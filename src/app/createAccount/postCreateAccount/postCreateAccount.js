import axios from "axios";

const postCreateAccount = (firstName, lastName) => {

    axios.post('http://localhost:7280/api/User/create-account', {
        FirstName: firstName,
        LastName: lastName,
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

export default postCreateAccount