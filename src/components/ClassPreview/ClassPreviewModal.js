import Image from "next/image";
import imgSrc from "@/components/ClassPreview/class-preview-image.svg";
import Tag from "@/components/Tags/Tag";
import React, {useState} from "react";
import ApplyButton from "@/components/Buttons/ApplyButton";
import postInviteClass from "@/app/postInviteClass/postInviteClass";
import InviteModal from "@/components/InviteClass/InviteModal";

const ClassPreviewModal = ({headerText, title, username, tags, handleCloseModal, classId}) => {

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const handleOpenInviteModal = () => {
        setIsInviteModalOpen(true);
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
                    <ApplyButton buttonText='Invite class' onApply={handleOpenInviteModal}/>
                </div>
                <div className='class-preview-username&avatar'>
                    <div className="avatar">{}</div>
                    <div className="username text-black text-sm font-bold cursor-pointer">{username}</div>
                </div>
                <div className="class-preview-image ">
                    <Image src={imgSrc} alt="ClassImage" className="w-full h-auto" width={300} height={300}/>
                </div>
                <div className='class-preview-header'>
                    <div className="avatar">{}</div>
                </div>
                <div className="class-preview-text"> {title}</div>
                <div className="class-preview-footer">
                    <div className="class-preview-tags flex flex-wrap gap-2">
                        {tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                    </div>
                </div>
            </div>
            {isInviteModalOpen && (
                <InviteModal username={username}/>
            )}
        </div>
    );
};

export default ClassPreviewModal