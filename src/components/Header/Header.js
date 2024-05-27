'use client';

import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgChatButton from '../Header/tertiary-button.svg';
import imgAvatarSrc from '../Header/avatar40x40_Online.svg';
import imgChevronDownSrc from '../Header/chevron-down.svg';
import Link from 'next/link'
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

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

    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo"/>
                <div className="hidden sm:flex flex-wrap justify-start ml-4">
                    <Link href="/" className="ml-6 my-2">Discover</Link>
                    <Link href="/myProfile" className="ml-6 my-2">My profile</Link>
                </div>
            </div>
            <div className="header-right hidden sm:flex items-center gap-6 sm:gap-3 md:gap-4 ">
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
                            >Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
            {/* Mobile Button */}
            <div onClick={handleNav} className='block sm:hidden z-10'>
                {nav ? (
                    <AiOutlineClose size={20} style={{ color: `white` }} />
                ) : (
                    <AiOutlineMenu size={20} style={{ color: `black` }} />
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
                        <Link href="/" className='text-white'>Discover</Link>
                    </li>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                        <Link href="/myProfile" className='text-white'>My profile</Link>
                    </li>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                        <Link href="" className='text-white'>Chat</Link>
                    </li>
                    <li onClick={handleNav} className='p-4 text-4xl hover:text-gray-500'>
                        <span className='text-white'
                            onClick={handleLogout}
                        >Logout
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header
