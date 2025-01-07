'use client';

import React, {useEffect, useState, useRef} from "react";
import {usePathname, useRouter} from 'next/navigation';
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import GoogleButton from "@/components/Buttons/GoogleButton";
import FacebookButton from "@/components/Buttons/FacebookButton";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Link from "next/link";
import postSignUp from "@/app/[locale]/signUp/postSignUp/postSignUp";
import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import ErrorNotification from "@/components/Error/ErrorNotification";
import postLoginData from "@/app/[locale]/signIn/postLogin/postLoginData";
import {useTranslations} from "next-intl";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import postGoogleLoginData from "@/app/[locale]/signIn/googleSignIn/googleSignIn";
import useDeviceToken from "@/app/[locale]/api/getDeviceToken/getDeviceToken";
import {LabelTerms} from "@/components/Label/Label";

export default function SignUp() {
    const router = useRouter();

    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    const toast = useRef(null);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    localStorage.setItem('emailForVerification', email)

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [terms, setTerms] = useState(false);

    const deviceToken = useDeviceToken();


    const t = useTranslations("SignUp");
    const errorToastTranslations = useTranslations("DialogModal.Error");
    const signUpToastTranslations = useTranslations("DialogModal.SignUp");


    // useEffect(() => {
    //     const firebaseConfig = {
    //         apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
    //         authDomain: "hiclass-ff338.firebaseapp.com",
    //         projectId: "hiclass-ff338",
    //         storageBucket: "hiclass-ff338.appspot.com",
    //         messagingSenderId: "526521652695",
    //         appId: "1:526521652695:web:d166d6d34aaf7c63132792"
    //     };
    //
    //     const app = initializeApp(firebaseConfig);
    //     const messaging = getMessaging(app);
    //
    //
    //     const getDeviceTokenAndSave = async () => {
    //         try {
    //             const currentToken = await getToken(messaging, {vapidKey: 'BMV5zY2GipaHYmj87jqJniSgMpJqiYgtbVBzBLfruOV2caEss56w_4AZcI74hAPgACjvVDKXlAPXfb3g3xg5wv4'});
    //             if (currentToken) {
    //                 console.log('Device token:', currentToken);
    //                 setDeviceToken(currentToken)
    //             } else {
    //                 console.log('No registration token available. Request permission to generate one.');
    //             }
    //         } catch (err) {
    //             console.log('An error occurred while retrieving token. ', err);
    //         }
    //     };
    //
    //     getDeviceTokenAndSave();
    // }, [])

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

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("emptyFields"),
                life: 3000
            });
            return;
        } else if(!terms) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("acceptTerms"),
            });
            return;
        }

        else if (!validateEmail(email)) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("validEmail"),
                life: 3000
            });
            return;
        } else if (password.length < 6) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("shortPassword"),
                life: 3000
            });
            return;
        } else if (confirmPassword !== password) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("wrongConfirmPassword"),
                life: 3000
            });
            return;
        }

        const successSignUp = await postSignUp(email, password, deviceToken, successRedirect, toast, errorToastTranslations)

        if (successSignUp) {
            toast.current.show({
                severity: 'info',
                summary: signUpToastTranslations("success"),
                detail: signUpToastTranslations("successMessage"),
                life: 3000
            });
        }
    }

    const successRedirect = () => {
        router.push('/signUp/verifyEmail');
    };


    // google sign in/up

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userToken = result.user.accessToken;
            console.log(result)

            const success = await postGoogleLoginData(userToken, deviceToken);

            if (success) {
                googleRedirect();
            }

        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const googleRedirect = () => {
        router.push("/myProfile");
    };

    return (
        <main>
            <RegistrationHeader/>
            <ErrorNotification ref={toast}/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line text-center">{t("topText")}</div>
                    <div className=" ">{t("formText")}
                        {/*<Link className='text-green-800' href="/signIn">{t("signIn")}</Link>*/}
                        <span className='text-green-800 cursor-pointer'
                              onClick={() => router.push(`/${locale}/signIn`)}>{t("signIn")}</span>
                    </div>
                    <GoogleButton onClick={handleGoogleSignIn}/>
                    <div className="inputs w-full ">
                        <div className="mb-4">
                            <InputForm inputFormText={t("email")} placeholderText="awesomeperson@email.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       error={emailError}
                                       onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                            />
                        </div>
                        <InputForm inputFormText={t("password")} placeholderText={t("placeholderPassword")}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   isPassword={true}
                                   error={passwordError}
                                   onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                        />
                        <div className="mt-4">
                            <InputForm inputFormText={t("confirmPassword")}
                                       placeholderText={t("placeholderConfirmPassword")}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       isPassword={true}
                                       error={confirmPasswordError}
                                       onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                            />
                        </div>
                    </div>
                    <LabelTerms text={t('terms')} checked={terms} onChange={(value) => setTerms(value)}/>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleSignUp}/>
                </div>
            </div>
        </main>
    )
}