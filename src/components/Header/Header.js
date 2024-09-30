'use client';

import React, {useState, useEffect, useRef} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgUKFlag from '@/components/Header/RegistrationHeader/FlagUnited Kingdom.svg'
import imgRUFlag from '@/components/Header/RegistrationHeader/ru.svg'
import imgNotificationBtn from '../Header/notification-bell.svg';
import imgChevronDownSrc from '../Header/chevron-down.svg';
import Link from 'next/link'
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {useLocale, useTranslations} from "next-intl";
import {getAllNotifications} from "@/app/[locale]/api/notifications/getAllNotifications";
import postUpdateNotificationStatus from "@/app/[locale]/updateNotificationsStatus/postUpdateNotificationsStatus";
import postLogout from "@/app/[locale]/signOut/postLogout";
import {RingLoader} from "react-spinners";

const Header = ({testNotifications}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isNotification, setIsNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState(false);

    const [receivedNotifications, setReceivedNotifications] = useState('');

    let languageRef = useRef(null);
    let notificationRef = useRef(null);
    const logoutDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setIsLanguagesDropdownOpen(false)
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotification(false)
            }
            if (logoutDropdownRef.current && !logoutDropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [])

    const handleNavigation = async (href) => {
        if (pathname === href) {
            setLoading(true);
            await router.refresh();
            setLoading(false);
        } else {
            router.push(href);
        }
    };

    // const [hasNewNotification, setHasNewNotification] = useState(false);

    useEffect(() => {
        setNotificationInfo(receivedNotifications, testNotifications);
        // setHasNewNotification(true);
    }, [receivedNotifications, testNotifications]);
    console.log(receivedNotifications)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }


    // function clearCookie(name) {
    //     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict`;
    // }

    const handleLogout = async () => {
        try {
            // clearCookie('refreshToken');
            const deviceToken = localStorage.getItem('deviceToken');
            await postLogout(deviceToken, successRedirect);
            router.push('/signIn');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const successRedirect = () => {
        router.push('/signIn');
    };

    const [userAvatar, setUserAvatar] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken)
        console.log(userProfile);

        setUserAvatar(userProfile.imageUrl)
    }

    // notification window

    function handleNotification() {
        setIsNotification(!isNotification);
    }

    // get notifications from api

    useEffect(() => {
        getNotifications();
    }, []);

    async function getNotifications() {
        const accessToken = sessionStorage.getItem('accessToken');
        const notificationsFromApi = await getAllNotifications(accessToken);
        console.log(notificationsFromApi);
        setReceivedNotifications(notificationsFromApi.map((notification) => ({
            notificationId: notification.notificationId,
            message: notification.message,
            status: notification.status
        })).reverse());
    }


    // isRead notification

    async function markAsRead(notificationId) {
        const success = await postUpdateNotificationStatus(notificationId, "Read");
        if (success) {
            setReceivedNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                    notification.notificationId === notificationId
                        ? {...notification, status: "Read"}
                        : notification
                )
            );
        }
    }


    // mobile button
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const openNavRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event) {
            if (openNavRef.current && !openNavRef.current.contains(event.target)) {
                setNav(false)
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [])
    //current locale

    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    // translation

    const t = useTranslations("Header");


    const currentLanguage = pathname.includes('ru') ?
        <Image className='rounded w-5 h-5' src={imgRUFlag} alt="RU flag"/> :
        <Image className='rounded' src={imgUKFlag} alt="UK flag"/>;

    const [isLanguagesDropdownOpen, setIsLanguagesDropdownOpen] = useState(false);

    const toggleLanguagesDropdown = () => {
        setIsLanguagesDropdownOpen(!isLanguagesDropdownOpen);
    }

    const changeLanguage = (newLocale) => {
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

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
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            {/*<Menubar model={items} />*/}
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo" className='cursor-pointer'
                       onClick={() => handleNavigation(`/${locale}`)}
                />
                <div className="hidden sm:flex flex-wrap justify-start ml-4">
                    <div
                        className="ml-6 my-2 cursor-pointer"
                        onClick={() => handleNavigation(`/${locale}`)}
                    >
                        {t('discover')}
                    </div>
                    <div
                        className="ml-6 my-2 cursor-pointer"
                        onClick={() => handleNavigation(`/${locale}/myProfile`)}
                    >
                        {t('myProfile')}
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-6 sm:gap-3 md:gap-4'>
                <div ref={languageRef}>
                    <div className="cursor-pointer"
                         onClick={toggleLanguagesDropdown}>
                        {currentLanguage}
                    </div>
                    {isLanguagesDropdownOpen && (
                        <div
                            className="absolute mt-2 z-50 py-2 px-1 text-left text-sm bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer">
                            <div
                                className='px-2 sm:pr-20 hover:text-green-700 hover:bg-green-50'
                                onClick={() => changeLanguage('en')}>
                                {t('english')}
                            </div>
                            <div
                                className='px-2 sm:pr-20 hover:text-green-700 hover:bg-green-50'
                                onClick={() => changeLanguage('ru')}>
                                {t('russian')}
                            </div>
                        </div>
                    )}
                </div>
                <div className="header-right hidden sm:flex items-center gap-6 sm:gap-3 md:gap-4 ">
                <div className="relative" ref={notificationRef}>
                    <Image src={imgNotificationBtn} alt="chat-button" onClick={handleNotification}
                           className='cursor-pointer'/>
                    {notificationInfo && (
                        receivedNotifications.map((notification) => (
                            notification.status === "Unread" && (
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            )
                        ))
                    )}
                    <div className='absolute border-black text-green-700'>
                        {isNotification && (
                            <div
                                className='absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50'>
                                <div
                                    className='py-2 px-4 border-b border-gray-200 text-lg font-semibold'>{t('notifications')}
                                </div>
                                <div className='max-h-60 overflow-y-auto'>
                                    {receivedNotifications.map((notification) => (
                                        <div key={notification.notificationId}
                                             className='relative py-2 px-4 hover:bg-gray-100 text-slate-600 cursor-pointer'
                                             onClick={() => markAsRead(notification.notificationId)}>
                                            <div className='p-2 rounded text-sm flex items-center'>
                                                {notification.message}
                                                {notification.status === "Unread" && (
                                                    <span
                                                        className="absolute right-6 h-3 w-3 bg-blue-500 rounded-full"></span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 sm:gap-2 md:gap-3" ref={logoutDropdownRef}>
                    <div className="aspect-w-1 aspect-h-1 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                        <Image
                            // className="rounded-full overflow-hidden object-cover w-full h-full"
                            className="w-full h-full object-cover cursor-pointer"
                            src={userAvatar}
                            alt="avatar-header"
                            width={100}
                            height={100}
                            onClick={toggleDropdown}

                        />
                    </div>
                    {/*<Image className={`${isDropdownOpen ? "rotate-180" : ""} cursor-pointer`} src={imgChevronDownSrc}*/}
                    {/*       alt="chevron-down"*/}
                    {/*       onClick={toggleDropdown}/>*/}
                    {isDropdownOpen && (
                        <div className="absolute right-20 mt-10 z-50 py-2 px-3 text-left text-sm
                         bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer">
                            <div className="flex items-center px-2 hover:text-green-700 cursor-pointer hover:bg-green-50"
                                 onClick={() => handleNavigation(`/${locale}/myProfile`)}>
                                <span className="pi pi-user mr-2"></span>
                                {t("myProfile")}
                            </div>
                            <div className="flex items-center px-2 hover:text-green-700 cursor-pointer hover:bg-green-50 mt-2"
                                 onClick={() => handleNavigation(`/${locale}/updateUser`)}>
                                <span className="pi pi-cog mr-2"></span>
                                {t("editProfile")}
                            </div>
                            <div
                                className="flex items-center px-2 hover:text-green-700 cursor-pointer hover:bg-green-50 mt-2"
                                onClick={handleLogout}>
                                <span className="pi pi-sign-out mr-2"></span>
                                {t('logout')}
                            </div>
                        </div>
                    )}
                </div>

            </div>
            {/* Mobile Button */}
            <div onClick={handleNav} className='block sm:hidden z-10'>
                {nav ? (
                    <AiOutlineClose size={20} style={{color: `black`}}/>
                ) : (
                    <AiOutlineMenu size={20} style={{color: `black`}}/>
                )}
            </div>
            {/* Mobile Menu */}
            {/*<div*/}
            {/*    className={*/}
            {/*        nav*/}
            {/*            ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'*/}
            {/*            : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'*/}
            {/*    }*/}
            {/*>*/}
            <div
                className={`${
                    nav ? 'max-h-screen' : 'max-h-0'
                } absolute top-24 left-0 right-0 mx-3 flex flex-col justify-start items-start bg-black border border-none rounded-3xl ease-in-out duration-700 delay-75 shadow-2xl overflow-hidden`}

            >
                    <ul>
                        <li onClick={handleNav} className='p-4 text-xl transition-colors duration-500 hover:text-white'>
                            <Link href="/" className='text-white'>{t('discover')}</Link>
                        </li>
                        <li onClick={handleNav} className='p-4 text-xl transition-colors duration-500 hover:text-white'>
                            <Link href="/myProfile" className='text-white'>{t('myProfile')}</Link>
                        </li>
                        {/*<li onClick={handleNav} className='p-4 text-xl transition-colors duration-500 hover:text-white'>*/}
                        {/*    <Link href="" className='text-white'>{t('chat')}</Link>*/}
                        {/*</li>*/}
                        <li onClick={handleNav} className='p-4 text-xl transition-colors duration-500 hover:text-white'>
                        <span className='text-white'
                              onClick={handleLogout}
                        >{t('logout')}
                        </span>
                        </li>
                    </ul>
            </div>
            </div>
        </div>
                </>
            )}
        </main>
    )
        ;
}

export default Header