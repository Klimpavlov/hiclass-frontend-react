import axios from "axios";
import apiClient from "@/app/[locale]/api/utils/axios";

const postCreateClass = async (title, gradeNumber, languageTitles, disciplineTitles, toast) => {

    try {
        console.log(gradeNumber);

        const disciplinesString = disciplineTitles.join(',');
        console.log(disciplinesString)

        const response = await apiClient.post(`/Class/create-class`, {
                Title: title,
                GradeNumber: gradeNumber,
                LanguageTitles: languageTitles,
                DisciplineTitle: disciplinesString
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
        console.log(response);
        localStorage.setItem('classId', response.data.value.classId);
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
}

export default postCreateClass


