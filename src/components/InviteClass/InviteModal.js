"use client";

import React, {useState, useEffect} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import InputCalendar from "@/components/Inputs/InputCalendar";
import InputForm from "@/components/Inputs/InputForm";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import postInviteClass from "@/app/postInviteClass/postInviteClass";
import {useRouter} from "next/navigation";
import {getUserProfile} from "@/app/api/getUserProfile/getUserProfile";
import axios from "axios";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import Image from "next/image";
import Tag from "@/components/Tags/Tag";


const InviteModal = ({classId, disciplines, handleCloseModal}) => {
    const router = useRouter()

    const [classData, setClassData] = useState([]);

    useEffect(() => {
        userProfile()
    }, []);

    async function userProfile() {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get(
                "http://localhost:7280/api/User/userprofile",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            // console.log(response);
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
        setDateOfInvitation(date);
    };

    // const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);


    const [classSenderId, setClassSenderId] = useState([])
    const handleClassClick = (classId) => {
        // console.log(classId)
        setClassSenderId(classId)
        // Дополнительная логика с обработкой id класса
    };

    console.log(classSenderId)

    const handlePostInvitation = () => {
        console.log(dateOfInvitation)
        console.log(invitationText)
        console.log(classId)
        // alert('Invitation send!')
        // router.push('/')
        // handleCloseModal();
        postInviteClass(classSenderId, classId, dateOfInvitation, invitationText, successRedirect)
    }

    const successRedirect = () => {
        alert('Invitation send!')
    };

    return (
        <div className="class-preview fixed inset-0 flex flex-col items-center justify-center bg-white z-50 overflow-y-auto">
            <div className="class-preview-close absolute top-4 right-4 cursor-pointer text-gray-500"
                 onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </div>
            <div className="header-title">Invite for a call</div>
            <div className="invite-modal-content max-w-3xl w-full mx-auto p-8">
                <div className='dropdowns'>
                    <Dropdown dropdownFormText='Subject' placeholderText='Select subject'
                              options={disciplines}
                              onChange={setSelectedDisciplines}
                    />
                    <InputCalendar inputFormText='Date' placeholderText='Select date'
                                   value={dateOfInvitation}
                                   onChange={handleDateChange}/>
                    {/*<InputForm inputFormText='Start time' placeholderText='Enter time'/>*/}
                    {/*<InputForm inputFormText='End time' placeholderText='Enter time'/>*/}
                </div>
            </div>
            <div className='invite-message-form max-w-3xl w-full mx-auto p-8'>
                <InputForm inputFormText='Message' placeholderText='Write a few words about your activity that you suggest for the meeting'
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
                <ClearAllButton buttonText="Cancel" clearAll={handleCancel} />
                <ApplyButton buttonText="Send call invite" onApply={handlePostInvitation} />
            </div>
        </div>
    );
};

export default InviteModal