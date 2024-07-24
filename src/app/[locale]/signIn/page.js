'use client';

import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import GoogleButton from "@/components/Buttons/GoogleButton";
import FacebookButton from "@/components/Buttons/FacebookButton";
import React, {useEffect, useRef, useState} from "react";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postLoginData from "@/app/[locale]/signIn/postLogin/postLoginData";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import useDeviceToken from "@/app/[locale]/api/getDeviceToken/getDeviceToken";
import ExplorePage from "@/app/[locale]/page";
import {getMessaging, getToken} from "firebase/messaging";
import {initializeApp} from "firebase/app";
import putUpdatePersonalInfo from "@/app/[locale]/updateUser/updatePersonalInfo/putUpdatePersonalInfo";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function SignIn() {
    const router = useRouter();

    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    const toast = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const deviceToken = useDeviceToken();

    const handleSignIn = async () => {
        // setEmailDirty(true);
        // setPasswordDirty(true);
        // setFormSubmitted(true);
        if (!email || !password) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000});
            return;
        }

        const successLogin = await postLoginData(email, password, successRedirect, deviceToken, toast);

        if (successLogin) {
            toast.current.show({
                severity: 'info',
                summary: 'Success',
                detail: 'Success login',
                life: 3000
            });
        }
    };

    const successRedirect = () => {
        router.push("/myProfile");
    };

    const t = useTranslations("SignIn");

    return (
        <main className="">
            <RegistrationHeader/>
            <ErrorNotification ref={toast}/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("signIn")}</div>
                    <div className=" ">{t("newTo")}
                        {/*<Link className='text-green-800' href="/signUp">{t("signUp")}</Link></div>*/}
                        <span className='text-green-800 cursor-pointer'
                              onClick={() => router.push(`/${locale}/signUp`)}>{t("signUp")}</span>
                    </div>
                    <GoogleButton/>
                    <FacebookButton/>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            {/*{loginError && <div className="text-red-700">{loginError}</div>}*/}
                            <InputForm inputFormText={t("email")} placeholderText="awesomeperson@email.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <InputForm inputFormText={t("password")} placeholderText={t("placeholderPassword")}
                                   optionalFormText={t("forgotPassword")}
                                   // link='/signIn/forgetPassword'
                                    link={`/${locale}/signIn/forgetPassword`}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   isPassword={true}
                        />
                    </div>
                    <ContinueButton buttonText={t("signInBtn")} onClick={handleSignIn}/>
                </div>
            </div>
        </main>
    )
}
