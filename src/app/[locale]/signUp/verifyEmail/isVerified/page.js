'use client';

import React from "react";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

export default function isVerified() {
    const router = useRouter();

    const t = useTranslations("SignUp.IsVerified")

    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line text-center">{t("isVerifiedTopText")}</div>
                    <div className=" ">{t("isVerifiedMainText")}.</div>
                    <div className="divider"></div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={() => router.push('/createAccount/NameForm')}/>
                </div>
            </div>
        </main>
    )
}