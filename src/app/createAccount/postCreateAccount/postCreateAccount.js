import axios from 'axios';

const postCreateAccount = (file) => {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('FirstName', "K");
    formData.append('LastName', "P");
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