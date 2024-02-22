'use client';

import React, {useEffect, useState} from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
import axios from "axios";
import Link from "next/link";

const UserInfo = () => {

    const [firstname, setFirstname] = useState('');
    localStorage.setItem('userName', firstname)
    const [lastname, setLastname] = useState('');
    const [languageTitles, setLanguageTitles] = useState([]);
    const [userDescription, setUserDescription] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [institution, setInstitution] = useState('');
    const [disciplineTitles, setDisciplineTitles] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get(
                "http://localhost:7280/api/User/get-userprofile",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            console.log(response);
            console.log(response.data.value.languageTitles);


            setFirstname(response.data.value.firstName);
            setLastname(response.data.value.lastName)
            setLanguageTitles(response.data.value.languageTitles);
            setUserDescription(response.data.value.description);
            setCountry(response.data.value.countryTitle);
            setCity(response.data.value.cityTitle);
            setInstitution(response.data.value.institution.title);
            setDisciplineTitles(response.data.value.disciplineTitles);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='sm:w-1/3 flex flex-col gap-3'>
            <div className='avatar'></div>
            <div className='username text-4xl whitespace-pre-line'>{firstname} {lastname}</div>
            <div className='raiting'></div>
            <div className="languages">Speaks {languageTitles.join(", ")}</div>
            <div className='aboutUser '>{userDescription}</div>
            <div className='country'>{city}, {country}</div>
            <div className='time'>14:10 local time</div>
            <div className='w-full'><EditProfileButton/></div>
            <div className="show-experts flex items-center">
                <Switch/>
                <span className="pl-2 sm:pl-4">Available as an expert</span>
            </div>
            <div className='flex justify-between'>
                <div>Position</div>
                <div className='text-green-800'>Verify</div>
            </div>
            <div className='location'>{institution}</div>
            <div className='tags flex flex-wrap gap-2'>
                {disciplineTitles.map((title) => (
                    <Tag key={title} text={title}></Tag>
                ))}
            </div>
        </div>);
};

export default UserInfo;