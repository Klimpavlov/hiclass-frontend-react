import React from "react";
import Image from "next/image";
import imgSrc from "@/components/Header/hiClass_logo.svg";
import imgFlagUK from "@/components/RegistrationHeader/FlagUnited Kingdom.svg";
import Link from "next/link";


const RegistrationHeader = () => {
    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                <Image src={imgSrc} alt="hiClass Logo" />
            </div>
            <div className="header-right flex items-center gap-6 sm:gap-3 md:gap-4">
                <Image src={imgFlagUK} alt="english logo"></Image>
                <div>English</div>
            </div>
        </div>
    )
}

export default RegistrationHeader