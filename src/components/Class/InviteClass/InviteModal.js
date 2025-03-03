"use client";

import React, {useState, useEffect, useRef} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import InputCalendar from "@/components/Inputs/InputCalendar";
import InputForm from "@/components/Inputs/InputForm";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import postInviteClass from "@/app/[locale]/api/class/postInviteClass/postInviteClass";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {format} from "date-fns";
import {useTranslations} from "next-intl";
import apiClient from "@/app/[locale]/api/utils/axios";


const InviteModal = ({classId, handleCloseModal, handleCloseClassPreviewModal}) => {
    const toast = useRef(null);

    // translation
    const t = useTranslations("InviteModal");
    const toastErrorTranslation = useTranslations("DialogModal.Error");
    const toastInvitationTranslation = useTranslations("DialogModal.Invitation")

    const [classData, setClassData] = useState([]);
    const [isTeacher, setIsTeacher] = useState([]);
    const [isExpert, setIsExpert] = useState([]);
    const [isOnlyExpert, setIsOnlyExpert] = useState(false);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        userProfile()
    }, []);

    async function userProfile() {
        try {
            const response = await apiClient.get(
                '/User/userprofile',);
            console.log(response.data.value.isATeacher);
            console.log(response.data.value.isAnExpert);

            setIsTeacher(response.data.value.isATeacher)
            setIsExpert(response.data.value.isAnExpert);
            setClassData(response.data.value.classDtos);
        } catch (error) {
            console.error(error);
        }
    }

    const [dateOfInvitation, setDateOfInvitation] = useState('');
    const [invitationText, setInvitationText] = useState('');

    const handleCancel = () => {
        handleCloseModal();
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, "MM/dd/yyyy");
        setDateOfInvitation(formattedDate);
    };

    // const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);


    const [classSenderId, setClassSenderId] = useState('')
    const handleClassClick = (classId) => {
        // console.log(classId)
        setClassSenderId(classId)
    };

    console.log(classSenderId)

    const handlePostInvitation = async () => {
        console.log('classSenderId:', classSenderId);
        console.log('dateOfInvitation:', dateOfInvitation);
        console.log('invitationText:', invitationText);

        if (isTeacher === false && isExpert === true) {
            setIsOnlyExpert(true);
            toast.current.show({severity: 'error', summary: toastErrorTranslation("error"),
                detail: toastInvitationTranslation("positionError"), life: 3000});
            return;
        }
        if (!classSenderId && (!dateOfInvitation || !invitationText)) {
            toast.current.show({
                severity: 'error',
                summary: toastErrorTranslation("error"),
                detail: toastErrorTranslation("emptyFields"),
                life: 3000
            });
            return;
        }
        if (!classSenderId) {
            toast.current.show({
                severity: 'error',
                summary: toastInvitationTranslation("error"),
                detail: toastInvitationTranslation("emptyClassError"),
                life: 3000
            });
            return;
        }
        if (!dateOfInvitation || !invitationText) {
            toast.current.show({severity: 'error', summary: toastErrorTranslation("error"),
                detail: toastErrorTranslation("emptyFields"), life: 3000});
            return;
        }

        setClicked(true);

        const postInvitationSuccess = await postInviteClass(classSenderId, classId, dateOfInvitation, invitationText, toast)

        if (postInvitationSuccess) {
            toast.current.show({
                severity: 'info',
                summary: toastInvitationTranslation("success"),
                detail: toastInvitationTranslation("successMessage"),
                life: 3000
            });
            setTimeout(() => {
                handleCloseModal()
                handleCloseClassPreviewModal();
            }, 1500)
        } else {
            setClicked(false);
        }
    }


    return (
        <>
            <ErrorNotification ref={toast}/>
            <div
                className="class-preview fixed inset-0 flex flex-col items-center justify-center bg-white z-50 overflow-y-auto">
                {/*<div className="class-preview-close cursor-pointer text-gray-500"*/}
                {/*     onClick={handleCloseModal}>*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"*/}
                {/*         stroke="currentColor">*/}
                {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>*/}
                {/*    </svg>*/}
                {/*</div>*/}
                <div className="header relative flex items-center justify-center w-full max-w-3xl mx-auto p-8">
                    <div className="header-title flex-grow text-center text-xl font-semibold">{t("inviteModalText")}</div>
                    <div className="class-preview-close absolute right-4 cursor-pointer text-gray-500" onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="invite-modal-content max-w-3xl w-full mx-auto py-4 px-8">
                    <div className='dropdowns sm:flex justify-between'>
                        {/*<Dropdown dropdownFormText={t("subject")} placeholderText={t("placeholderSubject")}*/}
                        {/*          options={disciplines}*/}
                        {/*          onChange={setSelectedDisciplines}*/}
                        {/*/>*/}
                        <InputCalendar inputFormText={t("date")} placeholderText={t("placeholderDate")}
                                       value={dateOfInvitation}
                                       onChange={handleDateChange}/>
                        {/*<InputForm inputFormText='Start time' placeholderText='Enter time'/>*/}
                        {/*<InputForm inputFormText='End time' placeholderText='Enter time'/>*/}
                    </div>
                </div>
                <div className='invite-message-form max-w-3xl w-full mx-auto py-4 px-8'>
                    <InputForm inputFormText={t("message")} placeholderText={t("placeholderMessage")}
                               value={invitationText}
                               onChange={(e) => (setInvitationText(e.target.value))}
                               isTextarea={true}
                               hasMaxLength={true}
                               maxLength={250}
                    />
                </div>
                <div>{t('selectClass')}</div>

                {/*<div*/}
                {/*    className='select-your-class overflow-y-auto h-40 max-w-3xl w-full mx-auto p-8 sm:grid grid-cols-2 gap-4 flex flex-col'>*/}
                <div
                    className={`max-w-3xl w-full mx-auto p-8 sm:grid grid-cols-2 gap-4 flex flex-col ${
                        classData.length > 2 ? 'overflow-y-auto h-40' : ''
                    }`}>
                    {classData.map((defaultClass) => (
                        <div key={defaultClass.classId}
                             onClick={() => handleClassClick(defaultClass.classId)}
                             className={`class-item ${
                                 classSenderId === defaultClass.classId ? 'bg-green-100' : ''
                             } cursor-pointer`}>
                            <div className='border border-black rounded py-2 px-2 '>
                                <div>{defaultClass.title}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='invite-modal-footer max-w-3xl w-full mx-auto p-8'>
                    <ClearAllButton buttonText={t("cancelBtn")} clearAll={handleCancel}/>
                    <ApplyButton buttonText={t("sendInviteBtn")}
                                 onApply={handlePostInvitation}
                                 isSubmitting={clicked}
                                 isExpert={isOnlyExpert}
                    />
                </div>
            </div>
        </>
    );
};

export default InviteModal
