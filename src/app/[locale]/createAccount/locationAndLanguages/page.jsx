// 'use client';
//
// import React, {useState, useEffect, useRef} from 'react';
// import {useRouter} from "next/navigation";
// import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
// import ContinueButton from "@/components/Buttons/ContinueButton";
// import InputForm from "@/components/Inputs/InputForm";
// import Dropdown from "@/components/Dropdowns/Dropdown";
// import axios from "axios";
// import {getAvailableLanguages} from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
// import ErrorNotification from "@/components/Error/ErrorNotification";
// import {useTranslations} from "next-intl";
// import {translateItems} from "@/app/[locale]/translateItems/translateItems";
// import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
// import {usePathname} from "next/navigation";
//
// export default function locationAndLanguages() {
//     const pathname = usePathname();
//     const toast = useRef(null);
//
//     const router = useRouter();
//     const [languages, setLanguages] = useState([]);
//     const [selectedLanguages, setSelectedLanguages] = useState([]);
//
//     const t = useTranslations("CreateAccount.LocationAndLanguages")
//     const errorTranslations = useTranslations("DialogModal.Error")
//
//     localStorage.setItem('languages', selectedLanguages);
//
//
//     // languages
//
//     useEffect(() => {
//         getLanguages()
//     }, []);
//
//
//     async function getLanguages() {
//         const accessToken = localStorage.getItem('accessToken');
//         const availableLanguages = await getAvailableLanguages(accessToken);
//         setLanguages(translateItems(availableLanguages, languagesMapping, pathname));
//     }
//
//
//     // country
//
//     const [country, setCountry] = useState('');
//     const [city, setCity] = useState('');
//
//     const [countryData, setCountryData] = useState([]);
//     const [cityData, setCityData] = useState([]);
//
//     const [isCountryInputActive, setIsCountryInputActive] = useState(false);
//     const [isCityInputActive, setIsCityInputActive] = useState(false);
//
//     localStorage.setItem('country', country);
//     localStorage.setItem('city', city);
//
//     useEffect(() => {
//         getLocation(country.toLowerCase(), city.toLowerCase());
//     }, [country, city]);
//
//
//
//     async function getLocation(countrySearchText, citySearchText) {
//         try {
//             const response = await axios.get(
//                 `https://countriesnow.space/api/v0.1/countries`
//             );
//             const countriesData = response.data.data;
//
//             const filteredCountries = countriesData.filter((country) =>
//                 country.country.toLowerCase().includes(countrySearchText.toLowerCase())
//             );
//
//             setCountryData(filteredCountries);
//
//             const filteredCities = filteredCountries.flatMap((country) =>
//                 country.cities.filter((city) =>
//                     city.toLowerCase().includes(citySearchText)
//                 )
//             );
//             setCityData(filteredCities);
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//
//     const handleContinue = () => {
//         if (!country || !city || selectedLanguages.length === 0) {
//             toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
//             return;
//         }
//             router.push('/createAccount/institution')
//     }
//
//     // const preventCitySearch = () => {
//     //     // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in country field', life: 3000 });
//     // }
//
//     return (
//         <main>
//             <ErrorNotification ref={toast} />
//             <RegistrationHeader/>
//             <div className='flex flex-col items-center justify-center'>
//                 <div className="content flex flex-col items-center gap-8 w-full
//              max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
//                     <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
//                     <div className="">{t("locationFormText")}
//                     </div>
//                     <div className="divider"></div>
//                     <div className="inputs w-full ">
//                         <div className="my-4">
//                             <InputForm inputFormText={t("country")} value={country}
//                                        placeholderText={t("placeholderCountry")}
//                                        onChange={(e) => setCountry(e.target.value)}
//                                        onFocus={() => setIsCountryInputActive(true)}/>
//                             {country !== '' && (
//                                 <div className="">
//                                     {isCountryInputActive && (
//                                         <div className="cursor-pointer py-2x max-h-60 overflow-y-auto">
//                                             {countryData.map((country) => (
//                                                 <div key={country} onClick={() => {
//                                                     setCountry(country.country);
//                                                     setIsCountryInputActive(false);
//                                                 }}>
//                                                     {country.country}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                             <InputForm inputFormText={t("city")} value={city}
//                                        placeholderText={t("placeholderCity")}
//                                        onChange={(e) => setCity(e.target.value)}
//                                        onFocus={() => setIsCityInputActive(true)}/>
//                             {city !== '' && (
//                                 <div className="">
//                                     {isCityInputActive && (
//                                         <div className="cursor-pointer py-2 max-h-60 overflow-y-auto">
//                                             {cityData.map((cityItem) => (
//                                                 <div key={cityItem} onClick={() => {
//                                                     setCity(cityItem);
//                                                     setIsCityInputActive(false)
//                                                 }}>
//                                                     {cityItem}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                         <Dropdown dropdownFormText={t("languages")} placeholderText={t("placeholderLanguages")}
//                                   options={languages}
//                                   onChange={setSelectedLanguages}
//                         />
//                     </div>
//                     <ContinueButton buttonText={t("ContinueBtn")} onClick={handleContinue}/>
//                 </div>
//             </div>
//         </main>
//     )
// }

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import { getAvailableLanguages } from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
import ErrorNotification from "@/components/Error/ErrorNotification";
import { useTranslations } from "next-intl";
import { translateItems } from "@/app/[locale]/translateItems/translateItems";
import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
import { usePathname } from "next/navigation";

