'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputRadioForm from "@/components/Inputs/InputRadioForm";

export default function PositionForm() {
    const router = useRouter();
    const [isTeacher, setIsTeacher] = useState(false);
    const [isExpert, setIsExpert] = useState(false);

    const handleContinue = () => {
        // Делайте что-то с значениями isTeacher и isExpert, например, отправьте их на сервер или сохраните в состоянии родительского компонента
        console.log(isTeacher);
        console.log(isExpert);
        localStorage.setItem('isTeacher', isTeacher);
        localStorage.setItem('isExpert', isExpert);


        // Переход на следующую страницу
        router.push('/createAccount/locationAndLanguages');
    };

    return (
        <main>
            <RegistrationHeader />
            <div className="flex flex-col items-center justify-center">
                <div className="content flex flex-col items-center gap-8 w-full max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">Welcome !</div>
                    <div className=" ">
                        It’s great to have you with us! To help us optimise your experience, tell us what you plan to use WonderWorld for.
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full">
                        <div className="my-4">
                            <InputRadioForm
                                inputFormText="I’m a teacher"
                                inputAboutFormText="As a teacher you can add your classes and organise lessons, as well as join lessons as an expert in your field."
                                checked={isTeacher}
                                onChange={(value) => setIsTeacher(value)}
                            />
                        </div>
                        <InputRadioForm
                            inputFormText="I’m an expert"
                            inputAboutFormText="As an expert you can connect with teacher and join lessons."
                            checked={isExpert}
                            onChange={(value) => setIsExpert(value)}
                        />
                    </div>
                    <ContinueButton buttonText="Continue" onClick={handleContinue} />
                </div>
            </div>
        </main>
    );
}