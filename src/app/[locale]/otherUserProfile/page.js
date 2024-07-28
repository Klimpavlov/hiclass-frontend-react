'use client';

import React, {useEffect, useRef, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import {usePathname, useRouter} from "next/navigation";
import OtherUserInfo from "@/components/OtherUserInfo/OtherUserInfo";
import axios from "axios";
import {RingLoader} from "react-spinners";
import ClassPreviewModal from "@/components/ClassPreview/ClassPreviewModal";
import ErrorNotification from "@/components/Error/ErrorNotification";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
import {useTranslations} from "next-intl";

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
    const [isExpert, setIsExpert] = useState('')

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
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(
                    `http://localhost:7280/api/User/other-userprofile/${otherUserId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );
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

    // Function to translate discipline titles if localization is "ru"
    const translateUserInfo = (items, mappingFile) => {
        if (pathname.includes('ru')){
            return items.map(item => Object.keys(mappingFile).find(key => mappingFile[key] === item) || item)
        }
        return items;
    }

    const t = useTranslations("OtherUserProfile");

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
                    <div className='flex flex-col sm:flex-row p-4 md:p-28'>
                        <OtherUserInfo username={firstName + ' ' + lastName}
                                       isExpert={isExpert}
                                       email={email}
                                       languageTitles={languageTitles}
                                       userDescription={userDescription}
                                       userAvatar={userAvatar}
                                       country={country}
                                       disciplines={disciplineTitles}
                                       toast={toast}
                        />
                        <div className='classesContainer mt-12 flex flex-col gap-12 sm:ml-0 lg:ml-28 sm:mr-0 lg:mr-28 '>
                            <div className='clsCntHeader flex justify-between'>
                                <div className=''>{t("classes")}</div>
                                <div className='text-green-700 cursor-pointer'>

                                </div>
                            </div>
                            <div className='clsCntMain sm:grid grid-cols-2 gap-4 flex flex-col'>
                                {classData.map((defaultClass) => (
                                    <div key={defaultClass.classId} onClick={() => handleClassClick(defaultClass)}>
                                        <ClassPreview key={defaultClass.classId}
                                                      title={defaultClass.title}
                                                      username={defaultClass.userFullName}
                                                      tags={translateUserInfo(defaultClass.disciplines, disciplinesMapping)}
                                                      photo={defaultClass.imageUrl}
                                        ></ClassPreview>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedClass && (
                            <ClassPreviewModal
                                headerText='Lorem ipsum dolor sit amet consectetur. Sapien lectus platea magna sed .'
                                classId={selectedClass.classId}
                                title={selectedClass.title}
                                username={selectedClass.userFullName}
                                tags={selectedClass.disciplines}
                                photo={selectedClass.imageUrl}
                                handleCloseModal={() => setSelectedClass(null)}
                                handleCloseClassPreviewModal={() => setSelectedClass(null)}
                            ></ClassPreviewModal>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}