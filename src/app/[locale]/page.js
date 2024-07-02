'use client';

import React, {useEffect, useRef, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import Filter from "@/components/Filter/Filter";
import Switch from "@/components/Buttons/SwitchButton";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import {getAvailableLanguages} from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableCountries} from "@/app/[locale]/api/getAvailableCountry/getAvailableCountries";
import {getDefaultSearch} from "@/app/[locale]/api/defaultSearch/defaultSearch";
import {searchRequest} from "@/app/[locale]/api/searchRequest/searchRequest";
import Tag from "@/components/Tags/Tag";
import ClassPreviewModal from "@/components/ClassPreview/ClassPreviewModal";
import {RingLoader} from "react-spinners";
import { useTranslations } from "next-intl";
import ruLocale from '/messages/ru.json';
import { usePathname } from 'next/navigation';
import disciplinesMapping from "/mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "/mapping/languagesMapping/languagesMapping.json";
import getAvailableGrades from "@/app/[locale]/api/getAvailableGrades/getAvailableGrades";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import {getAllNotifications} from "@/app/[locale]/api/notifications/getAllNotifications";
import ErrorNotification from "@/components/Error/ErrorNotification";

export default function ExplorePage() {
    const pathname = usePathname();
    const currentPathname = pathname.slice(1);

    const toast = useRef(null);

    const [loading, setLoading] = useState(true);
    const [currentFilters, setCurrentFilters] = useState({});
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchClassData, setSearchClassData] = useState([]);
    const [teacherProfileData, setTeacherProfileData] = useState([]);

    const [disciplines, setDisciplines] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [countries, setCountries] = useState([]);

    const [notification, setNotification] = useState('')
    const [receivedNotifications, setReceivedNotifications] = useState('');

    useEffect(() => {
        getDisciplines();
        getLanguages();
        getCountries();
        defaultSearch();
    }, []);

    // Firebase
    useEffect(() => {
        const getAccessToken = async () => {
            try {
                const response = await fetch('/api/getAccessToken');
                const data = await response.json();
                if (data.accessToken) {
                    console.log('Access Token:', data.accessToken);
                } else {
                    console.error('Failed to get access token');
                }
            } catch (error) {
                console.error('Error getting access token:', error);
            }
        };

        getAccessToken();
    }, []);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyA-Ti7RsZQL6QSgn4uHTamu4sHYXp9Sbe8",
            authDomain: "hiclass-ff338.firebaseapp.com",
            projectId: "hiclass-ff338",
            storageBucket: "hiclass-ff338.appspot.com",
            messagingSenderId: "526521652695",
            appId: "1:526521652695:web:d166d6d34aaf7c63132792"
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            setNotification(payload.notification.body)
        });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((err) => {
                    console.error('Service Worker registration failed:', err);
                });
        }

        const requestPermission = async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    const token = await getToken(messaging, {
                        vapidKey: "BMV5zY2GipaHYmj87jqJniSgMpJqiYgtbVBzBLfruOV2caEss56w_4AZcI74hAPgACjvVDKXlAPXfb3g3xg5wv4"
                    });
                    console.log("Token Generated:", token);
                } else {
                    console.error("Notification permission denied");
                }
            } catch (error) {
                console.error("Error requesting permission:", error);
            }
        };

        requestPermission();

        const getDeviceTokenAndSave = async () => {
            try {
                const currentToken = await getToken(messaging, { vapidKey: 'BMV5zY2GipaHYmj87jqJniSgMpJqiYgtbVBzBLfruOV2caEss56w_4AZcI74hAPgACjvVDKXlAPXfb3g3xg5wv4' });
                if (currentToken) {
                    console.log('Device token:', currentToken);
                    // Save or send the token to your server for later use
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            } catch (err) {
                console.log('An error occurred while retrieving token. ', err);
            }
        };

        getDeviceTokenAndSave();

    }, [])


    // get notifications from api
    async function getNotifications() {
        const accessToken = localStorage.getItem('accessToken');
        const notificationsFromApi = await getAllNotifications(accessToken);
        console.log(notificationsFromApi);
        setReceivedNotifications( notificationsFromApi.map((notification) => (
            notification.message
        )))


    }

    useEffect(() => {
        getNotifications()
    }, [])


    // show current notifications
    useEffect(() => {
        if (notification) {
            toast.current.show({ severity: 'info', summary: 'Notification', detail: `${notification}`, life: 3000 });
            console.log(notification);
        }
    }, [notification]);


