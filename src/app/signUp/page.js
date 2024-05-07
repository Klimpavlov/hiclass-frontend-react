'use client';

import React, {useState} from "react";
import { useRouter } from 'next/navigation';
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import GoogleButton from "@/components/Buttons/GoogleButton";
import FacebookButton from "@/components/Buttons/FacebookButton";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Link from "next/link";
import postSignUp from "@/app/signUp/postSignUp/postSignUp";

export default function SignUp() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    localStorage.setItem('emailForVerification', email)

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSignUp = () => {
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
        }
        if (confirmPassword !== password) {
            setConfirmPasswordError("Wrong password")
        }
        postSignUp(email, password, successRedirect)
    }

    const successRedirect = () => {
        router.push('/signUp/verifyEmail');
    };

    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Join Wonder World</div>
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