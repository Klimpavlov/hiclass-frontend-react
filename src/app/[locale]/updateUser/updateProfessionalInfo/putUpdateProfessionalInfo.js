import axios from "axios";

const putUpdateProfessionalInfo = (selectedLanguages, selectedDisciplines, selectedGrades) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.put('http://localhost:7280/api/EditUser/professional-info', {
        Languages: selectedLanguages,
        Disciplines: selectedDisciplines,
        Grades: selectedGrades
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

export default putUpdateProfessionalInfo;


