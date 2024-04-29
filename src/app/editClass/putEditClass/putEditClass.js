import axios from "axios";

const putEditClass = (classId, title, gradeNumber, languageTitles, disciplineTitles) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.put(`http://localhost:7280/api/Class/edit-class/${classId}`, {
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
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default putEditClass


