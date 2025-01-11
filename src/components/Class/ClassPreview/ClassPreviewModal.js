import Image from "next/image";
import Tag from "@/components/Tags/Tag";
import React, {useEffect, useState} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import InviteModal from "@/components/Class/InviteClass/InviteModal";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import imgDefaultClass from "@/components/Class/ClassPreview/defaultClassImage.jpg";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const ClassPreviewModal = ({
                               headerText,
                               title,
                               username,
                               tags,
                               grade,
                               handleCloseModal,
                               classId,
                               photo,
                               handleCloseClassPreviewModal,
                               isOnlyExpert
                           }) => {
    const router = useRouter()

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    console.log(isOnlyExpert);

    const handleOpenInviteModal = () => {
        setIsInviteModalOpen(true);
    };

    const handleOpenUserProfile = (username) => {
        // setSelectedUsername(username);

        router.push('/otherUserProfile')
        // setIsProfileOpen(true);
    };

    const t = useTranslations("InviteModal");
    const toastInvitationTranslation = useTranslations("DialogModal.Invitation")
    const gradeTranslation = useTranslations("Grade")

    return (
        <div className="class-preview fixed inset-0 flex items-center justify-center bg-white z-50 overflow-y-auto">
            {/*<div className="class-preview-close absolute top-4 right-4 cursor-pointer text-gray-500"*/}
            {/*     onClick={handleCloseModal}>*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />*/}
            {/*    </svg>*/}
            {/*</div>*/}
            <div className="class-preview-content max-w-3xl w-full mx-auto p-8">
                <div className='class-preview-header flex justify-between items-center'>
                    <div className='class-preview-text text-xl font-bold'>{headerText}</div>
                    <div className="class-preview-close cursor-pointer text-gray-500"
                         onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                    {/*<ApplyButton buttonText='Invite class' onApply={handleOpenInviteModal}/>*/}
                </div>
                <div className='class-preview-username&avatar my-4 flex items-center'>
                    <div className="avatar">{}</div>
                    <div className="username text-black text-sm font-bold cursor-pointer"
                         onClick={handleOpenUserProfile}>{username}</div>
                </div>
                <div className="class-preview-image w-64 h-40 overflow-hidden rounded-2xl relative">
                    <Image
                        src={photo ? photo : imgDefaultClass}
                        alt="ClassImage"
                        className="object-cover absolute inset-0 w-full h-full rounded-2xl"
                        layout="fill"
                    />
                </div>
                <div className='class-preview-header flex justify-between items-center'>
                    <div className="avatar">{}</div>
                </div>
                <div className="class-preview-text"> {title}</div>

                <div className="class-preview-footer flex justify-between items-center mt-4">
                    <div className="class-preview-tags flex flex-wrap gap-2">
                        <div>{tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                        </div>
                        <div>
                            <Tag key={grade} text={grade + gradeTranslation("grade")}></Tag>
                        </div>
                    </div>
                    <div>
                        {/*<ApplyButton buttonText={t("inviteBtn")} onApply={handleOpenInviteModal}*/}
                        {/*             isSubmitting={isOnlyExpert}/>*/}
                        <TooltipProvider>
                            {isOnlyExpert ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <ApplyButton
                                                buttonText={t("inviteBtn")}
                                                onApply={handleOpenInviteModal}
                                                isSubmitting={isOnlyExpert}
                                                disabled={isOnlyExpert}
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        {toastInvitationTranslation("positionError")}
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <ApplyButton buttonText={t("inviteBtn")} onApply={handleOpenInviteModal} />
                            )}
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            {isInviteModalOpen && (
                <InviteModal username={username}
                             classId={classId}
                             disciplines={tags}
                             handleCloseModal={() => setIsInviteModalOpen(false)}
                             handleCloseClassPreviewModal={handleCloseClassPreviewModal}/>
            )}
        </div>
    );
};

export default ClassPreviewModal