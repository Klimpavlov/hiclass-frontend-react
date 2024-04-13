'use client';

import React, {useState, useEffect} from "react";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgChatButton from '../Header/tertiary-button.svg';
import imgAvatarSrc from '../Header/avatar40x40_Online.svg';
import imgChevronDownSrc from '../Header/chevron-down.svg';
import Link from 'next/link'
import {getUserProfile} from "@/app/api/getUserProfile/getUserProfile";

const Header = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout");

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


    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo" />
                <div className="flex flex-wrap justify-start ml-4">
                    <Link href="/" className="ml-6 my-2">Discover</Link>
                    <Link href="/myProfile" className="ml-6 my-2">My profile</Link>
                </div>
            </div>
            <div className="header-right flex items-center gap-6 sm:gap-3 md:gap-4">
                <Image src={imgChatButton} alt="chat-button" />
                <div className="flex gap-3 sm:gap-1 md:gap-2">
                    <div className="aspect-w-1 aspect-h-1 sm:w-12 sm:h-12">
                        <Image
                            className="rounded-full overflow-hidden object-cover w-full h-full"
                            src={userAvatar}
                            alt="avatar-header"
                            width={50}
                            height={50}
                        />
                    </div>
                    <Image className='cursor-pointer' src={imgChevronDownSrc} alt="chevron-down" onClick={toggleDropdown} />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-10 ">
                            <button
                                className="block py-2 px-4 sm:py-1 sm:px-2 text-left
                                hover:bg-gray-100 bg-white border border-gray-300
                                 rounded-lg shadow-lg cursor-pointer"
                                onClick={handleLogout}
                            >
                               <Link href="/signIn">Logout</Link>
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Header
