import React from "react";
import {useTranslations} from "next-intl";

const FacebookButton = () => {
    const t = useTranslations("SignIn");

    return (
            <div className="flex justify-center items-center py-3 px-5 rounded-lg border border-gray-400 w-full">
                {t("facebookBtn")}
            </div>
    )
}

export default FacebookButton