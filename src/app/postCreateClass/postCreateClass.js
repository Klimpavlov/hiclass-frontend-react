import axios from "axios";

const postCreateClass = (title, gradeNumber, languageTitles, disciplineTitles) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.post('http://localhost:7280/api/Class/create-class', {
            Title: title,
            GradeNumber: gradeNumber,
            LanguageTitles: languageTitles,
            DisciplineTitles: disciplineTitles
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            }
        }
    )
        .then(function (response) {
            console.log(response);
            window.location.reload();
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postCreateClass


