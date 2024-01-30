import axios from "axios";

const postCreateClass = (title, gradeNumber, photoUrl, languageTitles, disciplineTitles) => {

    axios.post('http://localhost:7280/api/Class/create-class', {
        Title: title,
        GradeNumber: gradeNumber,
        PhotoUrl: photoUrl,
        LanguageTitles: languageTitles,
        DisciplineTitles: disciplineTitles
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

export default postCreateClass