export default function LocationAndLanguages() {
    const pathname = usePathname();
    const toast = useRef(null);
    const router = useRouter();

    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Статус дропдауна для стран и городов
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);

    const t = useTranslations("CreateAccount.LocationAndLanguages");
    const errorTranslations = useTranslations("DialogModal.Error");

    localStorage.setItem('languages', selectedLanguages);
    localStorage.setItem('country', country);
    localStorage.setItem('city', city);

    const dropdownRef = useRef(null);  // Ссылка на дропдаун

    // Закрытие дропдауна при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);  // Закрываем дропдаун при клике вне его
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Получение списка языков
    useEffect(() => {
        getLanguages();
    }, []);

    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(translateItems(availableLanguages, languagesMapping, pathname));
    }

    // Получение стран и городов
    useEffect(() => {
        if (country) {  // Проверяем, выбрана ли страна
            getLocation(country.toLowerCase(), city.toLowerCase());
        }
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

            // Проверяем, выбрана ли страна перед поиском городов
            if (countrySearchText && filteredCountries.length > 0) {
                const filteredCities = filteredCountries.flatMap((country) =>
                    country.cities.filter((city) =>
                        city.toLowerCase().includes(citySearchText)
                    )
                );
                setCityData(filteredCities);
            } else {
                setCityData([]);  // Очищаем данные городов, если страна не выбрана
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCountryInputFocus = () => {
        setIsDropdownOpen(true);  // Открываем дропдаун
    };

    const handleCityInputFocus = () => {
        if (!country) {
            toast.current.show({ severity: 'warn', summary: errorTranslations("error"), detail: errorTranslations("chooseCountry"), life: 3000 });
        } else {
            setIsDropdownOpen(true);  // Открываем дропдаун
        }
    };

    const handleContinue = () => {
        if (!country || !city || selectedLanguages.length === 0) {
            toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
            return;
        }
        router.push('/createAccount/institution');
    };

    return (
        <main>
            <ErrorNotification ref={toast} />
            <RegistrationHeader/>
            <div className='flex flex-col items-center justify-center'>
                <div className="content flex flex-col items-center gap-8 w-full max-w-screen-sm p-4 md:p-8 lg:p-16 xl:p-20 2xl:p-32">
                    <div className="text-4xl whitespace-pre-line">{t("welcome")}</div>
                    <div className="text-center">{t("locationFormText")}</div>
                    <div className="divider"></div>
                    <div className="inputs w-full ">
                        <div className="my-4">
                            <InputForm inputFormText={t("country")} value={country}
                                       placeholderText={t("placeholderCountry")}
                                       onChange={(e) => setCountry(e.target.value)}
                                       onFocus={handleCountryInputFocus}
                            />
                            {isDropdownOpen && country !== '' && (
                                <div className="dropdown max-h-60 overflow-y-auto mt-2" ref={dropdownRef}>
                                    {countryData.map((country) => (
                                        <div key={country.country}
                                             className="cursor-pointer py-2 px-4 hover:bg-green-100 transition duration-200"
                                             onClick={() => {
                                                 setCountry(country.country);
                                                 setIsDropdownOpen(false);  // Закрываем дропдаун после выбора
                                             }}>
                                            {country.country}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <InputForm inputFormText={t("city")} value={city}
                                       placeholderText={t("placeholderCity")}
                                       onChange={(e) => setCity(e.target.value)}
                                       onFocus={handleCityInputFocus}  // Обрабатываем фокус на поле города
                                       disabled={!country}  // Отключаем поле города, если страна не выбрана
                            />
                            {isDropdownOpen && city !== '' && country && (  // Показываем дропдаун только если выбрана страна
                                <div className="dropdown max-h-60 overflow-y-auto mt-2" ref={dropdownRef}>
                                    {cityData.map((cityItem) => (
                                        <div key={cityItem}
                                             className="cursor-pointer py-2 px-4 hover:bg-green-100 transition duration-200"
                                             onClick={() => {
                                                 setCity(cityItem);
                                                 setIsDropdownOpen(false);  // Закрываем дропдаун после выбора
                                             }}>
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
