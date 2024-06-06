import axios from "axios";
import putClassImage from "@/app/[locale]/postCreateClass/setClassImage/putClassImage";
import {useState} from "react";

const postCreateClass = (title, gradeNumber, languageTitles, disciplineTitles, handleCreateClassError) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.post('http://localhost:7280/api/Class/create-class', {
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
            console.log(response.data.value.classId);
            // const classId = response.data.value.classId;
            localStorage.setItem('classId', response.data.value.classId)
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            handleCreateClassError()
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postCreateClass


