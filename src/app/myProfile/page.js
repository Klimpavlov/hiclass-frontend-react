'use client';

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
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
                        {createdClasses.map((classItem) => (
                            <ClassPreview classData={classItem}/>
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