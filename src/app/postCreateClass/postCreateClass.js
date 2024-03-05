import axios from "axios";

const postCreateClass = (title, gradeNumber, languageTitles, disciplineTitles) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.post('http://localhost:7280/api/Class/create-class', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        Title: "title",
        GradeNumber: 4,
        LanguageTitles: ["English"],
        DisciplineTitles: ["Biology"]
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