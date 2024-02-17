import axios from "axios";

const putUpdatePersonalInfo = (languages, disciplines, grades) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.put('http://localhost:7280/api/UpdateUser/professional-info', {
        Languages: 'l',
        Disciplines: 'f',
        Grades: 1
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


