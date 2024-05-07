'use client';

import React, {useState} from "react";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postEmailForgetPassword from "@/app/signIn/forgetPassword/postEmailForgetPassword";
import {useRouter} from "next/navigation";

export default function ForgetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const successRedirect = () => {
        router.push('/signIn/forgetPassword/resetPasswordCode');
    };
    const handleContinue = () => {
        postEmailForgetPassword(email, successRedirect);
    }
    return (
        <div>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Forgot password?</div>
                    <div className="text-center">
                        Type in the email you used to register in Wonder World.
                        We’ll send you a link to create your new password.
                    </div>
                    <div className="inputs w-full my-4">
                        <InputForm
                            inputFormText='Email'
                            placeholderText="awesomeperson@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <ContinueButton buttonText="Continue" onClick={handleContinue}/>
                </div>
            </div>
        </div>
    )
}