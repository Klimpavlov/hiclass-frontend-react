'use client';

import React, {useState, useEffect, useRef} from 'react';
import {usePathname, useRouter} from "next/navigation";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import postCreateAccount from "@/app/[locale]/createAccount/postCreateAccount/postCreateAccount";
import getAvailableGrades from "@/app/[locale]/api/getAvailableGrades/getAvailableGrades";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import useDeviceToken from "@/app/[locale]/api/getDeviceToken/getDeviceToken";

export default function gradesForm() {
    const pathname = usePathname()
    const deviceToken = useDeviceToken();
    const toast = useRef(null);

    const router = useRouter();
    const grades = getAvailableGrades()
    const [selectedGrades, setSelectedGrades] = useState([])

    const t = useTranslations("CreateAccount.Grades");
    const errorTranslations = useTranslations("DialogModal.Error");


    console.log(selectedGrades)

    localStorage.setItem('grades', selectedGrades)


    const handleContinue = async () => {
        if (selectedGrades.length === 0) {
            toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
            return;
        }
        const success = await postCreateAccount(successRedirect, toast, pathname, deviceToken);
        if (success) {
            successRedirect();
        }
    }

    const successRedirect = () => {
        router.push('/createAccount/profilePhoto')
    }


    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className="text-center">{t("gradesFormText")}
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <Dropdown dropdownFormText={t("grades")} placeholderText={t("placeholderGrades")}
                                      options={grades}
                                      onChange={setSelectedGrades}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText='Continue' onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}