import apiClient from "@/app/[locale]/api/utils/axios";

const putEditClass = async (classId, title, gradeNumber, languageTitles, disciplineTitles, toast) => {

    try {

        console.log(gradeNumber);
        const gradeNumberString = gradeNumber.toString()
        console.log(gradeNumberString);
        console.log(disciplineTitles.join(','));

        const disciplinesString = disciplineTitles.join(',');

        const response = await apiClient.put(`/Class/edit-class/${classId}`, {
                Title: title,
                GradeNumber: gradeNumberString,
                LanguageTitles: languageTitles,
                DisciplineTitles: disciplinesString
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
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
}

export default putEditClass


