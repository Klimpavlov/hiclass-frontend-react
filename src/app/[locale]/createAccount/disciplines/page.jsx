'use client';

import React, {useState, useEffect, useRef} from 'react';
import {usePathname, useRouter} from "next/navigation";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import {getAvailableDisciplines} from "@/app/[locale]/api/staticData/getAvailableDisciplines/getAvailableDisciplines";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import {translateItems} from "@/app/[locale]/api/translateItems/translateItems";
import disciplinesMapping from "/mapping/disciplinesMapping/disciplinesMapping.json"
import Cookies from "js-cookie";

export default function disciplinesForm() {
    const pathname = usePathname();
    const toast = useRef(null);

    const router = useRouter();
    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);

    const t = useTranslations("CreateAccount.Disciplines")
    const errorTranslations = useTranslations("DialogModal.Error");

    console.log(selectedDisciplines)
    localStorage.setItem('disciplines', selectedDisciplines);


    useEffect(() => {
        getDisciplines()
    }, []);

    async function getDisciplines() {
        // const accessToken = localStorage.getItem('accessToken');
        const accessToken =  Cookies.get('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(translateItems(availableDisciplines, disciplinesMapping, pathname));
    }

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
    }, [selectedDisciplines, router]);


    const handleContinue = () => {
        if (selectedDisciplines.length === 0) {
            toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
            return;
        }
        router.push('/createAccount/grades');
    }

    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className="text-center">{t("disciplinesFormText")}</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <Dropdown dropdownFormText={t("areasOfWork")} placeholderText={t("placeholderAreas")}
                                      options={disciplines}
                                      onChange={setSelectedDisciplines}
                            />
                        </div>
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}