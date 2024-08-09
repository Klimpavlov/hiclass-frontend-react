'use client';

import React, {useState, useEffect, useRef} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgUKFlag from '../RegistrationHeader/FlagUnited Kingdom.svg'
import imgRUFlag from '../RegistrationHeader/ru.svg'
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

const Header = ({testNotifications}) => {

    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isNotification, setIsNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState(false);

    const [receivedNotifications, setReceivedNotifications] = useState('');

    const handleNavigation = (href) => {
        if (pathname === href) {
            window.location.reload();
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

    const logoutDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (logoutDropdownRef.current && !logoutDropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, []);

    function handleLogout() {
        localStorage.clear();
        router.push('/signIn');
    }

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

    const [isAvatarOpen, setIsAvatarOpen] = useState(false);

    const toggleAvatar = () => {
        setIsAvatarOpen(!isAvatarOpen);
    }

    useEffect(() => {
        const closeAvatar = () => {
            setIsAvatarOpen(false);
        };

        if (isAvatarOpen) {
            window.addEventListener("click", closeAvatar);
        }

        return () => {
            window.removeEventListener("click", closeAvatar);
        };
    }, [isAvatarOpen]);

    // notification window

    function handleNotification() {
        setIsNotification(!isNotification);
    }

    // get notifications from api

    useEffect(() => {
        getNotifications();
    }, []);

    async function getNotifications() {
        const accessToken = localStorage.getItem('accessToken');
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
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
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
            <div className="header-right hidden sm:flex items-center gap-6 sm:gap-3 md:gap-4 ">

                <div>
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
                                English
                            </div>
                            <div
                                className='px-2 sm:pr-20 hover:text-green-700 hover:bg-green-50'
                                onClick={() => changeLanguage('ru')}>
                                Russian
                            </div>
                        </div>
                    )}
                </div>
                <div className="relative">
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
                                    className='py-2 px-4 border-b border-gray-200 text-lg font-semibold'>Notifications
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

                {/*<div className="relative">*/}
                {/*    <Image src={imgChatButton} alt="chat-button" onClick={handleNotification} className='cursor-pointer' />*/}
                {/*    {hasNewNotification && <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>}*/}
                {/*            {isNotification && (*/}
                {/*                <div className='absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50'>*/}
                {/*                    <div className='py-2 px-4 border-b border-gray-200 text-lg text-green-700'>Notifications</div>*/}
                {/*                    <div className='max-h-60 overflow-y-auto'>*/}
                {/*                        {notificationInfo.length > 0 ? (*/}
                {/*                            notificationInfo.map((notification, index) => (*/}
                {/*                                <div key={index} className='py-2 px-4 text-slate-400 hover:bg-gray-100'>*/}
                {/*                                    {notification}*/}
                {/*                                </div>*/}
                {/*                            ))*/}
                {/*                        ) : (*/}
                {/*                            <div className='py-2 px-4 text-gray-500'>No notifications</div>*/}
                {/*                        )}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            )}*/}
                {/*</div>*/}
                <div className="flex gap-3 sm:gap-2 md:gap-3">
                    <div className="aspect-w-1 aspect-h-1 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                        <Image
                            // className="rounded-full overflow-hidden object-cover w-full h-full"
                            className="w-full h-full object-cover"
                            src={userAvatar}
                            alt="avatar-header"
                            width={100}
                            height={100}
                            onClick={toggleAvatar}

                        />
                    </div>
                    <Image className={`${isDropdownOpen ? "rotate-180" : ""} cursor-pointer`} src={imgChevronDownSrc}
                           alt="chevron-down"
                           onClick={toggleDropdown}/>
                    {isDropdownOpen && (
                        <div className="absolute right-5 top-5 sm:top-2">
                            <button
                                className=" py-2 px-4 sm:py-1 sm:px-2 text-left
                                hover:bg-gray-100 bg-white border border-gray-300
                                 rounded-lg shadow-lg cursor-pointer"
                                onClick={handleLogout}
                            >{t('logout')}
                            </button>
                        </div>
                    )}
                </div>

            </div>
            {/* Mobile Button */}
            <div onClick={handleNav} className='block sm:hidden z-10'>
                {nav ? (
                    <AiOutlineClose size={20} style={{color: `white`}}/>
                ) : (
                    <AiOutlineMenu size={20} style={{color: `black`}}/>
                )}
            </div>
            {/* Mobile Menu */}
            <div
                className={
                    nav
                        ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                        : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                }
            >
                <ul>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-white'>
                        <Link href="/" className='text-white'>{t('discover')}</Link>
                    </li>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                        <Link href="/myProfile" className='text-white'>{t('myProfile')}</Link>
                    </li>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                        <Link href="" className='text-white'>{t('chat')}</Link>
                    </li>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                        <span className='text-white'
                              onClick={handleLogout}
                        >{t('logout')}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header