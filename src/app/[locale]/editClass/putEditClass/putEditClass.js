import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putEditClass = (classId, title, gradeNumber, languageTitles, disciplineTitles) => {

    const accessToken = localStorage.getItem('accessToken')
    const localhost = getLocalhost();

    axios.put(`http://${localhost}/api/Class/edit-class/${classId}`, {
            Title: title,
            GradeNumber: gradeNumber,
            LanguageTitles: languageTitles,
            DisciplineTitles: disciplineTitles
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            }
        }
    )
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
}

export default putEditClass


