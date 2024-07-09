'use client';

import React, {useEffect, useState, useRef} from "react";
import { useRouter } from 'next/navigation';
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
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

export default function SignUp() {
    const router = useRouter();
    const toast = useRef(null);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    localStorage.setItem('emailForVerification', email)

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [deviceToken, setDeviceToken] = useState('');

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
            authDomain: "hiclass-ff338.firebaseapp.com",
            projectId: "hiclass-ff338",
            storageBucket: "hiclass-ff338.appspot.com",
            messagingSenderId: "526521652695",
            appId: "1:526521652695:web:d166d6d34aaf7c63132792"
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);


        const getDeviceTokenAndSave = async () => {
            try {
                const currentToken = await getToken(messaging, { vapidKey: 'BMV5zY2GipaHYmj87jqJniSgMpJqiYgtbVBzBLfruOV2caEss56w_4AZcI74hAPgACjvVDKXlAPXfb3g3xg5wv4' });
                if (currentToken) {
                    console.log('Device token:', currentToken);
                    setDeviceToken(currentToken)
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            } catch (err) {
                console.log('An error occurred while retrieving token. ', err);
            }
        };

        getDeviceTokenAndSave();
    }, [])

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSignUp = async() => {
        // if (!validateEmail(email)) {
        //     setEmailError("Please enter a valid email address");
        //     return;
        // }
        // if (password.length < 6) {
        //     setPasswordError("Password must be at least 6 characters")
        // }
        // if (confirmPassword !== password) {
        //     setConfirmPasswordError("Wrong password")
        // }
        // postSignUp(email, password, deviceToken, successRedirect)
        if (!email || !password || !confirmPassword) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000});
            return;
        } else if(!validateEmail(email)) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please enter a valid email address', life: 3000});
            return;
        } else if (password.length < 6) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Password must be at least 6 characters', life: 3000});
            return;
        } else  if (confirmPassword !== password) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Wrong confirm-password', life: 3000});
            return;
        }

        const successSignUp = await postSignUp(email, password, deviceToken, successRedirect, toast)

        if (successSignUp) {
            toast.current.show({
                severity: 'info',
                summary: 'Success',
                detail: 'Success signUp',
                life: 3000
            });
        }
    }

    const successRedirect = () => {
        router.push('/signUp/verifyEmail');
    };

    return (
        <main>
            <RegistrationHeader/>
            <ErrorNotification ref={toast}/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Join Hi,class</div>
                    <div className=" ">Already a member? <Link className='text-green-800' href="/signIn">Sign in</Link>
                    </div>
                    <GoogleButton/>
                    <FacebookButton/>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText="Email" placeholderText="awesomeperson@email.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       error={emailError}
                            />
                        </div>
                        <InputForm inputFormText="Password" placeholderText="At least 6 characters"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   isPassword={true}
                                   error={passwordError}
                        />
                        <div className="my-4">
                            <InputForm inputFormText="Confirm password" placeholderText="Re-enter your password"
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       isPassword={true}
                                       error={confirmPasswordError}
                            />

                        </div>
                    </div>
                    <ContinueButton buttonText="Continue" onClick={handleSignUp}/>
                </div>
            </div>
        </main>
    )
}