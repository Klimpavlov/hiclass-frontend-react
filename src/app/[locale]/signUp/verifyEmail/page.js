'use client';

import React, {useEffect, useRef, useState} from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postVerificationCode from "@/app/[locale]/signUp/verifyEmail/postVerificationCode/postVerificationCode";
import axios from "axios";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import ErrorNotification from "@/components/Error/ErrorNotification";


export default function verifyEmail() {
    const router = useRouter();
    const [code, setCode] = useState();
    const email = localStorage.getItem('emailForVerification')
    const toast = useRef(null);
    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    const [isClicked, setIsClicked] = useState(false);


    const t = useTranslations("SignUp.VerifyEmail")


    const handleContinue = async () => {
        setIsClicked(true);
        const successVerification =  await postVerificationCode(email, code, successRedirect, toast, t);
        if (!successVerification) {
            setIsClicked(false);
        }
    }

    const successRedirect = () => {
        router.push('/signUp/verifyEmail/isVerified');
    };

    return (
        <main>
            <ErrorNotification ref={toast}/>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line text-center">{t("verifyFormText")}</div>
                    <div className="text-center">{t("sendLinkTo")}
                        <span className='user-email'>{email}. </span>
                        <span className="text-center">{t("checkCode")}</span>
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("verificationCode")} placeholderText={t("placeholderVerificationCode")}
                                       optionalFormText={t("resendCode")}
                                       link={`/${locale}/signUp/verifyEmail/reVerifyEmail`}
                                       value={code}
                                       onChange={(e) => setCode(e.target.value)}
                                       onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue} isSubmitting={isClicked}/>
                </div>
            </div>
        </main>
    )
}