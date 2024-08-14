import React from "react";
import {useTranslations} from "next-intl";

const GoogleButton = ({onClick}) => {
    const t = useTranslations("SignIn");

    return (
        <div className="flex justify-center items-center py-3 px-5 rounded-lg border border-gray-400 w-full cursor-pointer"
             onClick={onClick}>
            {t("googleBtn")}
        </div>
    )
}

export default GoogleButton