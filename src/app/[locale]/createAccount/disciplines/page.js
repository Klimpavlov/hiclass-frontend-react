'use client';

import React, {useState, useEffect, useRef} from 'react';
import {usePathname, useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import {translateItems} from "@/app/[locale]/translateItems/translateItems";
import disciplinesMapping from "/Users/a111/Desktop/hiclass-frontend-react/mapping/disciplinesMapping/disciplinesMapping.json"

export default function disciplinesForm() {
    const pathname = usePathname();
    const toast = useRef(null);

    const router = useRouter();
    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    console.log(selectedDisciplines)
    localStorage.setItem('disciplines', selectedDisciplines);


    useEffect(() => {
        getDisciplines()
    }, []);


    async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(translateItems(availableDisciplines, disciplinesMapping, pathname));
    }

    const handleContinue = () => {
        if (selectedDisciplines.length === 0) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
        router.push('/createAccount/grades');
    }

    const t = useTranslations("CreateAccount.Disciplines")


    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className=" ">{t("disciplinesFormText")}</div>
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