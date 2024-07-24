'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputForm from "@/components/Inputs/InputForm";
import axios from "axios";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";

export default function institutionForm() {
    const toast = useRef(null);

    const router = useRouter()
    const [institutionName, setInstitutionName] = useState('');
    const [orgData, setOrgData] = useState([]);

    localStorage.setItem('institution', institutionName);

    useEffect(() => {
        fetchOrg(institutionName);
    }, [institutionName])
    async function fetchOrg(searchText) {
        try {
            const response = await axios.get(
                `https://search-maps.yandex.ru/v1/?text=${searchText}&type=biz&lang=ru_RU&apikey=6d742c7a-847a-40eb-b9a2-ae34493ad1f8`
            );
            const data = response.data;
            setOrgData(data.features);
        } catch (error) {
            console.log("Error fetching organization data:", error);
        }
    }



    const handleContinue = () => {
        if (!institutionName) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
        router.push('/createAccount/disciplines');
    };

    const t = useTranslations("CreateAccount.Institution")


    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className="">{t("institutionFormText")}
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("institution")} value={institutionName}
                                       onChange={(e) => setInstitutionName(e.target.value)}/>
                            {orgData.map((feature) => (
                                <div key={feature.properties.id}
                                     onClick={() => setInstitutionName(feature.properties.name + ';' + feature.properties.description)}>
                                    <h2>{feature.properties.name}</h2>
                                    <p>{feature.properties.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}