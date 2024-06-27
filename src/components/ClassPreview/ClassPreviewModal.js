import Image from "next/image";
import imgSrc from "@/components/ClassPreview/class-preview-image.svg";
import Tag from "@/components/Tags/Tag";
import React, {useState} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import postInviteClass from "@/app/[locale]/postInviteClass/postInviteClass";
import InviteModal from "@/components/InviteClass/InviteModal";
import OtherUserInfo from "@/components/OtherUserInfo/OtherUserInfo";
import {useRouter} from "next/navigation";

const ClassPreviewModal = ({headerText, title, username, tags, handleCloseModal, classId, photo}) => {
    const router = useRouter()

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const handleOpenInviteModal = () => {
        setIsInviteModalOpen(true);
    };

    const [selectedUsername, setSelectedUsername] = useState("");

    const handleOpenUserProfile = (username) => {
        // setSelectedUsername(username);

        router.push('/otherUserProfile')
        // setIsProfileOpen(true);
    };

    return (
        <div className="class-preview fixed inset-0 flex items-center justify-center bg-white z-50 overflow-y-auto">
            <div className="class-preview-close absolute top-4 right-4 cursor-pointer text-gray-500"
                 onClick={handleCloseModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div className="class-preview-content max-w-3xl w-full mx-auto p-8">
                <div className='class-preview-header flex justify-between items-center'>
                    <div className='class-preview-text text-xl font-bold'>{headerText}</div>
                    {/*<ApplyButton buttonText='Invite class' onApply={handleOpenInviteModal}/>*/}
                </div>
                <div className='class-preview-username&avatar my-4 flex items-center'>
                    <div className="avatar">{}</div>
                    <div className="username text-black text-sm font-bold cursor-pointer" onClick={handleOpenUserProfile}>{username}</div>
                </div>
                <div className="class-preview-image w-64 h-40 overflow-hidden rounded-2xl relative">
                    <Image
                        src={photo}
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
                        {tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                    </div>
                    <div>
                        <ApplyButton buttonText='Invite class' onApply={handleOpenInviteModal}/>
                    </div>
                </div>
            </div>
            {isInviteModalOpen && (
                <InviteModal username={username}
                             classId={classId}
                             disciplines={tags}
                             handleCloseModal={() => setIsInviteModalOpen(false)}/>
            )}
        </div>
    );
};

export default ClassPreviewModal