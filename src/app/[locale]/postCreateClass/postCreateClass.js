// import axios from "axios";
//
// const postCreateClass = (title, gradeNumber, languageTitles, disciplineTitles, toast) => {
//
//     const accessToken = localStorage.getItem('accessToken')
//
//     axios.post('http://localhost:7280/api/Class/create-class', {
//             Title: title,
//             GradeNumber: gradeNumber,
//             LanguageTitles: languageTitles,
//             DisciplineTitles: disciplineTitles
//         }, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${accessToken}`,
//             }
//         }
//     )
//         .then(function (response) {
//             console.log(response);
//             console.log(response.data.value.classId);
//             // const classId = response.data.value.classId;
//             localStorage.setItem('classId', response.data.value.classId)
//             // Перенаправление на другую страницу после успешного выполнения запроса
//         })
//         .catch(function (error) {
//             console.log(error);
//             handleCreateClassError()
//             // Перенаправление на страницу с ошибкой при ошибке запроса
//         });
// }
//
// export default postCreateClass
//
//


import axios from "axios";

const postCreateClass = async (title, gradeNumber, languageTitles, disciplineTitles, toast) => {

    try {
        const accessToken = localStorage.getItem('accessToken')

       const response = await axios.post('http://localhost:7280/api/Class/create-class', {
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


