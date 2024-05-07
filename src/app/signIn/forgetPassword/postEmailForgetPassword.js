import axios from "axios";

const postEmailForgetPassword = (email, successRedirect) => {
    const accessToken = localStorage.getItem('accessToken')

    axios.post('http://localhost:7280/api/User/forgot-password', {
        Email: email
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(function (response) {
            console.log(response);

            successRedirect()
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postEmailForgetPassword