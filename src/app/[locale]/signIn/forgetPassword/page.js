'use client';

import React, {useRef, useState} from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postEmailForgetPassword from "@/app/[locale]/signIn/forgetPassword/postEmailForgetPassword";
import {useRouter} from "next/navigation";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function ForgetPassword() {
    const toast = useRef(null);

    const router = useRouter();
    const [email, setEmail] = useState('');

    const [isClicked, setIsClicked] = useState(false);


    const t = useTranslations("ForgetPassword");
    const errorToastsTranslations = useTranslations("DialogModal.Error")


    const successRedirect = () => {
        router.push('/signIn/forgetPassword/resetPasswordCode');
    };
    const handleContinue = async () => {
        if (!email) {
            toast.current.show({ severity: 'error', summary: errorToastsTranslations('error'), detail: errorToastsTranslations("emptyFields"), life: 3000 });
            return;
        }
        setIsClicked(true);
        localStorage.setItem('forgetPasswordEmail', email)
        const successRequest = await postEmailForgetPassword(email, successRedirect, errorToastsTranslations, toast);
        if (!successRequest) {
            setIsClicked(false);
        }


    }

    return (
        <div>
            <ErrorNotification ref={toast}/>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("forgotPassword")}</div>
                    <div className="text-center">
                        {t("mainText")}
                    </div>
                    <div className="inputs w-full my-4">
                        <InputForm
                            inputFormText={t("email")}
                            placeholderText="awesomeperson@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue} isSubmitting={isClicked}/>
                </div>
            </div>
        </div>
    )
}