'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationHeader from '@/components/RegistrationHeader/RegistrationHeader';
import ContinueButton from '@/components/Buttons/ContinueButton';
import postCreateAccount from '@/app/createAccount/postCreateAccount/postCreateAccount';
import AddProfilePhoto from '@/components/Buttons/AddProfilePhoto';
import postUserImage from "@/app/createAccount/SetUserImage/postUserImage";

export default function ProfilePhoto() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);

    // const grades = localStorage.getItem('grades');
    // const gradesArray = grades.split(',').map(Number);
    // console.log(gradesArray);

    const handleContinue = () => {
        postUserImage(selectedFile);
        router.push('/signIn');
    };

    return (
        <main>
            <RegistrationHeader />
            <div className="flex flex-col items-center justify-center">
                <div className="content flex flex-col items-center gap-8 w-full max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Nearly there!</div>
                    <div className="">Last but not least, a profile photo will let people know who they are connecting with</div>
                    <div className="divider"></div>
                    <div className="inputs w-full">
                        <div className="my-4">
                            <AddProfilePhoto onFileSelected={setSelectedFile} />
                            {/* Передача функции setSelectedFile в компонент AddProfilePhoto */}
                        </div>
                    </div>
                    <ContinueButton buttonText="Finish" onClick={handleContinue} />
                </div>
            </div>
        </main>
    );
}