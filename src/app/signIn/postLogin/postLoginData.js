import axios from "axios";

const postLoginData = (email, password) => {

    axios.post('http://localhost:7280/api/User/login', {
        Email: email,
        Password: password
    })
        .then(function (response) {
            const accessToken = response.data.value.accessToken;
            console.log(response);
            console.log(response.data.value.accessToken)
            localStorage.setItem('accessToken', accessToken);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default postLoginData