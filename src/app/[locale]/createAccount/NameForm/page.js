'use client';
import React, {useRef, useState} from 'react';
import { useRouter } from 'next/navigation';
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import ErrorNotification from "@/components/Error/ErrorNotification";

export default function nameForm() {

    const toast = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    const router = useRouter();

    const handleContinue = async () => {
        if(!firstName || !lastName) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
        router.push('/createAccount/positionForm');

    };

    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Your full name</div>
                    <div className=" ">Enter your first and last name to get your account up and running.</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText="First name" placeholderText="Enter your first name"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <InputForm inputFormText="Last name" placeholderText="Enter your last name"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                            <ContinueButton buttonText='Continue' onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}