import React, {useState, useEffect, useRef} from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import putUpdatePersonalInfo from "@/app/[locale]/updateUser/updatePersonalInfo/putUpdatePersonalInfo";
import axios from "axios";
import {getAvailableLanguages} from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import getAvailableGrades from "@/app/[locale]/api/getAvailableGrades/getAvailableGrades";
import putUpdateProfessionalInfo from "@/app/[locale]/updateUser/updateProfessionalInfo/putUpdateProfessionalInfo";
import putUpdateInstitution from "@/app/[locale]/updateUser/updateInstitution/putUpdateInstitution";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import {RingLoader} from "react-spinners";
import ErrorNotification from "@/components/Error/ErrorNotification";
import Image from "next/image";
import putBannerImage from "@/app/[locale]/putBanner/putBannerImage";
import imgSrc from "@/components/Banner/Banner.jpg";
import putEditUserImage from "@/app/[locale]/updateUser/updateUserImage/putUpdateUserImage";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import disciplinesMapping from "../../../mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "../../../mapping/languagesMapping/languagesMapping.json";
import {translateItems} from "@/app/[locale]/translateItems/translateItems";
import {reverseTranslateItems} from "@/app/[locale]/translateItems/reverseTranslateItems";

const SettingsProfileInfo = () => {

    //loading

    const [loading, setLoading] = useState(true);

    const toast = useRef(null);

    // locale
    const pathname = usePathname();


    // initial values

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);
    const [isExpert, setIsExpert] = useState(false);

    const [institutionName, setInstitutionName] = useState("");

    const [initialLanguages, setInitialLanguages] = useState([]);
    const [initialDisciplines, setInitialDisciplines] = useState([]);
    const [initialGrades, setInitialGrades] = useState([]);
    const [initialPosition, setInitialPosition] = useState([])

    const [userAvatar, setUserAvatar] = useState([]);

    useEffect(() => {
        async function getUserInfo() {
            const userProfile = await getUserProfile();

            console.log(userProfile)

            setFirstName(userProfile.firstName);
            setLastName(userProfile.lastName);
            setDescription(userProfile.description);
            setCountry(userProfile.countryTitle);
            setCity(userProfile.cityTitle)
            setIsTeacher(userProfile.isATeacher);
            setIsExpert(userProfile.isAnExpert);

            setInstitutionName(userProfile.institution.title)

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
        if (!userAvatar) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
            return;
        }
        const selectedFile = event.target.files[0];

        const updateUserImageSuccess = await putEditUserImage(selectedFile, toast);

        if (updateUserImageSuccess) {
            toast.current.show({
                severity: 'info',
                summary: 'Success',
                detail: 'User avatar is updated',
                life: 3000
            });
        }
        // setFile(URL.createObjectURL(selectedFile));
    }

    // teacher/expert
    const position = ['teacher', 'expert'];
    // const positionTranslation = useTranslations('Position');


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

    const initialPositionArray = initialPosition;


    // console.log(initialPositionArray)
    // console.log(initialDisciplines)


    // country

    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);

    useEffect(() => {
        getCountries(country.toLowerCase(), city.toLowerCase());
    }, [country, city]);

    async function getCountries(countrySearchText, citySearchText) {
        try {
            if (countrySearchText === '') {
                setCountryData([]);
                return;
            }
            if (citySearchText === '') {
                setCityData([]);
                return;
            }
            const response = await axios.get(
                'https://countriesnow.space/api/v0.1/countries'
            );
            const countriesData = response.data.data;

            const filteredCountries = countriesData.filter((country) =>
                country.country.toLowerCase().includes(countrySearchText)
            );

            setCountryData(filteredCountries);

            const filteredCities = filteredCountries.flatMap((country) =>
                country.cities.filter((city) =>
                    city.toLowerCase().includes(citySearchText)
                )
            );
            setCityData(filteredCities);
            console.log(filteredCities);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdatePersonalInfo = async () => {
        if (!firstName || !lastName || !country || !city) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000});
            return;
        }

        const updatePersonalInfoSuccess = await putUpdatePersonalInfo(firstName, lastName, country, city, description, isTeacher, isExpert, toast)

        if (updatePersonalInfoSuccess) {
            toast.current.show({
                severity: 'info',
                summary: 'Success',
                detail: 'Personal information updated',
                life: 3000
            });
        }

    }


    // institution

    const [orgData, setOrgData] = useState([]);

    const handleUpdateInstitution = async () => {
        if (!institutionName) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000});
            return;
        }
        const updateInstitutionSuccess = await putUpdateInstitution(institutionName, toast);

        if (updateInstitutionSuccess) {
            toast.current.show({
                severity: 'info',
                summary: 'Success',
                detail: 'Institution information updated',
                life: 3000
            });
        }
    };

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


