'use client';

import React, {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";

export default function disciplinesForm() {

    const router = useRouter();
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        getAvailableDisciplines()
    }, []);


    async function getAvailableDisciplines() {
        try {
            const response = await axios.get(
                "http://localhost:7280/api/StaticDataSources/get-available-disciplines",
                {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhNjQyNmU3ZC1mOTEyLTRjYWItODg1NS0zZGE1MzViNTgyNTQiLCJlbWFpbCI6IjF1c2VyQGV4YW1wbGUuY29tIiwianRpIjoiY2MwZjNjMWMtYzIxZi00Y2NiLWE1YWQtNTM3NTkzNjY0YTE4IiwiaWF0IjoxNzA3NTUwOTc4LCJpc1ZlcmlmaWVkIjoiVHJ1ZSIsImlzQ3JlYXRlZEFjY291bnQiOiJUcnVlIiwiaXNBVGVhY2hlciI6IlRydWUiLCJpc0FFeHBlcnQiOiJGYWxzZSIsIm5iZiI6MTcwNzU1MDk3OCwiZXhwIjoxNzA3NjM3Mzc4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcyODAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcyODAifQ.eUlPFw3DpEl__4MUT3m5PqjyzJAa8PdrpW17WrnheUM"
                    }
                }
            );
            console.log(response.data.availableDisciplines);

            setDisciplines(response.data.availableDisciplines);

        } catch (error) {
            console.error(error);
        }
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
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText='Continue' onClick={() => router.push('/createAccount/grades')}/>
                </div>
            </div>
        </main>
    )
}