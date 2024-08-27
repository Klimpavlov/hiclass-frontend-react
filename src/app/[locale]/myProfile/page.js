'use client';

import React, {useState, useEffect} from "react";
import Header from "@/components/Header/Header";
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import CreateClassModal from "@/components/СreateClass/CreateClassModal";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import Banner from "@/components/Banner/Banner";
import {RingLoader} from "react-spinners";
import {useTranslations} from "next-intl";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import {usePathname} from "next/navigation";

export default function MyProfile() {

    const pathname = usePathname();

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClass = () => {
        setIsModalOpen(true);
    };

    const handleCreateClass = () => {
        setIsModalOpen(false);
    };


    const [classData, setClassData] = useState([]);

    // useEffect(() => {
    //     async function getUser() {
    //         const accessToken = localStorage.getItem('accessToken');
    //         const userProfile = await getUserProfile(accessToken)
    //         console.log(userProfile);
    //         setClassData(userProfile.classDtos)
    //         setTimeout(() => {
    //             setLoading(false)
    //         }, 1300)
    //     }
    //     getUser()
    // }, []);

    useEffect(() => {
         async function fetchUserProfile() {
             const userProfile = await getUserProfile();
             console.log(userProfile);
             setClassData(userProfile.classDtos)
             setTimeout(() => {
                 setLoading(false)
             }, 1300)
         }
        fetchUserProfile();
    }, []);

    // translation

    const translateDisciplines = (disciplines) => {
        if (pathname === '/ru/myProfile') {
            return disciplines.split(',').map(discipline => Object.keys(disciplinesMapping).find(key => disciplinesMapping[key] === discipline) || discipline);
        }
        return disciplines.split(',');
    };

    const t = useTranslations('MyProfile');

    return (
        <main className="">
            {loading ? (
                <div className='flex items-center justify-center h-screen'>
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
                    <Header/>
                    <Banner/>
                    <div className='flex flex-col sm:flex-row p-4 lg:p-20 md:p-10'>
                        <UserInfo/>
                        <div className='classesContainer mt-12 flex flex-col gap-12 sm:ml-10  lg:ml-28 sm:mr-0'>
                            <div className='clsCntHeader flex justify-between'>
                                <div className=''>{t("classes")}</div>
                                <div className='text-green-700 cursor-pointer' onClick={handleAddClass}>
                                    + {t("addClass")}
                                </div>
                            </div>
                            <div className='clsCntMain gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                            {/*    <div className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">*/}
                                {classData.map((defaultClass) => {
                                    const translatedTags = translateDisciplines(defaultClass.disciplineTitle);
                                    return (
                                        <div key={defaultClass.classId}>
                                            <ClassPreview
                                                classId={defaultClass.classId}
                                                title={defaultClass.title}
                                                username={defaultClass.userFullName}
                                                tags={translatedTags}
                                                photo={defaultClass.imageUrl}
                                                showDropdown={true}
                                            ></ClassPreview>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isModalOpen && (
                <CreateClassModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onCreateClass={handleCreateClass}
                />
            )}
        </main>
    )
        ;
}