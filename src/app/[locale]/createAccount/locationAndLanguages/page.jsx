'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { useDebounce } from 'use-debounce';
import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
import ContinueButton from "@/components/Buttons/ContinueButton";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import axios from "axios";
import { getAvailableLanguages } from "@/app/[locale]/api/staticData/getAvailableLanguages/getAvailableLanguages";
import ErrorNotification from "@/components/Error/ErrorNotification";
import { useTranslations } from "next-intl";
import { translateItems } from "@/app/[locale]/api/translateItems/translateItems";
import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import transliterate from "../../../../../mapping/transliteration/transliterate";

export default function LocationAndLanguages() {
    const pathname = usePathname();
    const toast = useRef(null);
    const router = useRouter();

    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    //
    // const [isCountryInputActive, setIsCountryInputActive] = useState(false);
    // const [isCityInputActive, setIsCityInputActive] = useState(false);
    //
    // const [country, setCountry] = useState('');
    // const [selectedCountry, setSelectedCountry] = useState('');
    // const [city, setCity] = useState('');
    // const [selectedCity, setSelectedCity] = useState('');
    // const [countryData, setCountryData] = useState([]);
    // const [cityData, setCityData] = useState([]);


    const t = useTranslations("CreateAccount.LocationAndLanguages");
    const errorTranslations = useTranslations("DialogModal.Error");

    // localStorage.setItem('country', country);
    // localStorage.setItem('city', city);

    // const dropdownRef = useRef(null);  // Ссылка на дропдаун

    const [country, setCountry] = useState('');
    const [debouncedCountry] = useDebounce(country, 300);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [city, setCity] = useState('');
    const [debouncedCity] = useDebounce(city, 300);
    const [selectedCity, setSelectedCity] = useState('');
    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [isCountryInputActive, setIsCountryInputActive] = useState(false);
    const [isCityInputActive, setIsCityInputActive] = useState(false);

    const countryDropdownRef = useRef(null);
    const cityDropdownRef = useRef(null);

    localStorage.setItem('languages', selectedLanguages);
    localStorage.setItem('country', selectedCountry);
    localStorage.setItem('city', selectedCity);

    // close dropdown when outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setIsCountryInputActive(false);
            }
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
                setIsCityInputActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Получение списка стран и городов
    useEffect(() => {
        if (debouncedCountry) {
            fetchLocation(debouncedCountry, '');
        } else {
            // setCountryData([]);
            fetchLocation('', '');
        }
    }, [debouncedCountry]);

    useEffect(() => {
        if (debouncedCity && selectedCountry) {
            fetchLocation(selectedCountry, debouncedCity);
        } else {
            fetchLocation(selectedCountry, '');
        }
    }, [debouncedCity, selectedCountry]);

    async function fetchLocation(countrySearchText, citySearchText) {
        try {
            const response = await axios.get(`https://countriesnow.space/api/v0.1/countries`);
            const countriesData = response.data.data;

            // Логика для стран
            if (!countrySearchText) {
                setCountryData(countriesData);
            } else {
                const transliteratedCountrySearch = transliterate(countrySearchText.toLowerCase());
                const filteredCountries = countriesData.filter((country) =>
                    transliteratedCountrySearch.some((variant) =>
                        country.country.toLowerCase().includes(variant)
                    )
                );
                setCountryData(filteredCountries);
            }

            // Логика для городов
            if (countrySearchText && !citySearchText) {
                const selectedCountryData = countriesData.find(
                    (country) => country.country.toLowerCase() === countrySearchText.toLowerCase()
                );
                if (selectedCountryData) {
                    setCityData(selectedCountryData.cities);
                }
            } else if (countrySearchText && citySearchText) {
                const selectedCountryData = countriesData.find(
                    (country) => country.country.toLowerCase() === countrySearchText.toLowerCase()
                );
                if (selectedCountryData) {
                    const transliteratedCitySearch = transliterate(citySearchText.toLowerCase());
                    const filteredCities = selectedCountryData.cities.filter((city) =>
                        transliteratedCitySearch.some((variant) =>
                            city.toLowerCase().includes(variant)
                        )
                    );
                    setCityData(filteredCities);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        }
    }

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setCountry(country);
        setIsCountryInputActive(false);
        setCity('');
        setCityData([]);
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setCity(city);
        setIsCityInputActive(false);
    };

    //
    // const handleCountrySelect = (country) => {
    //     setSelectedCountry(country);
    //     setCountry(country);
    //     setIsCountryInputActive(false);
    // };
    //
    // const handleCitySelect = (city) => {
    //     setSelectedCity(city);
    //     setCity(city);
    //     setIsCityInputActive(false);
    // };
    //
    // close dropdown when clicl outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setIsDropdownOpen(false);  // Закрываем дропдаун при клике вне его
    //         }
    //     };
    //
    //     if (isDropdownOpen) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     } else {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     }
    //
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isDropdownOpen]);

    useEffect(() => {
        getLanguages();
    }, []);

    // useEffect(() => {
    //     if (country) {  // Проверяем, выбрана ли страна
    //         getLocation(country.toLowerCase(), city.toLowerCase());
    //     }
    // }, [country, city]);
    //
    // async function getLocation(countrySearchText, citySearchText) {
    //     try {
    //         const response = await axios.get(
    //             `https://countriesnow.space/api/v0.1/countries`
    //         );
    //         const countriesData = response.data.data;
    //
    //         // transliteration of search text
    //         const transliteratedCountrySearch = transliterate(countrySearchText.toLowerCase());
    //         const transliteratedCitySearch = transliterate(citySearchText.toLowerCase());
    //
    //         const filteredCountries = countriesData.filter((country) =>
    //             transliteratedCountrySearch.some((variant) =>
    //                 country.country.toLowerCase().includes(variant)
    //             )
    //         );
    //
    //         setCountryData(filteredCountries);
    //
    //         // Фильтрация городов: проверяем совпадение с любым вариантом
    //         if (countrySearchText && filteredCountries.length > 0) {
    //             const filteredCities = filteredCountries.flatMap((country) =>
    //                 country.cities.filter((city) =>
    //                     transliteratedCitySearch.some((variant) =>
    //                         city.toLowerCase().includes(variant)
    //                     )
    //                 )
    //             );
    //             setCityData(filteredCities);
    //         } else {
    //             setCityData([]);  // Очищаем данные городов, если страна не выбрана
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    //
    // const handleCountryInputFocus = () => {
    //     setIsDropdownOpen(true);  // Открываем дропдаун
    // };
    //
    // const handleCityInputFocus = () => {
    //     if (!country) {
    //         toast.current.show({ severity: 'warn', summary: errorTranslations("error"), detail: errorTranslations("chooseCountry"), life: 3000 });
    //     } else {
    //         setIsDropdownOpen(true);  // Открываем дропдаун
    //     }
    // };

    async function getLanguages() {
        // const accessToken = localStorage.getItem('accessToken');
        const accessToken =  Cookies.get('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(translateItems(availableLanguages, languagesMapping, pathname));
    }

    const handleContinue = () => {
        // if (!selectedCountry || !selectedCity || selectedLanguages.length === 0) {
        //     toast.current.show({ severity: 'error', summary: errorTranslations("error"), detail: errorTranslations("emptyFields"), life: 3000 });
        //     return;
        // }
        const isCountryValid = countryData.some(
            (item) => item.country === selectedCountry
        );
        const isCityValid = cityData.includes(selectedCity);

        if (!isCountryValid) {
            toast.current.show({
                severity: 'warn',
                summary: errorTranslations("error"),
                detail: errorTranslations("invalidCountry"),
                life: 3000,
            });
            return;
        }

        if (!isCityValid) {
            toast.current.show({
                severity: 'warn',
                summary: errorTranslations("error"),
                detail:errorTranslations("invalidCity"),
                life: 3000,
            });
            return;
        }

        if (!selectedCountry || !selectedCity || selectedLanguages.length === 0) {
            toast.current.show({
                severity: 'error',
                summary: errorTranslations("error"),
                detail: errorTranslations("emptyFields"),
                life: 3000,
            });
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
                            <InputForm
                                inputFormText={t("country")}
                                value={country}
                                placeholderText={t("placeholderCountry")}
                                onChange={(e) => setCountry(e.target.value)}
                                // onFocus={() => setIsCountryInputActive(true)}
                                onFocus={() => {
                                    setIsCountryInputActive(true);
                                    if (!country) {
                                        fetchLocation('', '');
                                    }
                                }}
                            />
                            <div className="relative" ref={countryDropdownRef}>
                            {isCountryInputActive && (
                                <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
                                    <div className="cursor-pointer max-h-60 overflow-y-auto mt-2">
                                        {countryData.length > 0 ? (
                                            countryData.map((countryItem) => (
                                                <div
                                                    key={countryItem.country}
                                                    className="cursor-pointer py-4 px-4 hover:bg-green-100 transition duration-200"
                                                    onClick={() => handleCountrySelect(countryItem.country)}
                                                >
                                                    {countryItem.country}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="py-4 px-4 text-gray-500">
                                                {t("countryNotFound")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            </div>

                            {/* Поле для города */}
                            <InputForm
                                inputFormText={t("city")}
                                value={city}
                                placeholderText={t("placeholderCity")}
                                onChange={(e) => setCity(e.target.value)}
                                // onFocus={() => {
                                //     if (!selectedCountry) {
                                //         toast.current.show({ severity: 'warn', summary: errorTranslations("error"), detail: errorTranslations("chooseCountry"), life: 3000 });
                                //     } else {
                                //         setIsCityInputActive(true);
                                //     }
                                // }}
                                onFocus={() => {
                                    if (!selectedCountry) {
                                        toast.current.show({ severity: 'warn', summary: errorTranslations("error"), detail: errorTranslations("chooseCountry"), life: 3000 });
                                    } else {
                                        setIsCityInputActive(true);
                                        if (!city) {
                                            fetchLocation(selectedCountry, '');
                                        }
                                    }
                                }}
                            />
                            <div className="relative" ref={cityDropdownRef}>
                            {isCityInputActive && (
                                <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
                                    <div className="cursor-pointer max-h-60 overflow-y-auto mt-2">
                                        {cityData.length > 0 ? (
                                        cityData.map((cityItem) => (
                                            <div
                                                key={cityItem}
                                                className="cursor-pointer py-4 px-4 hover:bg-green-100 transition duration-200"
                                                onClick={() => handleCitySelect(cityItem)}
                                            >
                                                {cityItem}
                                            </div>
                                        ))  ) : (
                                            <div className="py-4 px-4 text-gray-500">
                                                {t("cityNotFound")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            </div>

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




//
// 'use client';
//
// import { useDebounce } from 'use-debounce';
// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from "next/navigation";
// import RegistrationHeader from "@/components/Header/RegistrationHeader/RegistrationHeader";
// import ContinueButton from "@/components/Buttons/ContinueButton";
// import InputForm from "@/components/Inputs/InputForm";
// import axios from "axios";
// import transliterate from "../../../../../mapping/transliteration/transliterate";
//
// export default function LocationAndLanguages() {
//     const [country, setCountry] = useState('');
//     const [debouncedCountry] = useDebounce(country, 300);
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [city, setCity] = useState('');
//     const [debouncedCity] = useDebounce(city, 300);
//     const [selectedCity, setSelectedCity] = useState('');
//     const [countryData, setCountryData] = useState([]);
//     const [cityData, setCityData] = useState([]);
//     const [isCountryInputActive, setIsCountryInputActive] = useState(false);
//     const [isCityInputActive, setIsCityInputActive] = useState(false);
//
//     const countryDropdownRef = useRef(null);
//     const cityDropdownRef = useRef(null);
//
//     // Закрытие дропдаунов при клике вне
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
//                 setIsCountryInputActive(false);
//             }
//             if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
//                 setIsCityInputActive(false);
//             }
//         };
//
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);
//
//     // Получение списка стран и городов
//     useEffect(() => {
//         if (debouncedCountry) {
//             fetchLocation(debouncedCountry, '');
//         } else {
//             setCountryData([]);
//         }
//     }, [debouncedCountry]);
//
//     useEffect(() => {
//         if (debouncedCity && selectedCountry) {
//             fetchLocation(selectedCountry, debouncedCity);
//         } else {
//             setCityData([]);
//         }
//     }, [debouncedCity, selectedCountry]);
//
//     async function fetchLocation(countrySearchText, citySearchText) {
//         try {
//             const response = await axios.get(`https://countriesnow.space/api/v0.1/countries`);
//             const countriesData = response.data.data;
//
//             // Логика для стран
//             if (!countrySearchText) {
//                 setCountryData(countriesData);
//             } else {
//                 const transliteratedCountrySearch = transliterate(countrySearchText.toLowerCase());
//                 const filteredCountries = countriesData.filter((country) =>
//                     transliteratedCountrySearch.some((variant) =>
//                         country.country.toLowerCase().includes(variant)
//                     )
//                 );
//                 setCountryData(filteredCountries);
//             }
//
//             // Логика для городов
//             if (countrySearchText && !citySearchText) {
//                 const selectedCountryData = countriesData.find(
//                     (country) => country.country.toLowerCase() === countrySearchText.toLowerCase()
//                 );
//                 if (selectedCountryData) {
//                     setCityData(selectedCountryData.cities); // Вернуть все города выбранной страны
//                 }
//             } else if (countrySearchText && citySearchText) {
//                 const selectedCountryData = countriesData.find(
//                     (country) => country.country.toLowerCase() === countrySearchText.toLowerCase()
//                 );
//                 if (selectedCountryData) {
//                     const transliteratedCitySearch = transliterate(citySearchText.toLowerCase());
//                     const filteredCities = selectedCountryData.cities.filter((city) =>
//                         transliteratedCitySearch.some((variant) =>
//                             city.toLowerCase().includes(variant)
//                         )
//                     );
//                     setCityData(filteredCities);
//                 }
//             }
//         } catch (error) {
//             console.error('Ошибка при загрузке данных', error);
//         }
//     }
//
//     const handleCountrySelect = (country) => {
//         setSelectedCountry(country);
//         setCountry(country);
//         setIsCountryInputActive(false);
//         setCity(''); // Очистить поле города
//         setCityData([]);
//     };
//
//     const handleCitySelect = (city) => {
//         setSelectedCity(city);
//         setCity(city);
//         setIsCityInputActive(false);
//     };
//
//     return (
//         <main>
//             <div className="inputs w-full">
//                 <div className="my-4">
//                     <InputForm
//                         inputFormText="Страна"
//                         value={country}
//                         placeholderText="Введите страну"
//                         onChange={(e) => setCountry(e.target.value)}
//                         onFocus={() => {
//                             setIsCountryInputActive(true);
//                             if (!country) {
//                                 fetchLocation('', ''); // Запрос списка стран при пустом значении
//                             }
//                         }}
//                     />
//                     <div className="relative" ref={countryDropdownRef}>
//                         {isCountryInputActive && (
//                             <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
//                                 <div className="cursor-pointer max-h-60 overflow-y-auto">
//                                     {countryData.map((countryItem) => (
//                                         <div
//                                             key={countryItem.country}
//                                             className="cursor-pointer py-2 px-4 hover:bg-green-100 transition duration-200"
//                                             onClick={() => handleCountrySelect(countryItem.country)}
//                                         >
//                                             {countryItem.country}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//
//
//                 {/* Поле для города */}
//                 <div className="my-4">
//                     <InputForm
//                         inputFormText="Город"
//                         value={city}
//                         placeholderText="Введите город"
//                         onChange={(e) => setCity(e.target.value)}
//                         onFocus={() => {
//                             if (!selectedCountry) {
//                                 alert('Сначала выберите страну');
//                             } else {
//                                 setIsCityInputActive(true);
//                                 if (!city) {
//                                     fetchLocation(selectedCountry, ''); // Загрузить все города страны
//                                 }
//                             }
//                         }}
//                     />
//                     <div className="relative" ref={cityDropdownRef}>
//                         {isCityInputActive && (
//                             <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
//                                 <div className="cursor-pointer max-h-60 overflow-y-auto">
//                                     {cityData.map((cityItem, index) => (
//                                         <div
//                                             key={`${cityItem}-${index}`}
//                                             className="cursor-pointer py-2 px-4 hover:bg-green-100 transition duration-200"
//                                             onClick={() => handleCitySelect(cityItem)}
//                                         >
//                                             {cityItem}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//
//             </div>
//         </main>
//     );
// }
