import axios from 'axios';

const postCreateAccount = (file) => {
    const accessToken = localStorage.getItem('accessToken');

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const languages = localStorage.getItem('languages');
    const country = localStorage.getItem('country');

    const institution  = localStorage.getItem('institution');
    const institutionRequest = institution.split(';')
    const institutionTitle = institutionRequest[0];
    const institutionAddress = institutionRequest[1];

    const disciplines = localStorage.getItem('disciplines');
    const disciplinesArray = disciplines.split(',');



    const formData = new FormData();
    formData.append('FirstName', "firstName");
    formData.append('LastName', "lastName");
    formData.append('IsATeacher', true);
    formData.append('IsAnExpert', false);
    formData.append('CityLocation', 'Minsk');
    formData.append('CountryLocation', "Belarus");
    formData.append('InstitutionDto.Types', 'school');
    formData.append('InstitutionDto.Address', "institutionAddress");
    formData.append('InstitutionDto.Title', "institutionTitle");
    formData.append('DisciplineTitles', ["Biology"]);
    formData.append('LanguageTitles', ["English"]);
    formData.append('GradesEnumerable', [9]);

    axios
        .put('http://localhost:7280/api/User/create-account', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default postCreateAccount;



// import axios from 'axios';
//
// const postCreateAccount = () => {
//     const accessToken = localStorage.getItem('accessToken');
//
//     const firstName = localStorage.getItem('firstName');
//     const lastName = localStorage.getItem('lastName');
//     const country = localStorage.getItem('country');
//
//     const institution = localStorage.getItem('institution');
//     const institutionRequest = institution.split(';');
//     const institutionTitle = institutionRequest[0];
//     const institutionAddress = institutionRequest[1];
//
//     const disciplines = localStorage.getItem('disciplines');
//     const disciplinesArray = disciplines.split(',');
//
//     const languages = localStorage.getItem('languages');
//     const languagesArray = languages.split(',');
//
//     const grades = localStorage.getItem('grades');
//     const gradesArray = grades.split(',').map(Number);
//
//     const requestData = {
//         FirstName: "firstName",
//         LastName: "lastName",
//         IsATeacher: true,
//         IsAnExpert: false,
//         CityLocation: 'Minsk',
//         CountryLocation: "Belarus",
//         InstitutionDto: {
//             Types: 'School',
//             Address: "institutionAddress",
//             Title: "institutionTitle"
//         },
//         DisciplineTitles: ["Maths"],
//         LanguageTitles: ["Russian"],
//         GradesEnumerable: [9],
//     };
//
//     console.log(requestData)
//     axios
//         .put('http://localhost:7280/api/User/create-account', requestData, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         })
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };
//
// export default postCreateAccount;



// import axios from 'axios';
//
// const postCreateAccount = () => {
//
//     const accessToken = localStorage.getItem('accessToken')
//
//     const firstName = localStorage.getItem('firstName');
//     const lastName = localStorage.getItem('lastName');
//     const country = localStorage.getItem('country');
//
//     const institution = localStorage.getItem('institution');
//     const institutionRequest = institution.split(';');
//     const institutionTitle = institutionRequest[0];
//     const institutionAddress = institutionRequest[1];
//
//     const disciplines = localStorage.getItem('disciplines');
//     const disciplinesArray = disciplines.split(',');
//
//     const languages = localStorage.getItem('languages');
//     const languagesArray = languages.split(',');
//
//     const grades = localStorage.getItem('grades');
//     const gradesArray = grades.split(',').map(Number);
//
//     axios.put('http://localhost:7280/api/User/create-account', {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//         FirstName: "firstName",
//         LastName: "lastName",
//         IsATeacher: true,
//         IsAnExpert: false,
//         CityLocation: 'Minsk',
//         CountryLocation: "Belarus",
//         InstitutionDto: {
//             Types: 'School',
//             Address: "institutionAddress",
//             Title: "institutionTitle"
//         },
//         DisciplineTitles: ["Maths"],
//         LanguageTitles: ["Russian"],
//         GradesEnumerable: [9],
//     })
//         .then(function (response) {
//             console.log(response);
//             // Перенаправление на другую страницу после успешного выполнения запроса
//         })
//         .catch(function (error) {
//             console.log(error);
//             // Перенаправление на страницу с ошибкой при ошибке запроса
//         });
// }
//
// export default postCreateAccount;
