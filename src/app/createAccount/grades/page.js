'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";

export default function gradesForm() {

    const router = useRouter();
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("https://api.example.com/languages")
            .then((response) => response.json())
            .then((data) => setGrades(data.grades))
            .catch((error) => {
                console.error("Error fetching disciplines:", error);
            });
    }, []);

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
                            <Dropdown dropdownFormText='Grades' placeholderText='Select..'
                                      options={grades}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText='Continue' onClick={() => router.push('/createAccount/')}/>
                </div>
            </div>
        </main>
    )
}