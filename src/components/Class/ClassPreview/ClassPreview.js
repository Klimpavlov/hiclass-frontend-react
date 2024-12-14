'use client'

import React, {useEffect, useRef, useState} from "react";
import Tag from "@/components/Tags/Tag";
import imgSrc from '@/components/Class/ClassPreview/class-menu-icon.svg';
import deleteClass from "@/app/[locale]/api/class/deleteClass/deleteClass";
import Image from "next/image";
import EditClassModal from "@/components/Class/EditClass/EditClassModal";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import DialogModal from "@/components/ConfirmDialog/ConfirmDialog";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import imgDefaultClass from "./defaultClassImage.jpg";
import defaultUserImage from "@/components/User/UserInfo/avatar-default.svg";


const ClassPreview = ({
                          classId,
                          title,
                          username,
                          tags,
                          grade,
                          photo,
                          showDropdown,
                          userAvatar,
                          onEditClass,
                          onDeleteClass
                      }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState("right");

    const toast = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }

    const toggleDeleteDropdown = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            if (rect.right > viewportWidth) {
                setDropdownPosition("left");
            } else {
                setDropdownPosition("right");
            }
        }
    }, [isDropdownOpen]);

    // translation
    const t = useTranslations('ClassPreview');
    const gradeTranslation = useTranslations("Grade")
    const deleteClassTranslation = useTranslations("DialogModal.DeleteClass");

    // const postDeleteClass = () => {
    //     setTimeout(() => {
    //         deleteClass({classId}, toast, deleteClassTranslation);
    //     }, 1500);
    // };

    const postDeleteClass = async () => {
        const isDeleted = await deleteClass({classId}, toast, deleteClassTranslation);
        if (isDeleted) {
            onDeleteClass();
        }
    };

    return (
        <div className="class-preview w-64">
            <ErrorNotification ref={toast}/>
            <div className="class-preview-content">
                <div className="class-preview-image w-64 h-40 overflow-hidden rounded-2xl relative">
                    <Image
                        src={photo ? photo : imgDefaultClass}
                        alt="ClassImage"
                        className="object-cover absolute inset-0 w-full h-full rounded-2xl"
                        layout="fill"
                    />
                </div>
                <div className='class-preview-header flex items-center mt-1'>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                        <Image
                            src={userAvatar || defaultUserImage}
                            alt="userAvatar"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <div className="username text-black font-bold cursor-pointer ml-1">{title}</div>
                </div>
                <div className="class-preview-text"> {username}</div>
                <div className="class-preview-footer flex justify-between">
                    <div className="class-preview-tags flex flex-wrap gap-2">
                        <div>{tags.map((title) => (
                            <Tag key={title} text={title}></Tag>
                        ))}
                        </div>
                        <div>
                            <Tag key={grade} text={grade + gradeTranslation("grade")}></Tag>
                        </div>
                    </div>
                    {showDropdown && (
                        <>
                            <div ref={dropdownRef} className="relative">
                                <Image
                                    src={imgSrc}
                                    alt="menu-icon"
                                    className="cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                                {isDropdownOpen && (
                                    <div
                                        className={`absolute mt-2 z-50 py-2 px-1 text-left text-sm bg-white border border-gray-300 rounded-lg shadow-lg cursor-pointer ${
                                            dropdownPosition === "right" ? "right-0" : "left-0"
                                        }`}>
                                        <div
                                            className="px-2 sm:pr-20 hover:text-green-700 cursor-pointer hover:bg-green-50"
                                            onClick={toggleEditModal}>
                                            {t("editBtn")}
                                        </div>
                                        <div
                                            className="px-2 sm:pr-20 hover:text-green-700 cursor-pointer hover:bg-green-50 mt-2"
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
                        onEditClass={onEditClass}
                    />
                )}
                {isDeleteModalOpen && (
                    <DialogModal
                        classId={classId}
                        setIsModalOpen={setIsDeleteModalOpen}
                        postDelete={postDeleteClass}
                        toast={toast}
                    />
                )}
            </div>
        </div>
    );
}

export default ClassPreview;
