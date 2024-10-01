'use client';
import React, {useRef, useState} from 'react';
import { useRouter } from 'next/navigation';
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import ClearAllButton from "@/components/Buttons/ClearAllButton";

export default function nameForm() {

    const toast = useRef(null);

    const t = useTranslations("CreateAccount.NameForm");
    const errorTranslations = useTranslations("DialogModal.Error")


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    const router = useRouter();

    const handleContinue = async () => {
        if(!firstName || !lastName) {
            toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
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
                    <div className="text-4xl whitespace-pre-line">{t("nameFormHeader")}</div>
                    <div className="">{t("nameFormText")}</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("firstName")} placeholderText={t("placeholderFirstName")}
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <InputForm inputFormText={t("lastName")} placeholderText={t("placeholderLastName")}
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                            <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}