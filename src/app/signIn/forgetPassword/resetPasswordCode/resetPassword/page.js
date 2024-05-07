'use client';

import React, {useState} from "react";
import {useRouter} from 'next/navigation';
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postResetPassword from "@/app/signIn/forgetPassword/resetPasswordCode/resetPassword/postResetPassword";

export default function resetPassword() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const handleResetPassword = () => {
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
        }
        if (confirmPassword !== password) {
            setConfirmPasswordError("Wrong password")
        }
        postResetPassword(password, successRedirect)
    }

    const successRedirect = () => {
        router.push('/signIn');
    };

    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Reset password</div>
                    <div className="text-center">Set up your new password to log in to Wonder World</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
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
                    <ContinueButton buttonText="Change password" onClick={handleResetPassword}/>
                </div>
            </div>
        </main>
)
}