// languages

    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    useEffect(() => {
        getLanguages()
    }, []);


    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
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
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(translateItems(availableDisciplines, disciplinesMapping, pathname));
    }


    // grades

    // const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const grades = getAvailableGrades()
    const [selectedGrades, setSelectedGrades] = useState([])

    const handleUpdateProfessionalInfo = async () => {
        if (!selectedLanguages || !selectedDisciplines || !selectedGrades) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000});
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
                summary: 'Success',
                detail: 'Professional information updated',
                life: 3000
            });
        }
    }


    //translation

    const t = useTranslations('SettingsProfileInfo');

    return (
        <main className="">
            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <RingLoader
                        color={'#36d7b7'}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
                    <div className='section-photo py-8'>
                        <ErrorNotification ref={toast}/>
                        <SettingsSection title={t("profilePhoto")}
                                         details={t("photoDetails")}/>
                        <div className="button group pt-5">
                            <input className='hidden' type="file" onChange={getFile}/>
                            {userAvatar ? (
                                <div className="rounded-full overflow-hidden w-36 h-36">
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={userAvatar}
                                        alt="user-avatar"
                                        width={144}
                                        height={144}
                                        quality={100}
                                    />
                                </div>
                            ) : (
                                <div className="rounded-full overflow-hidden w-36 h-36">
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={imgSrc}
                                        alt="default user-avatar"
                                        width={144}
                                        height={144}
                                        quality={100}
                                    />
                                </div>
                            )}
                            <div className="">
                                <ApplyButton buttonText={t("replaceBtn")}
                                             onApply={() => document.querySelector('input[type="file"]').click()}/>
                            </div>
                        </div>
                    </div>
                    <div className='section-aboutMe py-8'>
                        <SettingsSection title={t("aboutMe")} details={t("aboutMeDetails")}/>
                        <div className='py-8'>
                            {/*<div className='flex flex-col md:flex-row justify-between'>*/}
                                <InputForm inputFormText={t("firstName")} value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                <InputForm inputFormText={t("lastName")} value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                            {/*</div>*/}
                            <Dropdown
                                dropdownFormText={t("i`m")}
                                options={position}
                                // placeholderText={isTeacher ? "teacher" : (isExpert ? "expert" : "")}
                                placeholderText={initialPositionArray.length > 0 ? initialPositionArray.join(", ") : "Select position"}
                                initialSelectedOptions={initialPositionArray}
                                onChange={(selectedOptions) => {
                                    setIsTeacher(selectedOptions.includes("teacher"));
                                    setIsExpert(selectedOptions.includes("expert"));
                                }}
                            />
                            <InputForm inputFormText={t("country")} value={country}
                                       onChange={(e) => setCountry(e.target.value)}/>
                            {country !== '' && (
                                <div className="">
                                    <div className="cursor-pointer py-2 max-h-60 overflow-y-auto">
                                        {countryData.map((country) => (
                                            <div key={country} onClick={() => setCountry(country.country)}>
                                                {country.country}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <InputForm inputFormText={t("city")} value={city}
                                       onChange={(e) => setCity(e.target.value)}/>
                            {city !== '' && (
                                <div className="">
                                    <div className="cursor-pointer py-2 max-h-60 overflow-y-auto">
                                        {cityData.map((cityItem) => (
                                            <div key={cityItem} onClick={() => setCity(cityItem)}>
                                                {cityItem}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <InputForm inputFormText={t("description")} value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                            <ApplyButton buttonText={t("update")} onApply={handleUpdatePersonalInfo}/>
                        </div>
                    </div>
                    <div className='section-pos-verif py-8'>
                        <SettingsSection title={t("positionVerification")}
                                         details={t("positionVerificationDetails")}/>
                        <div className='py-8'>
                            <InputForm inputFormText={t("institutionName")} value={institutionName}
                                       onChange={(e) => setInstitutionName(e.target.value)}/>
                            <div className="">
                                <div className="py-2 max-h-60 overflow-y-auto">
                                    {orgData.map((feature) => (
                                        <div key={feature.properties.id}
                                             className='cursor-pointer py-2 max-h-60 overflow-y-auto'
                                             onClick={() => setInstitutionName(feature.properties.name + ';' + feature.properties.description)}>
                                            <h2>{feature.properties.name}</h2>
                                            <p>{feature.properties.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ApplyButton buttonText={t("update")} onApply={handleUpdateInstitution}/>
                            {/*<ClearAllButton buttonText='Update'/>*/}
                        </div>
                    </div>
                    <div className='section-prof-details py-8'>
                        <SettingsSection title={t("professionalInfo")}
                                         details={t("professionalInfoDetails")}
                        />
                        <div className='py-8'>
                            <Dropdown dropdownFormText={t("areasOfWork")}
                                      placeholderText={initialDisciplines.length > 0 ? initialDisciplines.join(", ") : "Select disciplines"}
                                      options={disciplines} initialSelectedOptions={initialDisciplines} onChange={setSelectedDisciplines}/>
                            <Dropdown dropdownFormText={t("grades")}
                                      placeholderText={initialGrades.length > 0 ? initialGrades.join(", ") : "Select grades"}
                                      options={grades}
                                      initialSelectedOptions={initialGrades}
                                      onChange={setSelectedGrades}/>
                            <Dropdown dropdownFormText={t("languages")}
                                      placeholderText={initialLanguages.length > 0 ? initialLanguages.join(", ") : "Select languages"}
                                      options={languages}  initialSelectedOptions={initialLanguages} onChange={setSelectedLanguages}/>
                            <ApplyButton buttonText={t("update")} onApply={handleUpdateProfessionalInfo}/>
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}

export default SettingsProfileInfo