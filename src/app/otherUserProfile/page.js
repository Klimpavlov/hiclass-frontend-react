'use client';

import React, {useEffect, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import UserInfo from "@/components/UserInfo/UserInfo";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import {useRouter} from "next/navigation";
import OtherUserInfo from "@/components/OtherUserInfo/OtherUserInfo";
import axios from "axios";
import {RingLoader} from "react-spinners";

export default function otherUserProfile() {

    //loader
    const [loading, setLoading] = useState(true);


    const [firstName, setUserFirstName] = useState([]);
    const [lastName, setUserLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [languageTitles, setLanguageTitles] = useState([]);
    const [userDescription, setUserDescription] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [institution, setInstitution] = useState('');
    const [disciplineTitles, setDisciplineTitles] = useState([]);

    const [userAvatar, setUserAvatar] = useState([]);
    const [classData, setClassData] = useState([]);
    const otherUserId = localStorage.getItem('selectedUserId')

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
                setLanguageTitles(response.data.value.languageTitles);
                setUserDescription(response.data.value.description);
                setCountry(response.data.value.countryTitle);
                setCity(response.data.value.cityTitle);
                setInstitution(response.data.value.institution.title);
                setDisciplineTitles(response.data.value.disciplineTitles);

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
                    <TopSection/>
                    <div className='flex flex-col sm:flex-row p-4 md:p-28'>
                        <OtherUserInfo username={firstName + ' ' + lastName}
                                       email={email}
                                       languageTitles={languageTitles}
                                       userDescription={userDescription}
                                       userAvatar={userAvatar}
                                       country={country}
                                       disciplines={disciplineTitles}
                        />
                        <div className='classesContainer mt-12 flex flex-col gap-12 sm:ml-0 lg:ml-28 sm:mr-0 lg:mr-28 '>
                            <div className='clsCntHeader flex justify-between'>
                                <div className=''>Classes</div>
                                <div className='text-green-700 cursor-pointer'>

                                </div>
                            </div>
                            <div className='clsCntMain sm:grid grid-cols-2 gap-4 flex flex-col'>
                                {classData.map((defaultClass) => (
                                    <div key={defaultClass.classId}>
                                        <ClassPreview key={defaultClass.classId}
                                                      title={defaultClass.title}
                                                      username={defaultClass.userFullName}
                                                      tags={defaultClass.disciplines}
                                                      photo={defaultClass.imageUrl}
                                        ></ClassPreview>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}