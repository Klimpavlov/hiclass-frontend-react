import axios from "axios";

const postCreateAccount = (firstName, lastName) => {

    axios.post('http://localhost:7280/api/User/create-account', {
        FirstName: firstName,
        LastName: lastName,
        IsATeacher: true,
        IsAnExpert: false,
        CityLocation: "Minsk",
        CountryLocation: "Belarus",
        InstitutionDto: {
            Types: 'school',
            Address: 'Nikif 37',
            Title: 'Gymn 2',
        },
        DisciplineTitles: 'Biology',
        LanguageTitles: 'English',
        GradesEnumerable: '9',
        ImageFormFile: 'string'


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

export default postCreateAccount