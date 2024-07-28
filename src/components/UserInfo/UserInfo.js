'use client';

import React, {useEffect, useState} from "react";
import EditProfileButton from "@/components/Buttons/EditProfileButton";
import Switch from "@/components/Buttons/SwitchButton";
import Tag from "@/components/Tags/Tag";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import {useTranslations} from "next-intl";
import imgLocalCountry from "@/components/UserInfo/pinCountry.svg"
import imgLocalTime from "@/components/UserInfo/localTime.svg"
import imgInstitution from "@/components/UserInfo/institutionAddress.svg"
import imgLightning from "@/components/UserInfo/lightning.svg"
import disciplinesMapping from "/mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
import {usePathname} from "next/navigation";
const UserInfo = () => {
    const pathname = usePathname();

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
    const [localTime, setLocalTime] = useState('');
    const [isExpert, setIsExpert] = useState('')

    console.log(isExpert)

    useEffect(() => {
        getUser();
        const interval = setInterval(() => {
            setLocalTime(getLocalTime());
        }, 60000);

        setLocalTime(getLocalTime());

        return () => clearInterval(interval);
    }, []);

    async function getUser() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken);
        console.log(userProfile);

        setFirstname(userProfile.firstName);
        setLastname(userProfile.lastName);
        // setLanguageTitles(translateLanguages(userProfile.languageTitles));
        setLanguageTitles(translateUserInfo(userProfile.languageTitles, languagesMapping));
        setUserDescription(userProfile.description);
        setCountry(userProfile.countryTitle);
        setCity(userProfile.cityTitle);
        setInstitution(userProfile.institution.title + ', ' + userProfile.institution.address);
        // setDisciplineTitles(translateDisciplines(userProfile.disciplineTitles));
        setDisciplineTitles(translateUserInfo(userProfile.disciplineTitles, disciplinesMapping));

        setIsExpert(userProfile.isAnExpert);

        setUserAvatar(userProfile.imageUrl);
    }

    const translateUserInfo = (items, mappingFile) => {
        if (pathname.includes('ru')){
            return items.map(item => Object.keys(mappingFile).find(key => mappingFile[key] === item) || item)
        }
        return items;
    }

    // local time

    const getLocalTime = () => {
        const date = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Intl.DateTimeFormat([], options).format(date);
    };

    // translation

    const t = useTranslations("UserInfo");

    return (
        <div className="sm:w-1/3 flex flex-col gap-3">
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
            {isExpert === true && (
                <div className='flex'>
                    <div className='flex border rounded-xl border-cyan-600 py-1 px-2 my-6 w-auto'>
                        <Image src={imgLightning} alt={imgLightning}/>
                        <div className='ml-2 text-sky-800'>{t('availableAsAnExpert')}</div>
                    </div>
                </div>
            )}
            <div className='username text-4xl whitespace-pre-line'>{firstname} {lastname}</div>
            <div className='raiting'></div>
            <div className="languages">
                {/*Speaks {languageTitles.join(", ")}*/}
                {t("speaks", {languages: languageTitles.join(", ")})}
            </div>
            <div className='aboutUser '>{userDescription}</div>
            <div className='localCountry-container flex'>
                <Image src={imgLocalCountry} alt={country}/>
                <div className='country ml-2'>{city}, {country}</div>
            </div>
            <div className='localTime-container flex'>
                <Image src={imgLocalTime} alt={localTime}/>
                <div className='time ml-2'>{localTime} {t("localTime")}</div>
            </div>
            <div className='w-full'>
                <EditProfileButton buttonText={t("editProfileBtn")}/>
            </div>
            {/*<div className="show-experts flex items-center py-3">*/}
            {/*    <Switch isExpert={isExpert}/>*/}
            {/*    <span className="pl-2 sm:pl-4">{t('availableAsAnExpert')}</span>*/}
            {/*</div>*/}
            <div className='flex justify-between'>
                <div>Position</div>
                <div className='text-green-800'>Verify</div>
            </div>
            <div className='institutionAddress-container flex'>
                <Image src={imgInstitution} alt={institution}/>
                <div className='location ml-2'>{institution}</div>
            </div>
            <div className='tags flex flex-wrap gap-2'>
                {disciplineTitles.map((title) => (
                    <Tag key={title} text={title}></Tag>
                ))}
            </div>
        </div>
    );
};

export default UserInfo;
