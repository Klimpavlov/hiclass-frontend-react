import React, {useEffect, useRef, useState} from "react";
import Tag from "@/components/Tags/Tag";
import imgSrc from '@/components/ClassPreview/class-menu-icon.svg';
import deleteClass from "@/app/[locale]/deleteClass/deleteClass";
import Image from "next/image";
import EditClassModal from "@/app/[locale]/editClass/EditClassModal";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import DialogModal from "@/components/ConfirmDialog/ConfirmDialog";
import {useTranslations} from "next-intl";

const ClassPreview = ({classId, title, username, tags, photo, showDropdown}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }

    const toggleDeleteDropdown = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [])

    const postDeleteClass = () => {
        setTimeout(() => {
            deleteClass({classId});
        }, 1500)
    }

    // translation

    const t = useTranslations('ClassPreview');

    return (
        <div className="class-preview ">
            <div className="class-preview-content">
                {/*<div className="class-preview-image">*/}
                {/*    <Image src={photo} alt="ClassImage" className="rounded-2xl" width={300} height={300}/>*/}
                {/*</div>*/}
                <div className="class-preview-image w-64 h-40 overflow-hidden rounded-2xl relative">
                    <Image
                        src={photo}
                        alt="ClassImage"
                        className="object-cover absolute inset-0 w-full h-full rounded-2xl"
                        layout="fill"
                    />
                </div>

                <div className='class-preview-header'>
                    <div className="avatar">{}</div>
                    <div className="username text-black font-bold cursor-pointer">{username}</div>
                </div>
                <div className="class-preview-text"> {title}</div>
                <div className="class-preview-footer flex justify-between">
                    <div className="class-preview-tags flex flex-wrap gap-2">
                        {tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                    </div>
                    {showDropdown && (
                        <>
                            <div ref={dropdownRef}>
                                <Image
                                    src={imgSrc}
                                    alt="menu-icon"
                                    className="cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {isDropdownOpen && (
                                    <div className="absolute">
                                        <div className="block w-20 py-2 px-4 sm:py-1 sm:px-2 text-left hover:bg-gray-100 bg-gray-200 border
                                          border-gray-300 rounded-lg shadow-lg cursor-pointer"
                                             onClick={toggleEditModal}>
                                            {t("editBtn")}
                                        </div>
                                        <div className="w-20 block py-2 px-4 sm:py-1 sm:px-2 text-left hover:bg-gray-100
                                         bg-gray-200 border border-gray-300 rounded-lg shadow-lg cursor-pointer mt-2"
                                             onClick={toggleDeleteDropdown}>
                                            {t("deleteBtn")}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {isEditModalOpen && (
                    <EditClassModal
                        classId={classId}
                        setIsModalOpen={setIsEditModalOpen}
                    />
                )}
                {isDeleteModalOpen && (
                   <DialogModal
                       classId={classId}
                       setIsModalOpen={setIsDeleteModalOpen}
                       postDelete={postDeleteClass}
                   />
                )}
            </div>
        </div>
    )
}

export default ClassPreview