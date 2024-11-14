'use client';

import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import GoogleButton from "@/components/Buttons/GoogleButton";
import FacebookButton from "@/components/Buttons/FacebookButton";
import React, {useEffect, useRef, useState} from "react";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postLoginData from "@/app/[locale]/signIn/postLogin/postLoginData";
import {usePathname, useRouter} from "next/navigation";
import useDeviceToken from "@/app/[locale]/api/getDeviceToken/getDeviceToken";

import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import postGoogleLoginData from "@/app/[locale]/signIn/googleSignIn/googleSignIn";

export default function SignIn() {
    const router = useRouter();

    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    const toast = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const deviceToken = useDeviceToken();

    const t = useTranslations("SignIn");
    const errorToastTranslations= useTranslations("DialogModal.Error");
    const signInToastTranslations= useTranslations("DialogModal.SignIn");

    // useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
            authDomain: "hiclass-ff338.firebaseapp.com",
            projectId: "hiclass-ff338",
            storageBucket: "hiclass-ff338.appspot.com",
            messagingSenderId: "526521652695",
            appId: "1:526521652695:web:d166d6d34aaf7c63132792"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        //
        // export { auth, provider };

    // }, [])

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userToken = result.user.accessToken;
            console.log(result)


            // await postGoogleLoginData(userToken, deviceToken);

            const success = await postGoogleLoginData(userToken, deviceToken);

            if (success) {
                successRedirect();
            }

        } catch (error) {
            console.error('Error signing in:', error);
        }
    };




    const handleSignIn = async () => {
        if (!email || !password) {
            toast.current.show({severity: 'error', summary: errorToastTranslations("error"), detail: errorToastTranslations("emptyFields"), life: 3000});
            return;
        }

        const successLogin = await postLoginData(email, password, deviceToken, successRedirect, toast, errorToastTranslations, userNotVerifiedRedirect);
        if (successLogin) {
            toast.current.show({
                severity: 'info',
                summary: signInToastTranslations("success"),
                detail: signInToastTranslations("successMessage"),
                life: 3000
            });
        }
    };

    const successRedirect = () => {
        router.push("/myProfile");
    };

    const userNotVerifiedRedirect = () => {
        router.push('/signUp/verifyEmail/reVerifyEmail');
    }


    return (
        <main className="">
            <RegistrationHeader/>
            <ErrorNotification ref={toast}/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("signIn")}</div>
                    <div className=" ">{t("newTo")}
                        <span className='text-green-800 cursor-pointer'
                              onClick={() => router.push(`/${locale}/signUp`)}>{t("signUp")}</span>
                    </div>
                    <GoogleButton onClick={handleGoogleSignIn} />
                    {/*<FacebookButton/>*/}
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("email")} placeholderText="awesomeperson@email.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                            />
                        </div>
                        <InputForm inputFormText={t("password")} placeholderText={t("placeholderPassword")}
                                   optionalFormText={t("forgotPassword")}
                                    link={`/${locale}/signIn/forgetPassword`}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   isPassword={true}
                                   onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                        />
                    </div>
                    <ContinueButton buttonText={t("signInBtn")} onClick={handleSignIn}/>
                </div>
            </div>
        </main>
    )
}
