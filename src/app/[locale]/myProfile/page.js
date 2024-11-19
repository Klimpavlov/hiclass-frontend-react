import Header from "@/components/Header/Header";
import Banner from "@/components/Banner/Banner";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function MyProfile() {

    return (
        <main className="">
            <Header/>
            <Banner/>
            <UserProfile/>
        </main>
    );
}


// SSR

// import Header from "@/components/Header/Header";
// import Banner from "@/components/Banner/Banner";
// import UserProfile from "@/components/UserProfile/UserProfile";
// import { getUserProfile } from "@/app/[locale]/api/getUserProfile/getUserProfile";
//
// export default async function MyProfile() {
//     const userData = await getUserProfile();
//     return (
//         <main className="">
//             <Header />
//             <Banner />
//             <UserProfile userData={userData} />
//         </main>
//     );
// }



// 'use client';
//
// import React, {useState, useEffect, useRef} from "react";
// import Header from "@/components/Header/Header";
// import UserInfo from "@/components/UserInfo/UserInfo";
// import ClassPreview from "@/components/ClassPreview/ClassPreview";
// import CreateClassModal from "@/components/СreateClass/CreateClassModal";
// import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
// import Banner from "@/components/Banner/Banner";
// import {RingLoader} from "react-spinners";
// import {useTranslations} from "next-intl";
// import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
// import {usePathname} from "next/navigation";
// import ApplyButton from "@/components/Buttons/ApplyButton";
// import ErrorNotification from "@/components/Error/ErrorNotification";
//
// export default function MyProfile() {
//
//     const pathname = usePathname();
//
//     const [loading, setLoading] = useState(true);
//     const toast = useRef(null);
//     const t = useTranslations('MyProfile');
//
//
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     // const handleAddClass = () => {
//     //     setIsModalOpen(true);
//     // };
//
//     const handleAddClass = () => {
//         if (isTeacher) {
//             setIsModalOpen(true);
//         } else if (isExpert) {
//             toast.current.show({severity: 'error', summary: t("error"), detail: t("createClassPositionError"), life: 3000});
//         }
//     };
//
//     const [classData, setClassData] = useState([]);
//     const [userAvatar, setUserAvatar] = useState([]);
//     const [isTeacher, setIsTeacher] = useState('');
//     const [isExpert, setIsExpert] = useState('');
//
//     const fetchUserProfile = async () => {
//         try {
//             setLoading(true); // Устанавливаем состояние загрузки перед запросом
//             const userProfile = await getUserProfile();
//             console.log(userProfile);
//             setClassData(userProfile.classDtos);
//             setUserAvatar(userProfile.imageUrl);
//             setIsTeacher(userProfile.isATeacher);
//             setIsExpert(userProfile.isAnExpert);
//         } catch (error) {
//             console.error("Failed to fetch user profile", error);
//         } finally {
//             setLoading(false); // Отключаем состояние загрузки после завершения запроса
//         }
//     };
//
//     useEffect(() => {
//         fetchUserProfile();
//     }, []);
//
//     const refreshClassList = () => {
//         fetchUserProfile();
//         setIsModalOpen(false);
//     };
//
//     console.log(isTeacher, isExpert)
//
//     // translation
//
//     const translateDisciplines = (disciplines) => {
//         if (pathname === '/ru/myProfile') {
//             return disciplines.split(',').map(discipline => Object.keys(disciplinesMapping).find(key => disciplinesMapping[key] === discipline) || discipline);
//         }
//         return disciplines.split(',');
//     };
//
//     return (
//         <main className="">
//             <ErrorNotification ref={toast}/>
//             {loading ? (
//                 <div className='flex items-center justify-center h-screen'>
//                     <RingLoader
//                         color={'#36d7b7'}
//                         loading={loading}
//                         size={150}
//                         aria-label="Loading Spinner"
//                         data-testid="loader"
//                     />
//                 </div>
//             ) : (
//                 <>
//                     <Header/>
//                     <Banner/>
//                     <div className='flex flex-col sm:flex-row p-4 lg:p-20 md:p-10'>
//                         <UserInfo/>
//                         <div className='classesContainer sm:w-2/3 mt-12 flex flex-col gap-12 sm:ml-10 lg:ml-28 sm:mr-0'>
//                             <div className='clsCntHeader flex justify-between'>
//                                 <div className=''>{t("classes")}</div>
//                                 <div className='text-green-700 cursor-pointer' onClick={handleAddClass}>
//                                     + {t("addClass")}
//                                 </div>
//                             </div>
//
//                             {/* Если у пользователя нет классов */}
//                             {classData.length === 0 ? (
//                                 <div className="no-classes flex items-center justify-center border-1 border border-gray-200 h-64">
//                                     <div className="text-center flex flex-col">
//                                         <span className="mb-2 font-semibold">{t("noClassesFound")}</span>
//                                         <span className='text-sm text-gray-500'>{t("addClassesText")}</span>
//                                         <ApplyButton buttonText={t("addClass")} onApply={handleAddClass}/>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 // Если у пользователя есть классы
//                                 <div className='clsCntMain gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
//                                     {classData.map((defaultClass) => {
//                                         const translatedTags = translateDisciplines(defaultClass.disciplineTitle);
//                                         return (
//                                             <div key={defaultClass.classId}>
//                                                 <ClassPreview
//                                                     classId={defaultClass.classId}
//                                                     title={defaultClass.title}
//                                                     username={defaultClass.userFullName}
//                                                     tags={translatedTags}
//                                                     photo={defaultClass.imageUrl}
//                                                     showDropdown={true}
//                                                     userAvatar={userAvatar}
//                                                     onEditClass={refreshClassList}
//                                                     onDeleteClass={refreshClassList}
//                                                 />
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             )}
//
//             {isModalOpen && (
//                 <CreateClassModal
//                     isModalOpen={isModalOpen}
//                     setIsModalOpen={setIsModalOpen}
//                     onCreateClass={refreshClassList}
//                 />
//             )}
//         </main>
//     );
// }