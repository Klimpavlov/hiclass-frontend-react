'use client';

import React, {useState, useEffect, useRef} from "react";
import CreateClassHeader from "@/components/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/СreateClass/CreateClassBody";
import postCreateClass from "@/app/[locale]/postCreateClass/postCreateClass";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import putClassImage from "@/app/[locale]/postCreateClass/setClassImage/putClassImage";
import putEditClass from "@/app/[locale]/editClass/putEditClass/putEditClass";
import editClassImage from "@/app/[locale]/editClass/editClassImage/editClassImage";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function EditClassModal({classId, isModalOpen, setIsModalOpen, onCreateClass}) {

    const toast = useRef(null);


    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [languages, setLanguages] = useState('');
    const [photo, setPhoto] = useState(null);

    // const handlePutEditClass = () => {
    //     putEditClass(classId, title, grade, languages, selectedDisciplines)
    //     // setTimeout(() => {
    //     //     editClassImage(classId, photo);
    //     // }, 2000);
    //     if (photo) {
    //         editClassImage(classId, photo);
    //     }
    // };

    const handlePutEditClass = async () => {
        // try {
        //     await putEditClass(classId, title, grade, languages, selectedDisciplines);
        //     if (photo) {
        //        await editClassImage(classId, photo);
        //     }
        //     window.location.reload()
        // } catch (error) {
        //     console.error("Error updating class:", error);
        // }

        if (!title || !grade || !selectedDisciplines || !languages) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }

        const editClassSuccess = await putEditClass(classId, title, grade, languages, selectedDisciplines, toast);
        if (editClassSuccess) {
                toast.current.show({ severity: 'info', summary: 'Success', detail: 'Class successfully edited', life: 3000 });
                window.location.reload();
        }

        if (photo) {
            const editImageSuccess = await editClassImage(classId, photo, toast);
            if (editImageSuccess) {
                toast.current.show({ severity: 'info', summary: 'Success', detail: 'Image successfully edited', life: 3000 });
                window.location.reload();
            }
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const t = useTranslations('EditClass');

    return (
        <>

            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 z-50">
                <ErrorNotification ref={toast} />
                <div className="modal-content bg-white p-4 rounded-lg w-4/5 sm:w-3/5">
                    <CreateClassHeader headerText={t("headerText")}
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
