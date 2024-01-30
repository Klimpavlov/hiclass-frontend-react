'use client';

import React, {useState} from "react";
import CreateClassHeader from "@/components/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/СreateClass/CreateClassBody";
import postCreateClass from "@/components/СreateClass/postCreateClass/postCreateClass";

export default function CreateClassModal({ isModalOpen, setIsModalOpen, onCreateClass }) {

    const [title, setTitle] = useState('');
    const [gradeNumber, setGradeNumber] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [languageTitles, setLanguageTitles] = useState('');
    const [disciplineTitles, setDisciplineTitles] = useState('');

    const handlePostCreateClass = () => {
        postCreateClass(title, gradeNumber, photoUrl, languageTitles, disciplineTitles);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {isModalOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400">
                    <div className="modal-content bg-white p-4 rounded-lg">
                        <CreateClassHeader handleCloseModal={handleCloseModal}/>
                        <CreateClassBody/>
                        <CreateClassBottom handleCloseModal={handleCloseModal}
                                           handlePostCreateClass={handlePostCreateClass}/>
                    </div>
                </div>
            )}
        </>
    );
}
