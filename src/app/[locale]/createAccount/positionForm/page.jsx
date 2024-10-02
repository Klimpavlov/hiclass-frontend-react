'use client';

import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputRadioForm from "@/components/Inputs/InputRadioForm";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";


export default function PositionForm() {
    const toast = useRef(null);

    const router = useRouter();
    const [isTeacher, setIsTeacher] = useState(false);
    const [isExpert, setIsExpert] = useState(false);

    const t = useTranslations("CreateAccount.PositionForm")
    const errorTranslations = useTranslations("DialogModal.Error")


    localStorage.setItem('isTeacher', isTeacher);
    localStorage.setItem('isExpert', isExpert);
    const handleContinue = () => {
        if(!isTeacher && !isExpert) {
            toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
            return;
        }
        router.push('/createAccount/locationAndLanguages');
    };


    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader />
            <div className="flex flex-col items-center justify-center">
                <div className="content flex flex-col items-center gap-8 w-full max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className="text-center">
                        {t("positionFormText")}
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full">
                        <div className="my-4">
                            <InputRadioForm
                                inputFormText={t("teacherForm")}
                                inputAboutFormText={t("aboutTeacherForm")}
                                checked={isTeacher}
                                onChange={(value) => setIsTeacher(value)}
                            />
                        </div>
                        <InputRadioForm
                            inputFormText={t("expertForm")}
                            inputAboutFormText={t("aboutExpertForm")}
                            checked={isExpert}
                            onChange={(value) => setIsExpert(value)}
                        />
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue} />
                </div>
            </div>
        </main>
    );
}