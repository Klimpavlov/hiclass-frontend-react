import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putEditClass = async (classId, title, gradeNumber, languageTitles, disciplineTitles, toast) => {

    try {
        const accessToken = localStorage.getItem('accessToken')
        const localhost = getLocalhost();
        console.log(gradeNumber);
        const gradeNumberString = gradeNumber.toString()
        console.log(gradeNumberString);


        const response = await axios.put(`http://${localhost}/api/Class/edit-class/${classId}`, {
                Title: title,
                GradeNumber: gradeNumberString,
                LanguageTitles: languageTitles,
                DisciplineTitles: disciplineTitles
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
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


