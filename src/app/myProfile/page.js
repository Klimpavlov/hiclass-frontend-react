'use client';

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection"
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import CreateClassModal from "@/components/СreateClass/CreateClassModal";

export default function MyProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createdClasses, setCreatedClasses] = useState([]);

    const handleAddClass = () => {
        setIsModalOpen(true);
    };

    const handleCreateClass = (newClass) => {
        setCreatedClasses([...createdClasses, newClass]);
        setIsModalOpen(false);
    };

    return (
        <main className="">
            <Header />
            <TopSection />
            <div className='flex '>
                <UserInfo />
                <div className='classesContainer mt-12 flex flex-col gap-12 mx-auto sm:ml-0 lg:ml-28 sm:mr-0 lg:mr-28 '>
                    <div className='clsCntHeader flex justify-between'>
                        <div>Classes</div>
                        <div className='text-green-700' onClick={handleAddClass}>
                            + Add class
                        </div>
                    </div>
                    <div className='clsCntMain grid grid-cols-2 gap-4 '>
                        {createdClasses.map((classItem) => (
                            <ClassPreview key={classItem.id} classData={classItem} />
                        ))}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <CreateClassMoьщdal onCreateClass={handleCreateClass} />
            )}
        </main>
    );
}