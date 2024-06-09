'use client';

import React, {useRef, useState} from 'react';
import { useRouter } from 'next/navigation';
import RegistrationHeader from '@/components/RegistrationHeader/RegistrationHeader';
import ContinueButton from '@/components/Buttons/ContinueButton';
import postCreateAccount from '@/app/[locale]/createAccount/postCreateAccount/postCreateAccount';
import AddProfilePhoto from '@/components/Buttons/AddProfilePhoto';
import postUserImage from "@/app/[locale]/createAccount/profilePhoto/postUserImage";
import ErrorNotification from "@/components/Error/ErrorNotification";

export default function ProfilePhoto() {
    const toast = useRef(null);

    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleContinue = () => {
        if (!selectedFile) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
        postUserImage(selectedFile, successRedirect);
    };

    const successRedirect = () => {
        router.push('/signIn');
    }

    return (
        <main>
            <ErrorNotification ref={toast} />
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