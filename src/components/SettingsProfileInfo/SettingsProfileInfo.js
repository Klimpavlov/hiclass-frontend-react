import React, {useState, useEffect} from "react";
import SettingsSection from "@/components/SettingsSection/SettingsSection";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import putUpdatePersonalInfo from "@/app/updateUser/updatePersonalInfo/putUpdatePersonalInfo";
import axios from "axios";
import SearchInput from "@/components/Inputs/SearchInput";
import {getAvailableLanguages} from "@/app/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";

const SettingsProfileInfo = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [cityTitle, setCityTitle] = useState('');


    const handleUpdatePersonalInfo = () => {
        putUpdatePersonalInfo(firstName, lastName, description)
    }

    useEffect(() => {
        getCountries()
    }, []);


    async function getCountries() {
        // const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get(
                "https://countriesnow.space/api/v0.1/countries",
                // {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`
                //     }
                // }
            );
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    // async function getCountries(searchText) {
    //         try {
    //             const response = await fetch(
    //                 `https://countriesnow.space/api/v0.1/countries`
    //             );
    //             const data = await response.json();
    //             // Обработка полученных данных
    //             console.log(data);
    //         } catch (error) {
    //             console.log('Error fetching organization data:', error);
    //         }
    //     }
    //
    // useEffect(() => {
    //     getCountries(cityTitle);
    // }, [cityTitle]);



    const [institutionName, setInstitutionName] = useState("");
    const [orgData, setOrgData] = useState([]);

    const handleUpdateInstitution = () => {

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
                    <Dropdown dropdownFormText='I’m a/am'/>
                    <InputForm inputFormText='Location' value={cityTitle}
                               onChange={(e) => setCityTitle(e.target.value)}/>
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
                        <div key={feature.properties.id}>
                            <h2>{feature.properties.name}</h2>
                            <p>{feature.properties.description}</p>
                        </div>
                    ))}
                    <ApplyButton buttonText='Update'/>
                    {/*<ClearAllButton buttonText='Update'/>*/}
                </div>
            </div>
            <div className='section-prof-details py-8'>
                <SettingsSection title='Professional details'
                                 details='Lorem ipsum dolor sit amet consectetur. Euismod nunc cursus risus at egestas. Nec mi.'
                />
                <div className='py-8'>
                    <Dropdown dropdownFormText='Areas of work' options={disciplines}/>
                    <Dropdown dropdownFormText='Grades' options={grades}/>
                    <Dropdown dropdownFormText='Languages' options={languages}/>
                    <ApplyButton buttonText='Update'/>
                </div>
            </div>
        </>
    )
}

export default SettingsProfileInfo