import React, {useState, useEffect} from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import putUpdatePersonalInfo from "@/app/[locale]/updateUser/updatePersonalInfo/putUpdatePersonalInfo";
import axios from "axios";
import {getAvailableLanguages} from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import putUpdateProfessionalInfo from "@/app/[locale]/updateUser/updateProfessionalInfo/putUpdateProfessionalInfo";
import putUpdateInstitution from "@/app/[locale]/updateUser/updateInstitution/putUpdateInstitution";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import {RingLoader} from "react-spinners";

const SettingsProfileInfo = () => {

    //loading

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        async function getUserInfo() {
            const accessToken = localStorage.getItem('accessToken');
            const userProfile = await getUserProfile(accessToken);

            console.log(userProfile)

            setFirstName(userProfile.firstName);
            setLastName(userProfile.lastName);
            setDescription(userProfile.description);
            setCountry(userProfile.countryTitle);
            setCity(userProfile.cityTitle)
            setIsTeacher(userProfile.isATeacher);
            setIsExpert(userProfile.isAnExpert);

            setInstitutionName(userProfile.institution.title)

            setInitialLanguages(userProfile.languageTitles);
            setInitialDisciplines(userProfile.disciplineTitles);
            setInitialGrades(userProfile.gradeNumbers);

            setTimeout(() => {
                setLoading(false)
            }, 1300);
        }

        getUserInfo()
    }, [])


    // teacher/expert

    const position = ['teacher', 'expert'];


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

    const handleUpdatePersonalInfo = () => {
        // console.log(selectedPosition)
        putUpdatePersonalInfo(firstName, lastName, country, city, description, isTeacher, isExpert)
    }


    // institution

    // const [institutionName, setInstitutionName] = useState("");
    const [orgData, setOrgData] = useState([]);

    const handleUpdateInstitution = () => {
        putUpdateInstitution(institutionName)
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
        setLanguages(availableLanguages);
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
        setDisciplines(availableDisciplines);
    }


    // grades

    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [selectedGrades, setSelectedGrades] = useState([])

    const handleUpdateProfessionalInfo = () => {
        putUpdateProfessionalInfo(
            selectedLanguages.length > 0 ? selectedLanguages : initialLanguages,
            selectedDisciplines.length > 0 ? selectedDisciplines : initialDisciplines,
            selectedGrades.length > 0 ? selectedGrades : initialGrades
        );
    }


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
                    <div className='section-photo'>
                        <SettingsSection title='Profile photo'
                                         details='Your photo appears on your Profile page and is visible for Brands on your profile preview
                                                  Recommended size: Square, at least 1000 pixels per side. File type: JPG, PNG or GIF.'/>
                        <div className='change photo'>
                            <div className='photo'></div>
                            <div className='changephotoBtn'></div>
                        </div>
                    </div>
                    <div className='section-aboutMe py-8'>
                        <SettingsSection title='About me' details='Add a brief description for your profile'/>
                        <div className='py-8'>
                            <div className='flex flex-col md:flex-row justify-between'>
                                <InputForm inputFormText='First name' value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                <InputForm inputFormText='Last name' value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                            </div>
                            <Dropdown
                                dropdownFormText="I’m a/am"
                                options={position}
                                placeholderText={isTeacher ? "teacher" : (isExpert ? "expert" : "")}
                                onChange={(selectedOptions) => {
                                    setIsTeacher(selectedOptions.includes("teacher"));
                                    setIsExpert(selectedOptions.includes("expert"));
                                }}
                            />
                            <InputForm inputFormText='Country' value={country}
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
                            <InputForm inputFormText='City' value={city}
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
                            <InputForm inputFormText="Description" value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                            <ApplyButton buttonText='Update' onApply={handleUpdatePersonalInfo}/>
                        </div>
                    </div>
                    <div className='section-pos-verif py-8'>
                        <SettingsSection title='Position verification'
                                         details='For your security, we need you to verify your identity'/>
                        <div className='py-8'>
                            <InputForm inputFormText='Institution name' value={institutionName}
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
                            <ApplyButton buttonText='Update' onApply={handleUpdateInstitution}/>
                            {/*<ClearAllButton buttonText='Update'/>*/}
                        </div>
                    </div>
                    <div className='section-prof-details py-8'>
                        <SettingsSection title='Professional details'
                                         details='Lorem ipsum dolor sit amet consectetur. Euismod nunc cursus risus at egestas. Nec mi.'
                        />
                        <div className='py-8'>
                            <Dropdown dropdownFormText='Areas of work'
                                      placeholderText={initialDisciplines.length > 0 ? initialDisciplines.join(", ") : "Select disciplines"}
                                      options={disciplines} onChange={setSelectedDisciplines}/>
                            <Dropdown dropdownFormText='Grades'
                                      placeholderText={initialGrades.length > 0 ? initialGrades.join(", ") : "Select grades"}
                                      options={grades}
                                      onChange={setSelectedGrades}/>
                            <Dropdown dropdownFormText='Languages'
                                      placeholderText={initialLanguages.length > 0 ? initialLanguages.join(", ") : "Select languages"}
                                      options={languages} onChange={setSelectedLanguages}/>
                            <ApplyButton buttonText='Update' onApply={handleUpdateProfessionalInfo}/>
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}

export default SettingsProfileInfo