'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import {getAvailableLanguages} from "@/app/api/getAvailableLanguages/getAvailableLanguages";

export default function locationAndLanguages() {

    const router = useRouter();
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        getLanguages()
    }, []);


    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(availableLanguages);
    }



    return (
        <main>
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Welcome !</div>
                    <div className=" ">It’s great to have you with us! To help us optimise your
                        experience, tell us what you plan to use WonderWorld for.</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText="Location" placeholderText="e.g. Minsk, Belarus"

                            />
                        </div>
                        <Dropdown dropdownFormText='Languages' placeholderText='Select languages that you speak'
                                  options={languages}
                        />
                    </div>
                    <ContinueButton buttonText='Continue' onClick={() => router.push('/createAccount/institution')}/>
                </div>
            </div>
        </main>
    )
}