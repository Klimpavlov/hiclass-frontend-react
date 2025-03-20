import React, {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import imgSrc from "@/components/Header/hiClass_logo.svg";
import imgUKFlag from './FlagUnited Kingdom.svg'
import imgRUFlag from './ru.svg'
import Link from "next/link";
import {useTranslations} from "next-intl";
import {ModeToggle} from "@/components/theme/toggle-theme/modeToggle";


const RegistrationHeader = () => {
    const router = useRouter()
    // const [loading, setLoading] = useState(false);

    //current locale

    const pathname = usePathname();
    const locale = pathname.slice(1, 3);

    let languageRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (languageRef.current && !languageRef.current.contains(event.target)) {
                setIsLanguagesDropdownOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, []);

    const handleNavigation = async (href) => {
        if (pathname === href) {
            // setLoading(true);
            await router.refresh();
            // setLoading(false);
        } else {
            router.push(href);
        }
    };

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

    const t = useTranslations("Header");

    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo" className='cursor-pointer'
                       onClick={() => handleNavigation(`/${locale}/signIn`)}
                />
            </div>
            <div className="header-right flex items-center gap-6 sm:gap-3 md:gap-4">
                {/*<Image src={imgFlagUK} alt="english logo"></Image>*/}
                {/*<div>English</div>*/}
                <div>
                    <div className="cursor-pointer" ref={languageRef}
                         onClick={toggleLanguagesDropdown}>
                        {currentLanguage}
                    </div>
                    {isLanguagesDropdownOpen && (
                        <div
                            className="absolute mt-3 right-0 mr-3 z-50 py-2 px-1 text-left text-sm bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer">
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
                {/*<ModeToggle/>*/}
            </div>
        </div>
    )
}

export default RegistrationHeader