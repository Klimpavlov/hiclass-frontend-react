"use client";

import React, {useState, useEffect, useRef} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import InputCalendar from "@/components/Inputs/InputCalendar";
import InputForm from "@/components/Inputs/InputForm";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import postInviteClass from "@/app/[locale]/postInviteClass/postInviteClass";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import axios from "axios";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import Image from "next/image";
import Tag from "@/components/Tags/Tag";
import ErrorNotification from "@/components/Error/ErrorNotification";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import { format } from "date-fns";
import {useTranslations} from "next-intl";
import apiClient from "@/app/[locale]/api/utils/axios";



const InviteModal = ({classId, disciplines, handleCloseModal, handleCloseClassPreviewModal}) => {
    const toast = useRef(null);
    const localhost = getLocalhost();

    const [classData, setClassData] = useState([]);

    useEffect(() => {
        userProfile()
    }, []);

    async function userProfile() {
        try {
            const response = await apiClient.get(
                '/User/userprofile',);
            setClassData(response.data.value.classDtos)
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


    const [classSenderId, setClassSenderId] = useState([])
    const handleClassClick = (classId) => {
        // console.log(classId)
        setClassSenderId(classId)
    };

    console.log(classSenderId)

    const handlePostInvitation = async () => {
        if (!classSenderId || !dateOfInvitation || !invitationText) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
        console.log(dateOfInvitation)

        const postInvitationSuccess = await postInviteClass(classSenderId, classId, dateOfInvitation, invitationText, toast)

        if (postInvitationSuccess) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Invitation successfully created', life: 3000 });
            setTimeout(()=> {
                handleCloseModal()
                handleCloseClassPreviewModal();
            }, 1500)
        }
    }


    const t = useTranslations("InviteModal");


    return (
        <>
            <ErrorNotification ref={toast}/>
            <div className="class-preview fixed inset-0 flex flex-col items-center justify-center bg-white z-50 overflow-y-auto">
            <div className="class-preview-close absolute top-4 right-4 cursor-pointer text-gray-500"
                 onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </div>
            <div className="header-title">{t("inviteModalText")}</div>
            <div className="invite-modal-content max-w-3xl w-full mx-auto p-8">
                <div className='dropdowns sm:flex justify-between'>
                    <Dropdown dropdownFormText={t("subject")} placeholderText={t("placeholderSubject")}
                              options={disciplines}
                              onChange={setSelectedDisciplines}
                    />
                    <InputCalendar inputFormText={t("date")} placeholderText={t("placeholderDate")}
                                   value={dateOfInvitation}
                                   onChange={handleDateChange}/>
                    {/*<InputForm inputFormText='Start time' placeholderText='Enter time'/>*/}
                    {/*<InputForm inputFormText='End time' placeholderText='Enter time'/>*/}
                </div>
            </div>
            <div className='invite-message-form max-w-3xl w-full mx-auto p-8'>
                <InputForm inputFormText={t("message")} placeholderText={t("placeholderMessage")}
                           value={invitationText}
                           onChange={(e) => (setInvitationText(e.target.value))}/>
            </div>
            <div>Select your class</div>
            <div className='select-your-class max-w-3xl w-full mx-auto p-8 sm:grid grid-cols-2 gap-4 flex flex-col'>
                {classData.map((defaultClass) => (
                    <div key={defaultClass.classId}
                         onClick={() => handleClassClick(defaultClass.classId)}
                         className={`class-item ${
                             classSenderId === defaultClass.classId ? 'bg-green-100' : ''
                         } cursor-pointer`}                        >
                        {/*<ClassPreview key={defaultClass.classId}*/}
                        {/*              title={defaultClass.title}*/}
                        {/*              username={defaultClass.userFullName}*/}
                        {/*              tags={defaultClass.disciplines}*/}
                        {/*              photo={defaultClass.imageUrl}*/}
                        {/*/>*/}
                        <div className='border border-black rounded py-2 px-2'>
                            <div>{defaultClass.title}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='invite-modal-footer max-w-3xl w-full mx-auto p-8'>
                <ClearAllButton buttonText={t("cancelBtn")} clearAll={handleCancel} />
                <ApplyButton buttonText={t("sendInviteBtn")} onApply={handlePostInvitation} />
            </div>
        </div>
        </>
    );
};

export default InviteModal