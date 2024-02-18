import axios from "axios";

const putUpdatePersonalInfo = (institution) => {
    const accessToken = localStorage.getItem('accessToken');
    const institutionTitle = institution.split(';')

    axios.put('http://localhost:7280/api/UpdateUser/institution', {
        InstitutionTitle: institutionTitle,
        Address: "string",
        Types: [
            "School"
        ]
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


