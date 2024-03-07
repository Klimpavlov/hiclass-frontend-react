"use client";

import React, {useState, useEffect} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";
import InputCalendar from "@/components/Inputs/InputCalendar";
import InputForm from "@/components/Inputs/InputForm";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import postInviteClass from "@/app/postInviteClass/postInviteClass";
import {useRouter} from "next/navigation";


const InviteModal = ({username, handleCloseModal}) => {
    const router = useRouter()
    const handleContinue = () => {
        router.push('/userProfile');
    };

    // const [userPage, setIsUserPageOpen] = useState(false);
    //
    // const handleOpenInviteModal = () => {
    //     setIsUserPageOpen(true);
    // };


    const [dateOfInvitation, setDateOfInvitation] = useState('');
    const [invitationText, setInvitationText] = useState('');

    const handleCancel = () => {
        handleCloseModal();
    };

    const handleDateChange = (date) => {
        setDateOfInvitation(date);
    };

    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);

    useEffect(() => {
        getDisciplines()
    }, []);
    async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(availableDisciplines);
    }

    const handlePostInvitation = () => {
        console.log(dateOfInvitation)
        console.log(invitationText)
        postInviteClass(dateOfInvitation, invitationText)
    }

    return (
        <div className="class-preview fixed inset-0 flex flex-col items-center justify-center bg-white z-50 overflow-y-auto">
            <div className="invite-header flex justify-between items-center px-4 py-2">
                <div className="header-title">Invite for a call</div>
                <div
                    className="class-preview-close absolute top-4 right-4 cursor-pointer text-gray-500"
                    onClick={handleCloseModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className="invite-modal-content max-w-3xl w-full mx-auto p-8">
                <div className='dropdowns'>
                    <Dropdown dropdownFormText='Subject' placeholderText='Select subject'
                              options={disciplines}
                              onChange={setSelectedDisciplines}
                    />
                    <InputCalendar inputFormText='Date' placeholderText='Select date'
                                   value={dateOfInvitation}
                                   onChange={handleDateChange}/>
                    <InputForm inputFormText='Start time' placeholderText='Enter time'/>
                    <InputForm inputFormText='End time' placeholderText='Enter time'/>
                </div>
                <div className='invite-message-form '>
                    <InputForm inputFormText='Message' placeholderText='Add a message'
                               value={invitationText}
                               onChange={(e) => (setInvitationText(e.target.value))}/>
                </div>
            </div>
            <div className='invite-modal-footer flex justify-between items-center'>
                <div className='userinfo' onClick={handleContinue}>{username}</div>
                <div className='btns'>
                    <ClearAllButton buttonText='Cancel' clearAll={handleCancel}/>
                    <ApplyButton buttonText='Send call invite' onApply={handlePostInvitation}/>
                </div>
            </div>
            {/*{userPage && (*/}
            {/*    <InviteModal username={username}*/}
            {/*                 handleCloseModal={() => setIsUserPageOpen(false)}/>*/}
            {/*)}*/}
        </div>
    );
};

export default InviteModal