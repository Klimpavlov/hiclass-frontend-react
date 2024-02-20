import axios from "axios";

const putUpdatePersonalInfo = (institution) => {
    const accessToken = localStorage.getItem('accessToken');
    const institutionRequest = institution.split(';')
    const institutionTitle = institutionRequest[0];
    const institutionAddress = institution[1]

    axios.put('http://localhost:7280/api/UpdateUser/institution', {
        InstitutionTitle: institutionTitle,
        Address: institutionAddress,
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


