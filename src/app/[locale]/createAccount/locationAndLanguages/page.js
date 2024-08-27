'use client';

import React, {useState, useEffect, useRef} from 'react';
import {useRouter} from "next/navigation";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import {getAvailableLanguages} from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import {translateItems} from "@/app/[locale]/translateItems/translateItems";
import languagesMapping from "/Users/a111/Desktop/hiclass-frontend-react/mapping/languagesMapping/languagesMapping.json";
import {usePathname} from "next/navigation";

export default function locationAndLanguages() {
    const pathname = usePathname();
    const toast = useRef(null);

    const router = useRouter();
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    localStorage.setItem('languages', selectedLanguages);


    // languages

    useEffect(() => {
        getLanguages()
    }, []);


    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(translateItems(availableLanguages, languagesMapping, pathname));
    }


    // country

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);

    localStorage.setItem('country', country);
    localStorage.setItem('city', city);

    useEffect(() => {
        getLocation(country.toLowerCase(), city.toLowerCase());
    }, [country, city]);



    async function getLocation(countrySearchText, citySearchText) {
        try {
            const response = await axios.get(
                `https://countriesnow.space/api/v0.1/countries`
            );
            const countriesData = response.data.data;

            const filteredCountries = countriesData.filter((country) =>
                country.country.toLowerCase().includes(countrySearchText.toLowerCase())
            );

            setCountryData(filteredCountries);

            const filteredCities = filteredCountries.flatMap((country) =>
                country.cities.filter((city) =>
                    city.toLowerCase().includes(citySearchText)
                )
            );
            setCityData(filteredCities);
        } catch (error) {
            console.error(error);
        }
    }


    const handleContinue = () => {
        if (!country || !city || selectedLanguages.length === 0) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
            return;
        }
            router.push('/createAccount/institution')
    }

    const t = useTranslations("CreateAccount.LocationAndLanguages")

    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full
             max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className="">{t("locationFormText")}
                    </div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("country")} value={country}
                                       onChange={(e) => setCountry(e.target.value)}/>
                            {country !== '' && (
                                <div className='cursor-pointer'>
                                    {countryData.map((countryItem) => (
                                        <div key={countryItem} onClick={() => setCountry(countryItem.country)}>
                                            {countryItem.country}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <InputForm inputFormText={t("city")} value={city}
                                       onChange={(e) => setCity(e.target.value)}/>
                            {city !== '' && (
                                <div className='cursor-pointer'>
                                    {cityData.map((cityItem) => (
                                        <div key={cityItem} onClick={() => setCity(cityItem)}>
                                            {cityItem}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Dropdown dropdownFormText={t("languages")} placeholderText={t("placeholderLanguages")}
                                  options={languages}
                                  onChange={setSelectedLanguages}
                        />
                    </div>
                    <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
                </div>
            </div>
        </main>
    )
}