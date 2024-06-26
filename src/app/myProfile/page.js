'use client';

import React, { useState,useEffect } from "react";
import Header from "@/components/Header/Header";
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import CreateClassModal from "@/components/СreateClass/CreateClassModal";
import {getUserProfile} from "@/app/api/getUserProfile/getUserProfile";
import axios from "axios";
import {getAvailableLanguages} from "@/app/api/getAvailableLanguages/getAvailableLanguages";
import Banner from "@/components/Banner/Banner";
import putBannerImage from "@/app/putBanner/putBannerImage";

export default function MyProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClass = () => {
        setIsModalOpen(true);
    };

    const handleCreateClass = () => {
        setIsModalOpen(false);
    };


    const [classData, setClassData] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken)
        console.log(userProfile);

        setClassData(userProfile.classDtos)
    }

    const [banner, setBanner] = useState(null);


    return (
        <main className="">
            <Header/>
            <Banner/>
            <div className='flex flex-col sm:flex-row p-4 md:p-28'>
                <UserInfo/>
                <div className='classesContainer mt-12 flex flex-col gap-12 sm:ml-0 lg:ml-28 sm:mr-0 lg:mr-28 '>
                    <div className='clsCntHeader flex justify-between'>
                        <div className=''>Classes</div>
                        <div className='text-green-700 cursor-pointer' onClick={handleAddClass}>
                            + Add class
                        </div>
                    </div>
                    <div className='clsCntMain sm:grid grid-cols-2 gap-4 flex flex-col'>
                        {classData.map((defaultClass) => (
                            <div key={defaultClass.classId}>
                                <ClassPreview classId={defaultClass.classId}
                                              title={defaultClass.title}
                                              username={defaultClass.userFullName}
                                              tags={defaultClass.disciplines}
                                              photo={defaultClass.imageUrl}
                                              showDropdown={true}
                                ></ClassPreview>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <CreateClassModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onCreateClass={handleCreateClass}
                />
            )}

        </main>
    );
}