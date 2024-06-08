import axios from "axios";

const putUpdatePersonalInfo = async (firstName, lastName, country, city, description, isTeacher, isExpert, toast) => {

   try{
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.put('http://localhost:7280/api/EditUser/personal-info', {
        IsATeacher: isTeacher,
        IsAnExpert: isExpert,
        FirstName: firstName,
        LastName: lastName,
        CityTitle: city,
        CountryTitle: country,
        Description: description
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    console.log(response);
    return true;
}
catch (error) {
    console.log(error);
    if (toast && toast.current) {
        toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
    }
    return false;
}
};

export default putUpdatePersonalInfo;


