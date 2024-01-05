'use client';

import React, {useState} from "react";
import Image from "next/image";
import imgSrc from '../Header/hiClass_logo.svg';
import imgChatButton from '../Header/tertiary-button.svg';
import imgAvatarSrc from '../Header/avatar40x40_Online.svg';
import imgChevronDownSrc from '../Header/chevron-down.svg';
import Link from 'next/link'

// const Hero = ({heading, message}) => {
//     return (
//         <div className='flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img'>
//             <div className='absolute top-0 bottom-0 right-0 left-0 bg-black/70 z-[2]'/>
//             <div className='p-5 text-white z-[2]'>
//                 <h2 className='text-5xl font-bold'>{heading}</h2>
//                 <p className='py-5 text-xl'>{message}</p>
//                 <button className='px-8 py-2 border'>Book</button>
//             </div>
//         </div>
//     )
// }
// export default Hero

const Header = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout");

    };


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
                    <Image className='' src={imgAvatarSrc} alt="avatar-header"  />
                    <Image className='' src={imgChevronDownSrc} alt="chevron-down" onClick={toggleDropdown} />
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-10">
                            <button
                                className="block py-2 px-4 sm:py-1 sm:px-2 text-left hover:bg-gray-100 bg-white border border-gray-300 rounded-lg shadow-lg"
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
