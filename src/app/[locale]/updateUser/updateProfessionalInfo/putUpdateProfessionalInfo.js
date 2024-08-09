import apiClient from "@/app/[locale]/api/utils/axios";
const putUpdateProfessionalInfo = async (selectedLanguages, selectedDisciplines, selectedGrades, toast) => {

    try {
        const response = apiClient.put('/EditUser/professional-info', {
            Languages: selectedLanguages,
            Disciplines: selectedDisciplines,
            Grades: selectedGrades
        })

        console.log(response);
       return true;
    }
        catch (error) {
            console.log(error);
            if (toast && toast.current) {
                toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
            }
            return false;        }
};

export default putUpdateProfessionalInfo;


