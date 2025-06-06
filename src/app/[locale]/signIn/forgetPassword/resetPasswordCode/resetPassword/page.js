'use client';

import React, {useRef, useState} from "react";
import {useRouter} from 'next/navigation';
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postResetPassword from "@/app/[locale]/signIn/forgetPassword/resetPasswordCode/resetPassword/postResetPassword";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function resetPassword() {
    const toast = useRef(null);

    const router = useRouter();

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [isClicked, setIsClicked] = useState(false);

    const t = useTranslations("ForgetPassword")
    const errorToastsTranslations = useTranslations("DialogModal.Error")

    const handleResetPassword = async () => {
        if (password.length < 6) {
            // setPasswordError("Password must be at least 6 characters")
            toast.current.show({ severity: 'error', summary: errorToastsTranslations("error"), detail: errorToastsTranslations("shortPassword"), life: 3000 });
            return;
        }
        else if (confirmPassword !== password) {
            // setConfirmPasswordError("Wrong password")
            toast.current.show({ severity: 'error', summary: errorToastsTranslations("error"), detail: errorToastsTranslations("wrongPassword"), life: 3000 });
            return;
        }

        setIsClicked(true);

        const resetSuccess = await postResetPassword(password, toast);

        if (resetSuccess) {
            router.push('/myProfile');
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
                    <div className="text-4xl whitespace-pre-line">{t("resetPassword")}</div>
                    <div className="text-center">{t("setupNewPassword")}</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <InputForm inputFormText={t("password")} placeholderText={t("placeholderPassword")}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   isPassword={true}
                                   error={passwordError}
                        />
                        <div className="my-4">
                            <InputForm inputFormText={t("confirmPassword")} placeholderText={t("placeholderConfirmPassword")}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       isPassword={true}
                                       error={confirmPasswordError}
                            />

                        </div>
                    </div>
                    <ContinueButton buttonText={t("changePassword")} onClick={handleResetPassword} isSubmitting={isClicked}/>
                </div>
            </div>
        </main>
)
}