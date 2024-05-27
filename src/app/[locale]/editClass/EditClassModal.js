'use client';

import React, {useState, useEffect} from "react";
import CreateClassHeader from "@/components/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/СreateClass/CreateClassBody";
import postCreateClass from "@/app/[locale]/postCreateClass/postCreateClass";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import putClassImage from "@/app/[locale]/postCreateClass/setClassImage/putClassImage";
import putEditClass from "@/app/[locale]/editClass/putEditClass/putEditClass";
import editClassImage from "@/app/[locale]/editClass/editClassImage/editClassImage";

export default function EditClassModal({classId, isModalOpen, setIsModalOpen, onCreateClass}) {

    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [languages, setLanguages] = useState('');
    const [photo, setPhoto] = useState(null);

    const handlePutEditClass = () => {
        console.log(title)
        console.log(selectedDisciplines)
        putEditClass(classId, title, grade, languages, selectedDisciplines)
        setTimeout(() => {
            editClassImage(classId, photo);
        }, 2000);


    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>

            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400">
                <div className="modal-content bg-white p-4 rounded-lg w-4/5 sm:w-3/5">
                    <CreateClassHeader headerText='Edit class'
                                       handleCloseModal={handleCloseModal}
                    />
                    <CreateClassBody setTitle={setTitle}
                                     setPhoto={setPhoto}
                                     setSubjects={setSelectedDisciplines}
                                     setGrades={setGrade}
                                     setLanguage={setLanguages}
                                     classId={classId}
                    />
                    <CreateClassBottom handleCloseModal={handleCloseModal}
                                       handlePostClass={handlePutEditClass}
                    />
                </div>
            </div>

        </>
    );
}