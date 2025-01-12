'use client';

import React, {useEffect, useRef, useState} from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import axios from "axios";
import {useRouter} from "next/navigation";
import postResetPasswordCode from "@/app/[locale]/signIn/forgetPassword/resetPasswordCode/postResetPasswordCode";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function resetPasswordCode() {
    const toast = useRef(null);

    const router = useRouter();
    const [code, setCode] = useState();
    const resetPasswordEmail = localStorage.getItem('forgetPasswordEmail');

    const [isClicked, setIsClicked] = useState(false);


    const t = useTranslations("ForgetPassword");
    const errorToastsTranslations = useTranslations("DialogModal.Error")


    const handleContinue = async () => {
        if (!code) {
            toast.current.show({ severity: 'error', summary: errorToastsTranslations('error'), detail: errorToastsTranslations("emptyFields"), life: 3000 });
            return;
        }
        console.log(code);
        setIsClicked(true);
        const successResetPasswordCode = await postResetPasswordCode(resetPasswordEmail, code, t, toast);
        if (successResetPasswordCode) {
            router.push('/signIn/forgetPassword/resetPasswordCode/resetPassword');
        } else {
            setIsClicked(false);
        }
    }

    return (
        <main>
            <ErrorNotification ref={toast}/>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line text-center">{t("resetPasswordCode")}</div>
                    <div className="text-center">{t("verificationLinkText")}<span className='user-email'>{resetPasswordEmail}</span>
                    </div>
                    <div className='text-center'>{t("clickLinkText")}
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="">
                            <InputForm inputFormText={t("verificationCode")} placeholderText={t("placeholderVerificationCode")}
                                       value={code}
                                       onChange={(e) => setCode(e.target.value)}

                            />
                        </div>
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue} isSubmitting={isClicked}/>
                </div>
            </div>
        </main>
    )
}