'use client';

import React, {useState, useEffect, useRef} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgUKFlag from '../RegistrationHeader/FlagUnited Kingdom.svg'
import imgRUFlag from '../RegistrationHeader/ru.svg'
import imgChatButton from '../Header/tertiary-button.svg';
import imgAvatarSrc from '../Header/avatar40x40_Online.svg';
import imgChevronDownSrc from '../Header/chevron-down.svg';
import Link from 'next/link'
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {useTranslations} from "next-intl";

const Header = () => {

    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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


    // mobile button
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    //current locale

    const pathname = usePathname();

    // translation

    const t = useTranslations("Header");

    const currentLanguage = pathname.includes('ru') ?
        <Image className='rounded w-5 h-5' src={imgRUFlag} alt="RU flag"/> : <Image className='rounded' src={imgUKFlag} alt="UK flag"/>;

    const [isLanguagesDropdownOpen, setIsLanguagesDropdownOpen] = useState(false);

    const toggleLanguagesDropdown = () => {
        setIsLanguagesDropdownOpen(!isLanguagesDropdownOpen);
    }

    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo"/>
                <div className="hidden sm:flex flex-wrap justify-start ml-4">
                    <Link href="/" className="ml-6 my-2">{t('discover')}</Link>
                    <Link href="/myProfile" className="ml-6 my-2">{t('myProfile')}</Link>
                </div>
            </div>
            <div className="header-right hidden sm:flex items-center gap-6 sm:gap-3 md:gap-4 ">

                <div>
                    <div className="cursor-pointer"
                         onClick={toggleLanguagesDropdown}>
                        {currentLanguage}
                    </div>
                    {isLanguagesDropdownOpen && (
                        <div className="absolute mt-2">
                            <Link className='block w-20 py-2 px-4 sm:py-1 sm:px-2 text-left hover:bg-green-200 bg-white border
                                          border-gray-300 rounded-lg shadow-lg cursor-pointer'
                                  href="/en" locale="en">
                                English
                            </Link>
                            <Link className='w-20 block py-2 px-4 sm:py-1 sm:px-2 text-left hover:bg-green-200 bg-white
                                 border border-gray-300 rounded-lg shadow-lg cursor-pointer mt-2'
                                  href="/ru" locale="ru">
                                Russian
                            </Link>
                        </div>
                    )}
                </div>

                <Image src={imgChatButton} alt="chat-button"/>
                <div className="flex gap-3 sm:gap-2 md:gap-3">
                    <div className="aspect-w-1 aspect-h-1 sm:w-12 sm:h-12">
                        <Image
                            className="rounded-full overflow-hidden object-cover w-full h-full"
                            src={userAvatar}
                            alt="avatar-header"
                            width={50}
                            height={50}
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
