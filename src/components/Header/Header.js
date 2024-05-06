'use client';

import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgChatButton from '../Header/tertiary-button.svg';
import imgAvatarSrc from '../Header/avatar40x40_Online.svg';
import imgChevronDownSrc from '../Header/chevron-down.svg';
import Link from 'next/link'
import {getUserProfile} from "@/app/api/getUserProfile/getUserProfile";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import DialogModal from "@/components/ConfirmDialog/ConfirmDialog";

const Header = () => {

    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen)
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

    const [isAvatarOpen, setIsAvatarOpen] = useState(false);

    const toggleAvatar = () => {
        setIsAvatarOpen(!isAvatarOpen)
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


    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo"/>
                <div className="flex flex-wrap justify-start ml-4">
                    <Link href="/" className="ml-6 my-2">Discover</Link>
                    <Link href="/myProfile" className="ml-6 my-2">My profile</Link>
                </div>
            </div>
            <div className="header-right flex items-center gap-6 sm:gap-3 md:gap-4">
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
                    <Image className={`${isDropdownOpen ? "rotate-180" : ""} cursor-pointer`} src={imgChevronDownSrc} alt="chevron-down"
                           onClick={toggleDropdown}/>
                    {isDropdownOpen && (
                        <div className="absolute right-5">
                            <button
                                className="py-2 px-4 sm:py-1 sm:px-2 text-left
                                hover:bg-gray-100 bg-white border border-gray-300
                                 rounded-lg shadow-lg cursor-pointer"
                                onClick={toggleConfirmDialog}
                            >Logout
                            </button>
                            {isConfirmDialogOpen && (
                                <DialogModal
                                    setIsModalOpen={setIsConfirmDialogOpen}
                                    postDelete={() => setTimeout(() => {
                                        router.push('/signIn')
                                    }, 1500)}
                                />
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Header
