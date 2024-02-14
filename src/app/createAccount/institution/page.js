'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputForm from "@/components/Inputs/InputForm";

export default function institutionForm() {

    const router = useRouter()
    const [institutionName, setInstitutionName] = useState('');

    // async function fetchOrg(searchText) {
    //     try {
    //         const response = await fetch(
    //             `https://search-maps.yandex.ru/v1/?text=${searchText}&type=biz&lang=ru_RU&apikey=6d742c7a-847a-40eb-b9a2-ae34493ad1f8`
    //         );
    //         const data = await response.json();
    //         // Обработка полученных данных
    //         console.log(data);
    //     } catch (error) {
    //         console.log('Error fetching organization data:', error);
    //     }
    // }

    const handleContinue = () => {
        // Вызовите fetchOrg с передачей institutionName
        // fetchOrg(institutionName);
        // Перенаправление на следующую страницу
        router.push('/createAccount/disciplines');
    };

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
                            <InputForm inputFormText='Institution name'
                                       placeholderText='e.g. Gymnasium No. 7, Minsk'
                                       value={institutionName}
                                       onChange={(e) => setInstitutionName(e.target.value)}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText='Continue' onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}