'use client';

import React, {useEffect, useRef, useState} from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postVerificationCode from "@/app/[locale]/signUp/verifyEmail/postVerificationCode/postVerificationCode";
import axios from "axios";
import {useRouter} from "next/navigation";
import postResetPasswordCode from "@/app/[locale]/signIn/forgetPassword/resetPasswordCode/postResetPasswordCode";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function resetPasswordCode() {
    const toast = useRef(null);

    const router = useRouter();
    const [code, setCode] = useState();
    const resetPasswordEmail = localStorage.getItem('forgetPasswordEmail')

    const t = useTranslations("ForgetPassword");
    const errorToastsTranslations = useTranslations("DialogModal.Error")


    const handleContinue = async () => {
        if (!code) {
            toast.current.show({ severity: 'error', summary: errorToastsTranslations('error'), detail: errorToastsTranslations("emptyFields"), life: 3000 });
            return;
        }
        console.log(code)

        const successResetPasswordCode = await postResetPasswordCode(resetPasswordEmail, code, toast);
        if (successResetPasswordCode) {
            router.push('/signIn/forgetPassword/resetPasswordCode/resetPassword');
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
                    <div className="">{t("verificationLinkText")}<span className='user-email'>...</span>
                    </div>
                    <div className='text-center'>{t("clickLinkText")}
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("verificationCode")} placeholderText={t("placeholderVerificationCode")}
                                       value={code}
                                       onChange={(e) => setCode(e.target.value)}

                            />
                        </div>
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}