'use client'

import React, {useEffect, useRef, useState} from "react";
import UserInfo from "@/components/User/UserInfo/UserInfo";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClassPreview from "@/components/Class/ClassPreview/ClassPreview";
import CreateClassModal from "@/components/Class/СreateClass/CreateClassModal";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {getUserProfile} from "@/app/[locale]/api/user/getUserProfile/getUserProfile";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {RingLoader} from "react-spinners";

const UserProfile = () => {

    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const t = useTranslations('MyProfile');


    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isOnlyExpert, setIsOnlyExpert] = useState(false);


    // const handleAddClass = () => {
    //     setIsModalOpen(true);
    // };

    const handleAddClass = () => {
        if (isTeacher) {
            setIsModalOpen(true);
        } else if (isExpert) {
            toast.current.show({
                severity: 'error',
                summary: t("error"),
                detail: t("createClassPositionError"),
                life: 3000
            });
        }
    };

    const [classData, setClassData] = useState([]);
    const [userAvatar, setUserAvatar] = useState([]);
    const [isTeacher, setIsTeacher] = useState('');
    const [isExpert, setIsExpert] = useState('');

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const userProfile = await getUserProfile();
            console.log(userProfile);
            setClassData(userProfile.classDtos);
            setUserAvatar(userProfile.imageUrl);
            setIsTeacher(userProfile.isATeacher);
            setIsExpert(userProfile.isAnExpert);
            if (userProfile.isATeacher === false && userProfile.isAnExpert === true) {
                setIsOnlyExpert(true);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const refreshClassList = () => {
        fetchUserProfile();
        setIsModalOpen(false);
    };

    console.log(isTeacher, isExpert)

    // translation

    const translateDisciplines = (disciplines) => {
        if (pathname === '/ru/myProfile') {
            return disciplines.split(',').map(discipline => Object.keys(disciplinesMapping).find(key => disciplinesMapping[key] === discipline) || discipline);
        }
        return disciplines.split(',');
    };
    return (
        <>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <RingLoader
                        color={'#36d7b7'}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className='flex flex-col sm:flex-row p-4 lg:p-20 md:p-10'>
                    <ErrorNotification ref={toast}/>
                    <UserInfo/>
                    <div className='classesContainer sm:w-2/3 mt-12 flex flex-col gap-12 sm:ml-10 lg:ml-28 sm:mr-0'>
                        <div className='clsCntHeader flex justify-between'>
                            <div className=''>{t("classes")}</div>
                            <div className='text-green-700 cursor-pointer' onClick={handleAddClass}>
                                + {t("addClass")}
                            </div>
                        </div>

                        {/* Если у пользователя нет классов */}
                        {classData.length === 0 ? (
                            <div
                                className="no-classes flex items-center justify-center border-1 border border-gray-200 h-64">
                                <div className="text-center flex flex-col">
                                    <span className="mb-2 font-semibold">{t("noClassesFound")}</span>
                                    <span className='text-sm text-gray-500'>{t("addClassesText")}</span>
                                    <ApplyButton buttonText={t("addClass")} onApply={handleAddClass}/>
                                </div>
                            </div>
                        ) : (
                            // if user have classes
                            <div className='clsCntMain gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                                {classData.map((defaultClass) => {
                                    const translatedTags = translateDisciplines(defaultClass.disciplineTitle);
                                    return (
                                        <div key={defaultClass.classId}>
                                            <ClassPreview
                                                classId={defaultClass.classId}
                                                title={defaultClass.title}
                                                username={defaultClass.userFullName}
                                                tags={translatedTags}
                                                grade={defaultClass.grade}
                                                photo={defaultClass.imageUrl}
                                                showDropdown={true}
                                                userAvatar={userAvatar}
                                                onEditClass={refreshClassList}
                                                onDeleteClass={refreshClassList}
                                                isOnlyExpert={isOnlyExpert}

                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {isModalOpen && (
                        <CreateClassModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            onCreateClass={refreshClassList}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default UserProfile


// 'use client'
//
// import React, { useState, useRef } from "react";
// import UserInfo from "@/components/UserInfo/UserInfo";
// import ApplyButton from "@/components/Buttons/ApplyButton";
// import ClassPreview from "@/components/ClassPreview/ClassPreview";
// import CreateClassModal from "@/components/СreateClass/CreateClassModal";
// import ErrorNotification from "@/components/Error/ErrorNotification";
//
// const UserProfile = ({ userData }) => {
//     const toast = useRef(null);
//
//     // Передаем данные напрямую из props
//     const { classDtos = [], imageUrl, isATeacher, isAnExpert } = userData || {};
//
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     const handleAddClass = () => {
//         if (isATeacher) {
//             setIsModalOpen(true);
//         } else if (isAnExpert) {
//             toast.current.show({
//                 severity: "error",
//                 summary: "Error",
//                 detail: "Only teachers can create classes.",
//                 life: 3000,
//             });
//         }
//     };
//
//     return (
//         <div className="flex flex-col sm:flex-row p-4 lg:p-20 md:p-10">
//             <ErrorNotification ref={toast} />
//             <UserInfo userAvatar={imageUrl} />
//             <div className="classesContainer sm:w-2/3 mt-12 flex flex-col gap-12 sm:ml-10 lg:ml-28 sm:mr-0">
//                 {/* Список классов */}
//                 {classDtos.length === 0 ? (
//                     <div className="no-classes flex items-center justify-center border-1 border-gray-200 h-64">
//                         <div className="text-center flex flex-col">
//                             <span className="mb-2 font-semibold">No classes found</span>
//                             <span className="text-sm text-gray-500">
//                                 Add some classes to get started.
//                             </span>
//                             <ApplyButton buttonText="Add Class" onApply={handleAddClass} />
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="clsCntMain gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
//                         {classDtos.map((defaultClass) => (
//                             <ClassPreview
//                                 key={defaultClass.classId}
//                                 classId={defaultClass.classId}
//                                 title={defaultClass.title}
//                                 username={defaultClass.userFullName}
//                                 tags={defaultClass.disciplineTitle.split(",")}
//                                 photo={defaultClass.imageUrl}
//                                 showDropdown={true}
//                                 userAvatar={imageUrl}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>
//             {isModalOpen && (
//                 <CreateClassModal
//                     isModalOpen={isModalOpen}
//                     setIsModalOpen={setIsModalOpen}
//                 />
//             )}
//         </div>
//     );
// };
//
// export default UserProfile;
