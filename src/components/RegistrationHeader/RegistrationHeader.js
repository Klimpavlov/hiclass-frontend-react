import React, {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from "@/components/Header/hiClass_logo.svg";
import imgUKFlag from '../RegistrationHeader/FlagUnited Kingdom.svg'
import imgRUFlag from '../RegistrationHeader/ru.svg'
import Link from "next/link";


const RegistrationHeader = () => {
    const router = useRouter()

    //current locale

    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

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
                <Image src={imgSrc} alt="hiClass Logo"/>
            </div>
            <div className="header-right flex items-center gap-6 sm:gap-3 md:gap-4">
                {/*<Image src={imgFlagUK} alt="english logo"></Image>*/}
                {/*<div>English</div>*/}
                <div>
                    <div className="cursor-pointer"
                         onClick={toggleLanguagesDropdown}>
                        {currentLanguage}
                    </div>
                    {isLanguagesDropdownOpen && (
                        <div className="absolute mt-3 right-0 mr-3 z-50 py-2 px-1 text-left text-sm bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer">
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
            </div>
        </div>
    )
}

export default RegistrationHeader