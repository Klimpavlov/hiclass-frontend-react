import React from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import imgGoogleLogo from "../Buttons/GoogleLogo.svg";


const GoogleButton = ({onClick}) => {
    const t = useTranslations("SignIn");

    return (
        <div className="flex justify-center items-center py-3 px-5 rounded-lg font-semibold border border-gray-400 w-full cursor-pointer"
             onClick={onClick}>
            <Image src={imgGoogleLogo} alt='googleLogo' className='mr-2'/>
            {t("googleBtn")}
        </div>
    )
}

export default GoogleButton