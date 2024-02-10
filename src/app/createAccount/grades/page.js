'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import postCreateAccount from "@/app/createAccount/postCreateAccount/postCreateAccount";

export default function gradesForm() {

    const router = useRouter();
    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const handleContinue = () => {
    }

    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Welcome !</div>
                    <div className=" ">It’s great to have you with us! To help us optimise your
                        experience, tell us what you plan to use WonderWorld for.
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <Dropdown dropdownFormText='Grades' placeholderText='Select..'
                                      options={grades}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText='Continue' onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}