async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(currentPathname === 'ru' ? Object.values(ruLocale.Disciplines) : availableDisciplines);
    }

    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(currentPathname === 'ru' ? Object.values(ruLocale.Languages) : availableLanguages);
    }

    async function getCountries() {
        const accessToken = localStorage.getItem('accessToken');
        const availableCountries = await getAvailableCountries(accessToken);
        setCountries(availableCountries);
    }

    async function defaultSearch() {
        const accessToken = localStorage.getItem('accessToken');
        const defaultSearchData = await getDefaultSearch(accessToken);
        setTeacherProfileData(defaultSearchData.teacherProfilesByCountry);
        setLoading(false);
    }

    const handleClassClick = (selectedClass, teacher) => {
        setSelectedClass(selectedClass);
        localStorage.setItem('selectedUserId', teacher.userId);
    };

    const handleFilterApply = (selectedOptions, filterName) => {
        setCurrentFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: selectedOptions
        }));
        handleSearchRequest({
            ...currentFilters,
            [filterName]: selectedOptions
        });
    };

    const handleClearAll = () => {
        setCurrentFilters({});
        setSearchClassData([]);
    };

    const handleRemoveTag = (filterName, filterValue) => {
        const updatedFilters = {
            ...currentFilters,
            [filterName]: currentFilters[filterName].filter(value => value !== filterValue)
        };

        if (updatedFilters[filterName].length === 0) {
            delete updatedFilters[filterName];
        }

        setCurrentFilters(updatedFilters);
        handleSearchRequest(updatedFilters);
    };

    const handleSearchRequest = async (filters) => {
        const accessToken = localStorage.getItem('accessToken');
        const localhost = getLocalhost();

        const queryParameters = Object.entries(filters).flatMap(([filterName, filterValues]) =>
            filterValues.map(value => `${filterName}=${encodeURIComponent(value)}`)
        ).join('&');

        const searchUrl = `http://${localhost}/api/Search/search-request?${queryParameters}`;

        try {
            const response = await searchRequest(accessToken, searchUrl);
            setSearchClassData(response.teacherProfiles);
        } catch (error) {
            console.error(error);
        }
        console.log(searchUrl)
    };

    const t = useTranslations("MainPage");
    const filtersTranslation = useTranslations("Filters");

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
                    <ErrorNotification ref={toast} />
                    <Header notifications={receivedNotifications}/>
                    <TopSection/>
                    <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-2 md:py-4 border-b border-b-gray">
                        <div className="flex flex-wrap gap-2 px-4 md:px-8">
                            <Filter buttonText={filtersTranslation('Subject')}
                                    options={disciplines} onApply={handleFilterApply}
                                    clearAll={handleClearAll}
                                    filterName='Disciplines'
                                    currentFilters={currentFilters}/>
                            <Filter buttonText={filtersTranslation('Grade')}
                                    options={getAvailableGrades()}
                                    onApply={handleFilterApply}
                                    clearAll={handleClearAll}
                                    filterName='Grades'
                                    currentFilters={currentFilters}/>
                            <Filter buttonText={filtersTranslation('Language')}
                                    options={languages} onApply={handleFilterApply}
                                    clearAll={handleClearAll}
                                    filterName='Languages'
                                    currentFilters={currentFilters}/>
                            <Filter buttonText={filtersTranslation('Location')}
                                    options={countries}
                                    onApply={handleFilterApply}
                                    clearAll={handleClearAll} filterName='Countries'
                                    currentFilters={currentFilters}/>
                        </div>
                    </div>
                    <div className="applied-filters-container px-4 md:px-8">
                        <div className='px-4 md:px-8 pt-2 md:pt-4'>
                            {Object.entries(currentFilters).flatMap(([filterName, filterValues]) =>
                                filterValues.map(filterValue => (
                                    <span key={`${filterName}-${filterValue}`} className='pl-2'>
                                        <Tag text={filterValue} removeTag={true} onChange={() => handleRemoveTag(filterName, filterValue)}/>
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                    <div className='p-4 sm:p-8 md:p-12 lg:p-16'>
                        <div className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
                            {searchClassData.map((teacher) => (
                                teacher.classDtos.map((classInfo) => (
                                    <div key={classInfo.classId} onClick={() => handleClassClick(classInfo, teacher)}>
                                        <ClassPreview key={classInfo.classId} title={classInfo.title} username={classInfo.userFullName} tags={classInfo.disciplines} photo={classInfo.imageUrl}/>
                                    </div>
                                ))
                            ))}
                        </div>
                        <div className='flex justify-between mt-4 md:mt-8'>
                            <div className='font-bold'>{t('mostPopularClasses')}<span className='text-green-700'>{t('Belarus')}</span></div>
                            <div className='text-green-700'>{t('seeAll')}</div>
                        </div>
                        <div className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
                            {teacherProfileData.map((teacher) => (
                                teacher.classDtos.map((classInfo) => (
                                    <div key={classInfo.classId} onClick={() => handleClassClick(classInfo, teacher)}>
                                        <ClassPreview key={classInfo.classId} title={classInfo.title} username={classInfo.userFullName} tags={classInfo.disciplines} photo={classInfo.imageUrl}/>
                                    </div>
                                ))
                            ))}
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
                            ></ClassPreviewModal>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}
