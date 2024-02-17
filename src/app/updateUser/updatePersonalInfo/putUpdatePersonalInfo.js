import axios from "axios";

const putUpdatePersonalInfo = (firstName, lastName, description) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.put('http://localhost:7280/api/UpdateUser/personal-info', {
        IsATeacher: true,
        IsAnExpert: false,
        FirstName: firstName,
        LastName: lastName,
        CityTitle: "SP",
        CountryTitle: "R",
        Description: description
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(function (response) {
            console.log(response);
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
};

export default putUpdatePersonalInfo;


