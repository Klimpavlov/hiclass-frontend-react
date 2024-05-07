import axios from 'axios';

const postCreateAccount = () => {
    const accessToken = localStorage.getItem('accessToken');

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const country = localStorage.getItem('country');
    const city = localStorage.getItem('city');

    const institution = localStorage.getItem('institution');
    const institutionRequest = institution.split(';');
    const institutionTitle = institutionRequest[0];
    const institutionAddress = institutionRequest[1];

    const disciplines = localStorage.getItem('disciplines');
    const disciplinesArray = disciplines.split(',');

    const languages = localStorage.getItem('languages');
    const languagesArray = languages.split(',');

    const grades = localStorage.getItem('grades');
    const gradesArray = grades.split(',').map(Number);

    const requestData = {
        FirstName: firstName,
        LastName: lastName,
        IsATeacher: true,
        IsAnExpert: false,
        CityLocation: city,
        CountryLocation: country,
        InstitutionDto: {
            Types: 'School',
            Address: institutionAddress,
            Title: institutionTitle
        },
        DisciplineTitles: disciplinesArray,
        LanguageTitles: languagesArray,
        GradesEnumerable: gradesArray,
    };

    console.log(requestData)
    axios
        .put('http://localhost:7280/api/User/create-account', requestData, {
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



