import React, {useState, useEffect, useRef} from "react";
import SettingsSection from "@/components/Settings/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import putUpdatePersonalInfo from "@/app/[locale]/api/user/editUser/updatePersonalInfo/putUpdatePersonalInfo";
import axios from "axios";
import {getAvailableLanguages} from "@/app/[locale]/api/staticData/getAvailableLanguages/getAvailableLanguages";
import {getAvailableDisciplines} from "@/app/[locale]/api/staticData/getAvailableDisciplines/getAvailableDisciplines";
import getAvailableGrades from "@/app/[locale]/api/staticData/getAvailableGrades/getAvailableGrades";
import putUpdateProfessionalInfo
    from "@/app/[locale]/api/user/editUser/updateProfessionalInfo/putUpdateProfessionalInfo";
import putUpdateInstitution from "@/app/[locale]/api/user/editUser/updateInstitution/putUpdateInstitution";
import {getUserProfile} from "@/app/[locale]/api/user/getUserProfile/getUserProfile";
import ErrorNotification from "@/components/Error/ErrorNotification";
import Image from "next/image";
import defaultUserImage from '@/components/User/UserInfo/avatar-default.svg';
import putEditUserImage from "@/app/[locale]/api/user/editUser/updateUserImage/putUpdateUserImage";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "../../../../mapping/languagesMapping/languagesMapping.json";
import positionMapping from "../../../../mapping/positionMapping/positionMapping.json"
import {translateItems} from "@/app/[locale]/api/translateItems/translateItems";
import {reverseTranslateItems} from "@/app/[locale]/api/translateItems/reverseTranslateItems";
import Cookies from "js-cookie";
import refreshAccessToken from "@/app/[locale]/api/utils/refreshAccessToken/refreshAccessToken";
import transliterate from "/mapping/transliteration/transliterate"
import {useDebounce} from "use-debounce";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const SettingsProfileInfo = () => {

    //loading

    const [loading, setLoading] = useState(true);

    const toast = useRef(null);

    // locale
    const pathname = usePathname();

    //translation
    const t = useTranslations('SettingsProfileInfo');
    const errorToastTranslations = useTranslations("DialogModal.Error")
    const editUserToastTranslations = useTranslations("DialogModal.EditUser")

    // initial values

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');

    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [responseData, setResponseData] = useState([]);
    const [initialCountry, setInitialCountry] = useState('');

    const [initialCity, setInitialCity] = useState('');
    const [city, setCity] = useState(initialCity);


    // const [country, setCountry] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    // const [city, setCity] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [debouncedCountry] = useDebounce(initialCountry, 300);
    const [debouncedCity] = useDebounce(initialCity, 300);

    const countryDropdownRef = useRef(null);
    const cityDropdownRef = useRef(null);


    const [isTeacher, setIsTeacher] = useState(false);
    const [isExpert, setIsExpert] = useState(false);

    const [institutionName, setInstitutionName] = useState("");
    const [institutionAddress, setInstitutionAddress] = useState("");

    const [initialLanguages, setInitialLanguages] = useState([]);
    const [initialDisciplines, setInitialDisciplines] = useState([]);
    const [initialGrades, setInitialGrades] = useState([]);
    const [initialPosition, setInitialPosition] = useState([])

    const [userAvatar, setUserAvatar] = useState([]);

    const [file, setFile] = useState();

    const [isInstitutionInputActive, setIsInstitutionInputActive] = useState(false);
    const [isCountryInputActive, setIsCountryInputActive] = useState(false);
    const [isCityInputActive, setIsCityInputActive] = useState(false);


    const selectedCountryValue = responseData.find((c) => c.country === country);

    useEffect(() => {
        setCountry(initialCountry);
        setCity(initialCity);
    }, [initialCountry, initialCity]);


    useEffect(() => {
        async function getUserInfo() {
            const userProfile = await getUserProfile();

            console.log(userProfile)

            setFirstName(userProfile.firstName);
            setLastName(userProfile.lastName);
            setDescription(userProfile.description);
            setInitialCountry(userProfile.countryTitle);
            setInitialCity(userProfile.cityTitle)
            setIsTeacher(userProfile.isATeacher);
            setIsExpert(userProfile.isAnExpert);

            setInstitutionName(userProfile.institution.title);
            setInstitutionAddress(userProfile.institution.address);

            setInitialLanguages(translateItems(userProfile.languageTitles, languagesMapping, pathname));
            setInitialDisciplines(translateItems(userProfile.disciplineTitles, disciplinesMapping, pathname));
            setInitialGrades(userProfile.gradeNumbers);

            setUserAvatar(userProfile.imageUrl)

            setTimeout(() => {
                setLoading(false)
            }, 1300);
        }

        getUserInfo()
    }, [])


    // change user photo

    // const [file, setFile] = useState();

    async function getFile(event) {
        // if (!userAvatar) {
        //     toast.current.show({
        //         severity: 'error',
        //         summary: errorToastTranslations("error"),
        //         detail: errorToastTranslations("wentWrong"),
        //         life: 3000
        //     });
        //     return;
        // }
        const selectedFile = event.target.files[0];
        setFile(URL.createObjectURL(selectedFile));
        const updateUserImageSuccess = await putEditUserImage(selectedFile, toast);

        if (updateUserImageSuccess) {
            toast.current.show({
                severity: 'info',
                summary: editUserToastTranslations("success"),
                detail: editUserToastTranslations("avatarUploaded"),
                life: 3000
            });
        }
        // setFile(URL.createObjectURL(selectedFile));
    }

    // teacher/expert
    const position = translateItems(['teacher', 'expert'], positionMapping, pathname);


    useEffect(() => {
        let positions = [];
        if (isTeacher) {
            positions.push("teacher");
        }
        if (isExpert) {
            positions.push("expert");
        }
        setInitialPosition(positions);
    }, [isTeacher, isExpert]);

    const initialPositionArray = translateItems(initialPosition, positionMapping, pathname);


    // console.log(initialPositionArray)
    // console.log(initialDisciplines)


    // // country
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
            fetchLocation();
        } else {
            setCountryData([]);
        }
    }, [debouncedCountry]);

    useEffect(() => {
        if (debouncedCity && country) {
            fetchLocation();
        } else {
            setCityData([]);
        }
    }, [debouncedCity, selectedCountry]);

    async function fetchLocation() {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
            const countriesData = response.data.data;
            setResponseData(countriesData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    // async function fetchLocation(countrySearchText, citySearchText) {
    //     try {
    //         const response = await axios.get(`https://countriesnow.space/api/v0.1/countries`);
    //         const countriesData = response.data.data;
    //         setResponseData(countriesData);
    //
    //         // Логика для стран
    //         if (!countrySearchText) {
    //             setCountryData(countriesData);
    //         } else {
    //             const transliteratedCountrySearch = transliterate(countrySearchText.toLowerCase());
    //             const filteredCountries = countriesData.filter((country) =>
    //                 transliteratedCountrySearch.some((variant) =>
    //                     country.country.toLowerCase().includes(variant)
    //                 )
    //             );
    //             setCountryData(filteredCountries);
    //         }
    //
    //         // Логика для городов
    //         if (countrySearchText && !citySearchText) {
    //             const selectedCountryData = countriesData.find(
    //                 (country) => country.country.toLowerCase() === countrySearchText.toLowerCase()
    //             );
    //             if (selectedCountryData) {
    //                 setCityData(selectedCountryData.cities);
    //             }
    //         } else if (countrySearchText && citySearchText) {
    //             const selectedCountryData = countriesData.find(
    //                 (country) => country.country.toLowerCase() === countrySearchText.toLowerCase()
    //             );
    //             if (selectedCountryData) {
    //                 const transliteratedCitySearch = transliterate(citySearchText.toLowerCase());
    //                 const filteredCities = selectedCountryData.cities.filter((city) =>
    //                     transliteratedCitySearch.some((variant) =>
    //                         city.toLowerCase().includes(variant)
    //                     )
    //                 );
    //                 setCityData(filteredCities);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data', error);
    //     }
    // }

    // const handleCountrySelect = (country) => {
    //     setSelectedCountry(country);
    //     setCountry(country);
    //     setIsCountryInputActive(false);
    //     setCity('');
    //     setCityData([]);
    // };
    //
    // const handleCitySelect = (city) => {
    //     setSelectedCity(city);
    //     setCity(city);
    //     setIsCityInputActive(false);
    // };

    const handleUpdatePersonalInfo = async () => {
        if (!firstName || !lastName || !country || !city) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("emptyFields"),
                life: 3000
            });
            return;
        }

        const updatePersonalInfoSuccess = await putUpdatePersonalInfo(firstName, lastName, country, city, description, isTeacher, isExpert, toast)

        if (updatePersonalInfoSuccess) {
            toast.current.show({
                severity: 'info',
                summary: editUserToastTranslations("success"),
                detail: editUserToastTranslations("personalInfoUploaded"),
                life: 3000
            });
        }

    }


    // institution

    //
    // yandex api organization search

    // const [orgData, setOrgData] = useState([]);

    // const handleUpdateInstitution = async () => {
    //     if (!institutionName) {
    //         toast.current.show({severity: 'error', summary: errorToastTranslations("error"), detail: errorToastTranslations("emptyFields"), life: 3000});
    //         return;
    //     }
    //     console.log(institutionName)
    //     const updateInstitutionSuccess = await putUpdateInstitution(institutionName, toast);
    //
    //     if (updateInstitutionSuccess) {
    //         toast.current.show({
    //             severity: 'info',
    //             summary: editUserToastTranslations("success"),
    //             detail: editUserToastTranslations("institutionUploaded"),
    //             life: 3000
    //         });
    //     }
    // };

    // api search org

    // useEffect(() => {
    //     fetchOrg(institutionName);
    // }, [institutionName])
    //
    // async function fetchOrg(searchText) {
    //     try {
    //         const response = await axios.get(
    //             `https://search-maps.yandex.ru/v1/?text=${searchText}&type=biz&lang=ru_RU&apikey=6d742c7a-847a-40eb-b9a2-ae34493ad1f8`
    //         );
    //         const data = response.data;
    //         setOrgData(data.features);
    //     } catch (error) {
    //         console.log("Error fetching organization data:", error);
    //     }
    // }

    //

    const handleUpdateInstitution = async () => {
        if (!institutionName || !institutionAddress) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("emptyFields"),
                life: 3000
            });
            return;
        }
        console.log(institutionName)
        const updateInstitutionSuccess = await putUpdateInstitution(institutionName, institutionAddress, toast);

        if (updateInstitutionSuccess) {
            toast.current.show({
                severity: 'info',
                summary: editUserToastTranslations("success"),
                detail: editUserToastTranslations("institutionUploaded"),
                life: 3000
            });
        }
    };


