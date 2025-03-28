'use client';

import React, {useState, useEffect, useRef} from 'react';
import {usePathname, useRouter} from "next/navigation";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import postCreateAccount from "@/app/[locale]/api/user/postCreateAccount/postCreateAccount";
import getAvailableGrades from "@/app/[locale]/api/staticData/getAvailableGrades/getAvailableGrades";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import useDeviceToken from "@/app/[locale]/api/getDeviceToken/getDeviceToken";

export default function gradesForm() {
    const pathname = usePathname();
    const deviceToken = useDeviceToken();
    const toast = useRef(null);

    const router = useRouter();
    const grades = getAvailableGrades();
    const [selectedGrades, setSelectedGrades] = useState([]);

    const [isClicked, setIsClicked] = useState(false);


    const t = useTranslations("CreateAccount.Grades");
    const errorTranslations = useTranslations("DialogModal.Error");


    console.log(selectedGrades)

    localStorage.setItem('grades', selectedGrades)

    // enter btn

    useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                handleContinue();
            }
        }

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedGrades, router]);

    const handleContinue = async () => {
        if (selectedGrades.length === 0) {
            toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
            return;
        }
        setIsClicked(true);
        const success = await postCreateAccount(successRedirect, userExistRedirect, toast, pathname, deviceToken, errorTranslations);
        if (success) {
            successRedirect();
        } else {
            setIsClicked(false);
        }
    }

    const successRedirect = () => {
        router.push('/createAccount/profilePhoto')
    }

    const userExistRedirect = () => {
        router.push('/signIn')
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
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue} isSubmitting={isClicked}/>
                </div>
            </div>
        </main>
    )
}