import apiClient from "@/app/[locale]/api/utils/axios";

const putUpdatePersonalInfo = async (firstName, lastName, country, city, description, isTeacher, isExpert, toast) => {

   try{
       const response = await apiClient.put('/EditUser/personal-info', {
        IsATeacher: isTeacher,
        IsAnExpert: isExpert,
        FirstName: firstName,
        LastName: lastName,
        CityTitle: city,
        CountryTitle: country,
        Description: description
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


