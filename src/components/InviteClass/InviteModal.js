"use client";

import React, {useState, useEffect} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";
import InputCalendar from "@/components/Inputs/InputCalendar";
import InputForm from "@/components/Inputs/InputForm";
import ClearAllButton from "@/components/Buttons/ClearAllButton";


const InviteModal = ({username}) => {

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

    return (
        <div className="class-preview fixed inset-0 flex flex-col items-center bg-white z-50 overflow-y-auto">
            <div className='invite-header flex justify-between'>
                <div className='header-title '>
                    Invite for a call
                </div>
                <div className="class-preview-close absolute top-4 right-4 cursor-pointer text-gray-500"
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
                    <InputCalendar inputFormText='Date' placeholderText='Select date' />
                    <InputForm inputFormText='Start time' placeholderText='Enter time'/>
                    <InputForm inputFormText='End time' placeholderText='Enter time'/>
                </div>
                <div className='invite-message-form '>
                    <InputForm inputFormText='Message' placeholderText='Add a message'/>
                </div>
            </div>
            <div className='invite-modal-footer flex justify-between items-center'>
                <div className='userinfo'>{username}</div>
                <div className='btns'>
                    <ClearAllButton buttonText='Cancel'/>
                    <ApplyButton buttonText='Send call invite'/>
                </div>
            </div>
        </div>
    );
};

export default InviteModal