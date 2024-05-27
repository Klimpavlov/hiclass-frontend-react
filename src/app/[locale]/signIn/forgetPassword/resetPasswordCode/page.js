'use client';

import React, {useEffect, useState} from "react";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postVerificationCode from "@/app/[locale]/signUp/verifyEmail/postVerificationCode/postVerificationCode";
import axios from "axios";
import {useRouter} from "next/navigation";
import postResetPasswordCode from "@/app/[locale]/signIn/forgetPassword/resetPasswordCode/postResetPasswordCode";

export default function resetPasswordCode() {
    const router = useRouter();
    const [code, setCode] = useState();

    const handleContinue = () => {
        postResetPasswordCode(code, successRedirect);
    }

    const successRedirect = () => {
        router.push('/signIn/forgetPassword/resetPasswordCode/resetPassword');
    }

    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Verify your email address</div>
                    <div className=" ">We’ve sent a verification link to <span className='user-email'>...</span>
                    </div>
                    <div className='text-center'>Click the link to complete the verification process. If you don’t see it you may
                        need to check your spam folder.
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText="Verification code" placeholderText="Enter verification code"
                                       value={code}
                                       onChange={(e) => setCode(e.target.value)}

                            />
                        </div>
                    </div>
                    <ContinueButton buttonText="Continue" onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}