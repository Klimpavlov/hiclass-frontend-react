'use client';

import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import GoogleButton from "@/components/Buttons/GoogleButton";
import FacebookButton from "@/components/Buttons/FacebookButton";
import React, {useState} from "react";
import InputForm from "@/components/Inputs/InputForm";
import ContinueButton from "@/components/Buttons/ContinueButton";
import postLoginData from "@/app/[locale]/signIn/postLogin/postLoginData";
import Link from "next/link";
import {useRouter} from "next/navigation";
import ExplorePage from "@/app/[locale]/page";

export default function SignIn() {
    const router = useRouter();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    // const [emailError, setEmailError] = useState('field is empty');
    // const [passwordError, setPasswordError] = useState("field is empty");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleLoginError = () => {
        setLoginError("Invalid email or password");

    };
    const handleSignIn = () => {
        setEmailDirty(true);
        setPasswordDirty(true);
        postLoginData(email, password, successRedirect, handleLoginError);
        setFormSubmitted(true);
    };

    const successRedirect = () => {
        router.push("/myProfile");
    };


    return (
        <main className="">
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Sign in</div>
                    <div className=" ">New to Wonder World? <Link className='text-green-800' href="/signUp">Sign
                        up</Link></div>
                    <GoogleButton/>
                    <FacebookButton/>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            {loginError && <div className="text-red-700">{loginError}</div>}
                            <InputForm inputFormText="Email" placeholderText="awesomeperson@email.com"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <InputForm inputFormText="Password" placeholderText="Enter your password"
                                   optionalFormText="Forgot password"
                                   link='/signIn/forgetPassword'
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   isPassword={true}
                        />
                    </div>
                    <ContinueButton buttonText="Sign in" onClick={handleSignIn}/>
                </div>
            </div>
        </main>
    )
}
