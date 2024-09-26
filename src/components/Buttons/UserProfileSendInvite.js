import React from "react";
import {useTranslations} from "next-intl";

const UserProfileSendInviteBtn = ({buttonText, toast}) => {
    const t = useTranslations("DialogModal.Invitation")
    const handleClick = () => {
        if (toast && toast.current) {
            toast.current.show({
                severity: 'info',
                summary: t("please"),
                detail: t("chooseClassFromList"),
                life: 3000
            });
        }
    };

    return (
        <div>
            <div onClick={handleClick}
                 className="flex justify-center items-center cursor-pointer bg-green-900 text-white py-3 px-5 rounded-lg border border-gray-400">
                {buttonText}
            </div>
        </div>

    )
}

export default UserProfileSendInviteBtn