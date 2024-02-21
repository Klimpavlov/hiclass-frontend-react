'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";

export default function disciplinesForm() {

    const router = useRouter();
    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    localStorage.setItem('disciplines', selectedDisciplines);


    useEffect(() => {
        getDisciplines()
    }, []);


    async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(availableDisciplines);
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
                            <Dropdown dropdownFormText='Areas of work' placeholderText='Select..'
                                      options={disciplines}
                                      onChange={setSelectedDisciplines}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText='Continue' onClick={() => router.push('/createAccount/grades')}/>
                </div>
            </div>
        </main>
    )
}