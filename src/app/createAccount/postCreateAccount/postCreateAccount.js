import axios from 'axios';

const postCreateAccount = (file) => {
    const accessToken = localStorage.getItem('accessToken');

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');


    const formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('LastName', lastName);
    formData.append('IsATeacher', true);
    formData.append('IsAnExpert', false);
    formData.append('CityLocation', 'Minsk');
    formData.append('CountryLocation', 'Belarus');
    formData.append('InstitutionDto.Types', 'school');
    formData.append('InstitutionDto.Address', 'Nikif 37');
    formData.append('InstitutionDto.Title', 'Gymn 2');
    formData.append('DisciplineTitles', 'Biology');
    formData.append('LanguageTitles', 'English');
    formData.append('GradesEnumerable', 9);
    formData.append('ImageFormFile', file);

    axios
        .post('http://localhost:7280/api/User/create-account', formData, {
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
// const postCreateAccount = (file) => {
//     const accessToken = localStorage.getItem('accessToken');
//
//     const firstName = localStorage.getItem('firstName');
//
//     axios
//         .post('http://localhost:7280/api/User/create-account', {
//             FirstName: "firstName",
//             LastName: "lastName",
//             IsATeacher: "isTeacher",
//             IsAnExpert: "isExpert",
//             CityLocation: "S",
//             CountryLocation: "country",
//             InstitutionTitle: "institutionTitle",
//             Address: "institutionAddress",
//             Types: [
//                 "School"
//             ],
//             DisciplineTitles: "disciplines",
//             LanguageTitles: "English",
//             GradesEnumerable: "grades",
//             ImageFormFile: file,
//
//         }, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             }
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
