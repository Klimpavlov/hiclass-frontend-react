'use client';

import React, {useRef, useState} from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import ErrorNotification from "@/components/Error/ErrorNotification";
import postReVerifyEmail from "@/app/[locale]/signUp/verifyEmail/reVerifyEmail/postReVerifyEmail";


export default function reVerifyEmail() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const toast = useRef(null);
    localStorage.setItem('emailForVerification', email)
    // const pathname = usePathname();
    // const locale = pathname.slice(1, 3);


    const t = useTranslations("SignUp.reVerifyEmail")


    const handleContinue = async () => {
        await postReVerifyEmail(email, successRedirect, toast, t);
    }

    const successRedirect = () => {
        router.push('/signUp/verifyEmail');
    };

    return (
        <main>
            <ErrorNotification ref={toast}/>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line text-center">{t("reVerifyFormText")}</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("email")} placeholderText={t("placeholderEmail")}
                                       // optionalFormText={t("resendCode")}
                                       // link={`/${locale}/signIn/forgetPassword`}
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}