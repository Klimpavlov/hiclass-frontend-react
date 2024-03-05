import React, {useState, useEffect} from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import putUpdatePersonalInfo from "@/app/updateUser/updatePersonalInfo/putUpdatePersonalInfo";
import axios from "axios";
import {getAvailableLanguages} from "@/app/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";
import putUpdateProfessionalInfo from "@/app/updateUser/updateProfessionalInfo/putUpdateProfessionalInfo";
import putUpdateInstitution from "@/app/updateUser/updateInstitution/putUpdateInstitution";

const SettingsProfileInfo = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);
    const [isExpert, setIsExpert] = useState(false);

    const handleUpdatePersonalInfo = () => {
        // console.log(selectedPosition)
        putUpdatePersonalInfo(firstName, lastName, country, description, isTeacher, isExpert)
    }


    // teacher/expert

    const position = ['teacher', 'expert'];


    // country

    const [country, setCountry] = useState('');
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        getCountries(country.toLowerCase());
    }, [country]);


    async function getCountries(searchText) {
        try {
            if (searchText === '') {
                setCountryData([]);
                return;
            }
            const response = await axios.get(
                `https://countriesnow.space/api/v0.1/countries`
            );
            const countriesData = response.data.data;

            const filteredCountries = countriesData.filter((country) =>
                country.country.toLowerCase().includes(searchText.toLowerCase())
            );

            setCountryData(filteredCountries);
        } catch (error) {
            console.error(error);
        }
    }

    // institution

    const [institutionName, setInstitutionName] = useState("");
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
        putUpdateProfessionalInfo(selectedLanguages, selectedDisciplines, selectedGrades)
        console.log(selectedDisciplines)
    }



    return (
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
                        onChange={(selectedOptions) => {
                            setIsTeacher(selectedOptions.includes("teacher"));
                            setIsExpert(selectedOptions.includes("expert"));
                        }}
                    />                    <InputForm inputFormText='Location' value={country}
                               onChange={(e) => setCountry(e.target.value)}/>
                    {country !== '' && (
                        <div>
                            {countryData.map((country) => (
                                <div key={country} onClick={() => setCountry(country.country)}>
                                    {country.country}
                                </div>
                            ))}
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
                    {orgData.map((feature) => (
                        <div key={feature.properties.id}
                             onClick={() => setInstitutionName(feature.properties.name + ';' + feature.properties.description)}>
                            <h2>{feature.properties.name}</h2>
                            <p>{feature.properties.description}</p>
                        </div>
                    ))}
                    <ApplyButton buttonText='Update' onApply={handleUpdateInstitution}/>
                    {/*<ClearAllButton buttonText='Update'/>*/}
                </div>
            </div>
            <div className='section-prof-details py-8'>
                <SettingsSection title='Professional details'
                                 details='Lorem ipsum dolor sit amet consectetur. Euismod nunc cursus risus at egestas. Nec mi.'
                />
                <div className='py-8'>
                    <Dropdown dropdownFormText='Areas of work' options={disciplines} onChange={setSelectedDisciplines} />
                    <Dropdown dropdownFormText='Grades' options={grades} onChange={setSelectedGrades}/>
                    <Dropdown dropdownFormText='Languages' options={languages} onChange={setSelectedLanguages}/>
                    <ApplyButton buttonText='Update' onApply={handleUpdateProfessionalInfo}/>
                </div>
            </div>
        </>
    )
}

export default SettingsProfileInfo