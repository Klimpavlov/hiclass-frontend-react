'use client';

import React, {useEffect, useState} from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";

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

    const [userAvatar, setUserAvatar] = useState([]);


    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken)
        console.log(userProfile);

        setFirstname(userProfile.firstName);
        setLastname(userProfile.lastName)
        setLanguageTitles(userProfile.languageTitles);
        setUserDescription(userProfile.description);
        setCountry(userProfile.countryTitle);
        setCity(userProfile.cityTitle);
        setInstitution(userProfile.institution.title);
        setDisciplineTitles(userProfile.disciplineTitles);

        setUserAvatar(userProfile.imageUrl)

    }

    return (
        <div className="sm:w-1/3 flex flex-col gap-3">
            {/*<div className="avatar-container">*/}
            {/*    <Image*/}
            {/*        className="rounded-full w-36 h-36"*/}
            {/*        src={userAvatar}*/}
            {/*        alt="user-avatar"*/}
            {/*        width={200}*/}
            {/*        height={200}*/}
            {/*    />*/}
            {/*</div>*/}
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
        </div>
    );
};

export default UserInfo;