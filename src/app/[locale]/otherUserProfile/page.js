'use client';

import React, {useEffect, useRef, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import UserInfo from "@/components/User/UserInfo/UserInfo";
import ClassPreview from "@/components/Class/ClassPreview/ClassPreview";
import {usePathname, useRouter} from "next/navigation";
import OtherUserInfo from "@/components/OtherUserInfo/OtherUserInfo";
import axios from "axios";
import {RingLoader} from "react-spinners";
import ClassPreviewModal from "@/components/Class/ClassPreview/ClassPreviewModal";
import ErrorNotification from "@/components/Error/ErrorNotification";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
import {useTranslations} from "next-intl";
import apiClient from "@/app/[locale]/api/utils/axios";
import Cookies from "js-cookie";
import {getUserProfile} from "@/app/[locale]/api/user/getUserProfile/getUserProfile";

export default function otherUserProfile() {

    const pathname = usePathname();

    //loader
    const [loading, setLoading] = useState(true);

    const toast = useRef(null);


    const [firstName, setUserFirstName] = useState([]);
    const [lastName, setUserLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [languageTitles, setLanguageTitles] = useState([]);
    const [userDescription, setUserDescription] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [institution, setInstitution] = useState('');
    const [disciplineTitles, setDisciplineTitles] = useState([]);
    const [isExpert, setIsExpert] = useState('');
    const [isTeacher, setIsTeacher] = useState('');

    const [isOnlyExpert, setIsOnlyExpert] = useState(false);


    const [userAvatar, setUserAvatar] = useState([]);
    const [classData, setClassData] = useState([]);
    const otherUserId = localStorage.getItem('selectedUserId')


    // select class for invitation

    const [selectedClass, setSelectedClass] = useState(null);

    const handleClassClick = (selectedClass) => {
        setSelectedClass(selectedClass);
        // localStorage.setItem('selectedUserId', teacher.userId);

    };

    useEffect(() => {

        async function getOtherUser() {
            try {
                const response = await apiClient.get(`/User/other-userprofile/${otherUserId}`);
                console.log(response)
                setUserFirstName(response.data.value.firstName)
                setUserLastName(response.data.value.lastName)
                setEmail(response.data.value.email)
                setLanguageTitles(translateUserInfo(response.data.value.languageTitles, languagesMapping));
                setUserDescription(response.data.value.description);
                setCountry(response.data.value.countryTitle);
                setCity(response.data.value.cityTitle);
                setInstitution(response.data.value.institution.title);
                setDisciplineTitles(translateUserInfo(response.data.value.disciplineTitles, disciplinesMapping));

                setIsExpert(response.data.value.isAnExpert);
                setIsTeacher(response.data.value.isATeacher);
                setUserAvatar(response.data.value.imageUrl)
                setClassData(response.data.value.classDtos)

                setTimeout(() => {
                    setLoading(false);
                }, 1300)


            } catch (error) {
                console.error(error);
            }
        }

        getOtherUser();
    }, []);


    // get user profile

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const accessToken = Cookies.get('accessToken');
        const userInfo = await getUserProfile(accessToken)
        if (userInfo.isATeacher === false && userInfo.isAnExpert === true) {
            setIsOnlyExpert(true);
        }
        console.log(isOnlyExpert)
    }

    // Function to translate discipline titles if localization is "ru"
    const translateUserInfo = (items, mappingFile) => {
        if (pathname.includes('ru')){
            return items.map(item => Object.keys(mappingFile).find(key => mappingFile[key] === item) || item)
        }
        return items;
    }

    const translateDisciplines = (disciplines) => {
        if (pathname === '/ru/otherUserProfile') {
            return disciplines.split(',').map(discipline => Object.keys(disciplinesMapping).find(key => disciplinesMapping[key] === discipline) || discipline);
        }
        return disciplines.split(',');
    };

    const t = useTranslations("OtherUserProfile");

    useEffect(() => {
        console.log("isOnlyExpert updated:", isOnlyExpert);
    }, [isOnlyExpert]);

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
                    <ErrorNotification ref={toast}/>
                    <Header/>
                    <TopSection/>
                    <div className='flex flex-col sm:flex-row p-4 lg:p-20 md:p-10'>
                        <OtherUserInfo username={firstName + ' ' + lastName}
                                       isExpert={isExpert}
                                       isTeacher={isTeacher}
                                       email={email}
                                       languageTitles={languageTitles}
                                       userDescription={userDescription}
                                       userAvatar={userAvatar}
                                       country={country}
                                       disciplines={disciplineTitles}
                                       toast={toast}
                        />
                        {isExpert === true && isTeacher === false ? null :

                            <div className='classesContainer sm:w-2/3 mt-12 flex flex-col gap-12 sm:ml-10 lg:ml-28 sm:mr-0'>
                            <div className='clsCntHeader flex justify-between'>
                                <div className=''>{t("classes")}</div>
                                <div className='text-green-700 cursor-pointer'>

                                </div>
                            </div>
                            <div className='clsCntMain gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                                {classData.map((defaultClass) => (
                                    <div key={defaultClass.classId} onClick={() => handleClassClick(defaultClass)}>
                                        <ClassPreview key={defaultClass.classId}
                                                      title={defaultClass.title}
                                                      username={defaultClass.userFullName}
                                                      tags={translateDisciplines(defaultClass.disciplineTitle)}
                                                      grade={defaultClass.grade}
                                                      photo={defaultClass.imageUrl}
                                                      userAvatar={userAvatar}
                                        ></ClassPreview>
                                    </div>
                                ))}
                            </div>
                        </div>
                        }
                        {selectedClass && (
                            <ClassPreviewModal
                                headerText={t("classPreviewText")}
                                classId={selectedClass.classId}
                                title={selectedClass.title}
                                username={selectedClass.userFullName}
                                tags={translateDisciplines(selectedClass.disciplineTitle)}
                                grade={selectedClass.grade}
                                photo={selectedClass.imageUrl}
                                handleCloseModal={() => setSelectedClass(null)}
                                handleCloseClassPreviewModal={() => setSelectedClass(null)}
                                isOnlyExpert={isOnlyExpert}
                            ></ClassPreviewModal>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}