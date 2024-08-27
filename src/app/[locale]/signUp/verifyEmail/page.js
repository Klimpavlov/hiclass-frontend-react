'use client';

import React, {useEffect, useState} from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postVerificationCode from "@/app/[locale]/signUp/verifyEmail/postVerificationCode/postVerificationCode";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";


export default function verifyEmail() {
    const router = useRouter();
    const [code, setCode] = useState();
    const email = localStorage.getItem('emailForVerification')

    const handleContinue = () => {
        postVerificationCode(email, code);
        router.push('/signUp/verifyEmail/isVerified')
    }

    const t = useTranslations("SignUp.VerifyEmail")

    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line text-center">{t("verifyFormText")}</div>
                    <div className="text-center">{t("sendLinkTo")}<span className='user-email'>{email}</span>
                    </div>
                    <div className=''>{t("clickLink")}
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