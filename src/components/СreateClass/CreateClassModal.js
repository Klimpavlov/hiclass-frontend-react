'use client';

import React, {useState, useEffect, useRef} from "react";
import CreateClassHeader from "@/components/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/СreateClass/CreateClassBody";
import postCreateClass from "@/app/[locale]/postCreateClass/postCreateClass";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import putClassImage from "@/app/[locale]/postCreateClass/setClassImage/putClassImage";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function CreateClassModal({classId, setIsModalOpen, onCreateClass}) {

    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [languages, setLanguages] = useState('');
    const [photo, setPhoto] = useState(null);

    const toast = useRef(null);

    const handlePostCreateClass = async () => {
        if (!title || !grade || !selectedDisciplines || !languages || !photo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }

        const createClassSuccess = await postCreateClass(title, grade, languages, selectedDisciplines, toast);
        if (createClassSuccess) {
            const uploadImageSuccess = await putClassImage(photo, toast);
            if (uploadImageSuccess) {
                toast.current.show({ severity: 'info', summary: 'Success', detail: 'Class successfully created', life: 3000 });
                window.location.reload();
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // translation

    const t = useTranslations('CreateClass');

    return (
        <>

            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400">
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
                                       handlePostClass={handlePostCreateClass}
                    />
                </div>
            </div>

        </>
    );
}
