import React, {useState} from "react";
import {useTranslations} from "next-intl";
import InviteExpertModal from "@/components/Expert/InviteExpertModal/InviteExpertModal";

const UserProfileSendInviteBtn = ({isExpert, isTeacher, buttonText, toast}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const t = useTranslations("DialogModal.Invitation")
    const handleClick = () => {
        if (isTeacher === true && isExpert === true || isTeacher === true && isExpert === false) {
            if (toast && toast.current) {
                toast.current.show({
                    severity: 'info',
                    summary: t("please"),
                    detail: t("chooseClassFromList"),
                    life: 3000
                });
            }
        }
        if (isTeacher === false && isExpert === true) {
                setIsModalOpen(true);
        }


    };

    return (
        <div>
            <div onClick={handleClick}
                 className="flex justify-center items-center cursor-pointer bg-green-900 text-white py-3 px-5 rounded-lg border border-gray-400">
                {buttonText}
            </div>
            {
                isModalOpen && <InviteExpertModal handleCloseModal={() => setIsModalOpen(false)} />
            }

        </div>

    )
}

export default UserProfileSendInviteBtn