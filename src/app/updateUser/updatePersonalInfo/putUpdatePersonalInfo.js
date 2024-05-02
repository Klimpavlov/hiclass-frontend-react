import axios from "axios";

const putUpdatePersonalInfo = (firstName, lastName, country, description, isTeacher, isExpert) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.put('http://localhost:7280/api/EditUser/personal-info', {
        IsATeacher: isTeacher,
        IsAnExpert: isExpert,
        FirstName: firstName,
        LastName: lastName,
        CityTitle: "S",
        CountryTitle: country,
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


