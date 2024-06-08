import axios from "axios";

const putUpdateProfessionalInfo = async (selectedLanguages, selectedDisciplines, selectedGrades, toast) => {

    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = axios.put('http://localhost:7280/api/EditUser/professional-info', {
            Languages: selectedLanguages,
            Disciplines: selectedDisciplines,
            Grades: selectedGrades
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
            return false;        }
};

export default putUpdateProfessionalInfo;