// languages

    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        getLanguages()
    }, []);


    async function getLanguages() {
        // const accessToken = localStorage.getItem('accessToken');
        const accessToken = Cookies.get('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(translateItems(availableLanguages, languagesMapping, pathname));
    }

    // disciplines


    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);


    useEffect(() => {
        getDisciplines()
    }, []);


    async function getDisciplines() {
        // const accessToken = localStorage.getItem('accessToken');
        const accessToken = Cookies.get('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(translateItems(availableDisciplines, disciplinesMapping, pathname));
    }


    // grades

    const grades = getAvailableGrades()
    const [selectedGrades, setSelectedGrades] = useState([])

    const handleUpdateProfessionalInfo = async () => {
        if (!selectedLanguages || !selectedDisciplines || !selectedGrades) {
            toast.current.show({
                severity: 'error',
                summary: errorToastTranslations("error"),
                detail: errorToastTranslations("emptyFields"),
                life: 3000
            });
            return;
        }
        console.log(selectedLanguages)

        let languagesToSend = selectedLanguages;
        let disciplinesToSend = selectedDisciplines;

        if (pathname.includes('ru')) {
            languagesToSend = reverseTranslateItems(selectedLanguages.length > 0 ? selectedLanguages : initialLanguages, languagesMapping);
            disciplinesToSend = reverseTranslateItems(selectedDisciplines.length > 0 ? selectedDisciplines : initialDisciplines, disciplinesMapping);
        }

        const updateProfessionalInfoSuccess = await putUpdateProfessionalInfo(
            languagesToSend.length > 0 ? languagesToSend : initialLanguages,
            disciplinesToSend.length > 0 ? disciplinesToSend : initialDisciplines,
            selectedGrades.length > 0 ? selectedGrades : initialGrades,
            toast
        );

        // const updateProfessionalInfoSuccess = await putUpdateProfessionalInfo(
        //     selectedLanguages.length > 0 ? selectedLanguages : initialLanguages,
        //     selectedDisciplines.length > 0 ? selectedDisciplines : initialDisciplines,
        //     selectedGrades.length > 0 ? selectedGrades : initialGrades
        //     , toast);

        if (updateProfessionalInfoSuccess) {
            toast.current.show({
                severity: 'info',
                summary: editUserToastTranslations("success"),
                detail: editUserToastTranslations("professionalUploaded"),
                life: 3000
            });
        }
    }

    return (
        <main className="">
            {/*{loading ? (*/}
            {/*    <div className='flex justify-center items-center h-screen'>*/}
            {/*        <RingLoader*/}
            {/*            color={'#36d7b7'}*/}
            {/*            loading={loading}*/}
            {/*            size={150}*/}
            {/*            aria-label="Loading Spinner"*/}
            {/*            data-testid="loader"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*) : (*/}
            <>
                <div className='section-photo py-8'>
                    <ErrorNotification ref={toast}/>
                    <SettingsSection title={t("profilePhoto")}
                                     details={t("photoDetails")}/>
                    <div className="button group pt-5">
                        <input className='hidden' type="file" onChange={getFile}/>
                        <div className="rounded-full overflow-hidden w-36 h-36">
                            {file ? (
                                <Image
                                    className="w-full h-full object-cover"
                                    src={file}
                                    alt="user-avatar"
                                    width={144}
                                    height={144}
                                    quality={100}
                                />
                            ) : (
                                <Image
                                    className="w-full h-full object-cover"
                                    src={userAvatar || defaultUserImage}
                                    alt="user-avatar"
                                    width={144}
                                    height={144}
                                    quality={100}
                                />
                            )}
                        </div>
                        <div className="">
                            <ApplyButton buttonText={t("replaceBtn")}
                                         onApply={() => document.querySelector('input[type="file"]').click()}/>
                        </div>
                    </div>
                </div>
                <div className='section-aboutMe py-8'>
                    <div className='pb-8'>
                        <SettingsSection title={t("aboutMe")} details={t("aboutMeDetails")}/>
                    </div>
                    <div className='space-y-4'>
                        {/*<div className='flex flex-col md:flex-row justify-between'>*/}
                        <InputForm inputFormText={t("firstName")} value={firstName}
                                   placeholderText={t("placeholderFirstName")}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                        <InputForm inputFormText={t("lastName")} value={lastName}
                                   placeholderText={t("placeholderLastName")}
                                   onChange={(e) => setLastName(e.target.value)}/>
                        {/*</div>*/}
                        <Dropdown
                            dropdownFormText={t("i`m")}
                            options={position}
                            // placeholderText={isTeacher ? "teacher" : (isExpert ? "expert" : "")}
                            placeholderText={initialPositionArray.length > 0 ? initialPositionArray.join(", ") : t("selectPosition")}
                            initialSelectedOptions={initialPositionArray}
                            onChange={(selectedOptions) => {
                                pathname.includes('en') ? setIsTeacher(selectedOptions.includes("teacher")) :
                                    setIsTeacher(selectedOptions.includes("учитель"));
                                pathname.includes('en') ?
                                    setIsExpert(selectedOptions.includes("expert")) :
                                    setIsExpert(selectedOptions.includes("эксперт"));
                            }}
                        />

                        <div className='flex'>
                            {/* country */}
                            <div>
                                <div>{t("country")}</div>
                                <Popover open={countryDropdownOpen} onOpenChange={setCountryDropdownOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={countryDropdownOpen}
                                            className="w-[200px] justify-between"
                                        >
                                            {country || t("placeholderCountry")}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder={t("placeholderCountry")}/>
                                            <CommandList>
                                                <CommandEmpty>No country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {responseData.map((countryItem) => (
                                                        <CommandItem
                                                            key={countryItem.country}
                                                            value={countryItem.country}
                                                            onSelect={(currenValue) => {
                                                                setCountry(currenValue === countryItem.country ? currenValue : "");
                                                                setCity("");
                                                                setInitialCity("");
                                                                setCountryDropdownOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    country === countryItem.country ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {countryItem.country}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Поле для города */}

                            <div className='ml-5'>
                                <div>{t("city")}</div>
                                <Popover open={cityDropdownOpen} onOpenChange={setCityDropdownOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={cityDropdownOpen}
                                            className="justify-between"
                                        >
                                            {city || t("placeholderCity")}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder={t("placeholderCity")}/>
                                            <CommandList>
                                                <CommandEmpty>No city found.</CommandEmpty>
                                                <CommandGroup>
                                                    {selectedCountryValue?.cities.map((cityItem) => (
                                                        <CommandItem
                                                            key={cityItem}
                                                            value={cityItem}
                                                            onSelect={(currenValue) => {
                                                                setCity(currenValue === cityItem ? currenValue : "");
                                                                setCityDropdownOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    city === cityItem ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {cityItem}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        {/*<InputForm*/}
                        {/*    inputFormText={t("country")}*/}
                        {/*    value={country}*/}
                        {/*    placeholderText={t("placeholderCountry")}*/}
                        {/*    onChange={(e) => setCountry(e.target.value)}*/}
                        {/*    // onFocus={() => setIsCountryInputActive(true)}*/}
                        {/*    onFocus={() => {*/}
                        {/*        setIsCountryInputActive(true);*/}
                        {/*        if (!country) {*/}
                        {/*            fetchLocation('', '');*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<div className="relative" ref={countryDropdownRef}>*/}
                        {/*    {isCountryInputActive && (*/}
                        {/*        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">*/}
                        {/*            <div className="cursor-pointer max-h-60 overflow-y-auto mt-2">*/}
                        {/*                {countryData.map((countryItem) => (*/}
                        {/*                    <div*/}
                        {/*                        key={countryItem.country}*/}
                        {/*                        className="cursor-pointer py-4 px-4 hover:bg-green-100 transition duration-200"*/}
                        {/*                        onClick={() => handleCountrySelect(countryItem.country)}*/}
                        {/*                    >*/}
                        {/*                        {countryItem.country}*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}

                        {/*<InputForm*/}
                        {/*    inputFormText={t("city")}*/}
                        {/*    value={city}*/}
                        {/*    placeholderText={t("placeholderCity")}*/}
                        {/*    onChange={(e) => setCity(e.target.value)}*/}
                        {/*    // onFocus={() => {*/}
                        {/*    //     if (!selectedCountry) {*/}
                        {/*    //         toast.current.show({ severity: 'warn', summary: errorToastTranslations("error"), detail: errorToastTranslations("chooseCountry"), life: 3000 });*/}
                        {/*    //     } else {*/}
                        {/*    //         setIsCityInputActive(true);*/}
                        {/*    //     }*/}
                        {/*    // }}*/}
                        {/*    onFocus={() => {*/}
                        {/*        if (!selectedCountry) {*/}
                        {/*            toast.current.show({ severity: 'warn', summary: errorTranslations("error"), detail: errorTranslations("chooseCountry"), life: 3000 });*/}
                        {/*        } else {*/}
                        {/*            setIsCityInputActive(true);*/}
                        {/*            if (!city) {*/}
                        {/*                fetchLocation(selectedCountry, '');*/}
                        {/*            }*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<div className="relative" ref={cityDropdownRef}>*/}
                        {/*    {isCityInputActive && (*/}
                        {/*        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">*/}
                        {/*            <div className="cursor-pointer max-h-60 overflow-y-auto mt-2">*/}
                        {/*                {cityData.map((cityItem) => (*/}
                        {/*                    <div*/}
                        {/*                        key={cityItem}*/}
                        {/*                        className="cursor-pointer py-4 px-4 hover:bg-green-100 transition duration-200"*/}
                        {/*                        onClick={() => handleCitySelect(cityItem)}*/}
                        {/*                    >*/}
                        {/*                        {cityItem}*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}

                        <InputForm inputFormText={t("description")} value={description}
                                   placeholderText={t('descriptionPlaceholder')}
                                   onChange={(e) => setDescription(e.target.value)}
                                   isTextarea={true}
                                   hasMaxLength={true}
                                   maxLength={250}/>
                        <ApplyButton buttonText={t("update")} onApply={handleUpdatePersonalInfo}/>
                    </div>
                </div>
                <div className='section-pos-verif py-8'>
                    <SettingsSection title={t("positionVerification")}
                                     details={t("positionVerificationDetails")}/>
                    {/*api search org*/}

                    {/*<div className='py-8'>*/}
                    {/*    <InputForm inputFormText={t("institutionName")} value={institutionName}*/}
                    {/*               onChange={(e) => setInstitutionName(e.target.value)}*/}
                    {/*               onFocus={() => setIsInstitutionInputActive(true)}/>*/}
                    {/*    <div className="">*/}
                    {/*        {isInstitutionInputActive && institutionName && (*/}
                    {/*            <div className="py-2 max-h-60 overflow-y-auto">*/}
                    {/*                {orgData.map((feature) => (*/}
                    {/*                    <div key={feature.properties.id}*/}
                    {/*                         className="cursor-pointer py-2 px-4 hover:bg-green-100 transition duration-200"*/}
                    {/*                         onClick={() => {*/}
                    {/*                             setInstitutionName(feature.properties.name + '; ' + feature.properties.description);*/}
                    {/*                             setIsInstitutionInputActive(false);*/}
                    {/*                         }}>*/}
                    {/*                        <h2>{feature.properties.name}</h2>*/}
                    {/*                        <p>{feature.properties.description}</p>*/}
                    {/*                    </div>*/}
                    {/*                ))}*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*    <ApplyButton buttonText={t("update")} onApply={handleUpdateInstitution}/>*/}
                    {/*</div>*/}

                    <div className='py-8'>
                        <InputForm inputFormText={t("institutionName")} value={institutionName}
                                   onChange={(e) => setInstitutionName(e.target.value)}
                                   onFocus={() => setIsInstitutionInputActive(true)}
                                   hasMaxLength={true}
                                   maxLength={50}
                                   placeholderText={t("institutionName")}
                        />
                        <InputForm inputFormText={t("institutionAddress")} value={institutionAddress}
                                   onChange={(e) => setInstitutionAddress(e.target.value)}
                                   onFocus={() => setIsInstitutionInputActive(true)}
                                   hasMaxLength={true}
                                   maxLength={50}
                                   placeholderText={t("institutionAddress")}
                        />

                        <ApplyButton buttonText={t("update")} onApply={handleUpdateInstitution}/>
                    </div>
                </div>

                <div className='section-prof-details py-8'>
                    <div className='pb-8'>
                        <SettingsSection title={t("professionalInfo")}
                                         details={t("professionalInfoDetails")}
                        />
                    </div>
                    <div className='space-y-4'>
                        <Dropdown dropdownFormText={t("areasOfWork")}
                                  placeholderText={initialDisciplines.length > 0 ? initialDisciplines.join(", ") : "Select disciplines"}
                                  options={disciplines} initialSelectedOptions={initialDisciplines}
                                  onChange={setSelectedDisciplines}/>
                        <Dropdown dropdownFormText={t("grades")}
                                  placeholderText={initialGrades.length > 0 ? initialGrades.join(", ") : "Select grades"}
                                  options={grades}
                                  initialSelectedOptions={initialGrades}
                                  onChange={setSelectedGrades}/>
                        <Dropdown dropdownFormText={t("languages")}
                                  placeholderText={initialLanguages.length > 0 ? initialLanguages.join(", ") : "Select languages"}
                                  options={languages} initialSelectedOptions={initialLanguages}
                                  onChange={setSelectedLanguages}/>
                        <ApplyButton buttonText={t("update")} onApply={handleUpdateProfessionalInfo}/>
                    </div>
                </div>
            </>
            {/*)}*/}
        </main>
    )
}

export default SettingsProfileInfo
