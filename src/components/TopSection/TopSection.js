import React from "react";
import {useTranslations} from "next-intl";

const TopSection = () => {
    const userName = localStorage.getItem('userName');

    const t = useTranslations('MainPage')
    return (
        <div className="flex items-center justify-center px-4 md:px-8 py-8 md:py-16 bg-gray-100">
            <div className="title-and-subtitle text-center">
                <div className="text-sm sm:text-4xl whitespace-pre-line">
                    <div>{t("Hi")}, <span className="">{userName}</span></div>
                    <div>{t("TopSectionText")}</div>
                </div>
                <div className="mt-4 md:mt-8 ">{t("TopSectionFooterText")}</div>
            </div>
        </div>
    )
}

export default TopSection