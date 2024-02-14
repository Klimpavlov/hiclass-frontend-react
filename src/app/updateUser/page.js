'use client';

import React, {useState} from "react";
import Header from "@/components/Header/Header";
import BackButton from "@/components/Buttons/BackButton";
import SettingsProfileInfo from "@/components/SettingsProfileInfo/SettingsProfileInfo";
import SettingsLogSec from "@/components/SettingsLog&Sec/SettingsLog&Sec";


export default function EditProfile() {

    const [selectedFilter, setSelectedFilter] = useState('profile')

    const handleSelectedFilter = (section) => {
        setSelectedFilter(section)
    }


    let content;

    if (selectedFilter === "profile") {
        content = <SettingsProfileInfo/>;
    } else if (selectedFilter === "security") {
        content = <SettingsLogSec/>;
    }


    return (
        <main>
            <Header/>
            <div className='p-4 md:p-28'>
                <div className='button&filters pb-10'>
                    <BackButton/>
                    <div className='py-4 md:py-10 text-2xl md:text-4xl font-normal'>Settings</div>
                    <div className='filters text-base font-medium'>
                        <span
                            className={`${
                                selectedFilter === "profile" ? "text-green-700" : ""
                            } cursor-pointer`}
                            onClick={() => handleSelectedFilter("profile")}
                        >
              Profile info
            </span>
                        <span
                            className={`${
                                selectedFilter === "security" ? "text-green-700" : ""
                            } pl-6 cursor-pointer`}
                            onClick={() => handleSelectedFilter("security")}
                        >
              Login & Security
            </span>
                    </div>
                </div>
                <div className='main-content py-4 md:py-8 border rounded border-gray-200'>
                    <div className='w-full md:w-2/3 px-8'>
                        {content}
                    </div>
                </div>
            </div>
        </main>
    )
}