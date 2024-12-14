'use client';

import React, {useState, useEffect, useRef} from "react";
import CreateClassHeader from "@/components/Class/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/Class/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/Class/СreateClass/CreateClassBody";
import postCreateClass from "@/app/[locale]/api/class/postCreateClass/postCreateClass";
import {getAvailableDisciplines} from "@/app/[locale]/api/staticData/getAvailableDisciplines/getAvailableDisciplines";
import putClassImage from "@/app/[locale]/api/class/postCreateClass/setClassImage/putClassImage";
import putEditClass from "@/app/[locale]/api/class/editClass/putEditClass/putEditClass";
import editClassImage from "@/app/[locale]/api/class/editClass/editClassImage/editClassImage";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import {reverseTranslateItems} from "@/app/[locale]/api/translateItems/reverseTranslateItems";
import languagesMapping from "../../../../mapping/languagesMapping/languagesMapping.json";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import {usePathname} from "next/navigation";

export default function EditClassModal({classId, isModalOpen, setIsModalOpen, onEditClass}) {

    const pathname = usePathname();
    const toast = useRef(null);


    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState('');
    const [photo, setPhoto] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const t = useTranslations('EditClass');
    const editClassToastTranslations = useTranslations("DialogModal.EditClass")

    const handlePutEditClass = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!title || !grade || !selectedDisciplines || !selectedLanguages) {
            toast.current.show({
                severity: 'error',
                summary: editClassToastTranslations("error"),
                detail: editClassToastTranslations("emptyFields"),
                life: 3000
            });
            return;
        }

        let languagesToSend = selectedLanguages;
        let disciplinesToSend = selectedDisciplines;

        if (pathname.includes('ru')) {
            languagesToSend = reverseTranslateItems(selectedLanguages, languagesMapping);
            disciplinesToSend = reverseTranslateItems(selectedDisciplines, disciplinesMapping);
        }

        const editClassSuccess = await putEditClass(classId, title, grade, languagesToSend, disciplinesToSend, toast, editClassToastTranslations);
        if (editClassSuccess) {
            if (photo) {
                const editImageSuccess = await editClassImage(classId, photo, toast);
                if (!editImageSuccess) {
                    toast.current.show({
                        severity: 'error', summary: editClassToastTranslations("error"),
                        // detail: editClassToastTranslations("successEditImageMessage"),
                        life: 3000});
                }
            }
            toast.current.show({severity: 'info',
                summary: editClassToastTranslations("success"),
                detail: editClassToastTranslations("successEditMessage"),
                life: 3000});
            // window.location.reload();
            setIsModalOpen(false);
            onEditClass()
            setIsSubmitting(false);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>

            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400 z-50">
                <ErrorNotification ref={toast}/>
                <div className="modal-content bg-white p-4 rounded-lg w-4/5 sm:w-3/5">
                    <CreateClassHeader headerText={t("headerText")}
                                       handleCloseModal={handleCloseModal}
                    />
                    <CreateClassBody setTitle={setTitle}
                                     setPhoto={setPhoto}
                                     setSubjects={setSelectedDisciplines}
                                     setGrades={setGrade}
                                     setLanguage={setSelectedLanguages}
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
