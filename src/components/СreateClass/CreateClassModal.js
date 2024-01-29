'use client';

import React, { useState } from "react";
import CreateClassHeader from "@/components/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/СreateClass/CreateClassBody";

export default function CreateClassModal({ onCreateClass }) {
    const [className, setClassName] = useState("");
    const [classDescription, setClassDescription] = useState("");

    const handleClassNameChange = (e) => {
        setClassName(e.target.value);
    };

    const handleClassDescriptionChange = (e) => {
        setClassDescription(e.target.value);
    };

    const handleCreateClick = () => {
        const newClass = {
            id: Date.now(), // Генерируем уникальный ID класса
            name: className,
            description: classDescription,
        };

        onCreateClass(newClass);
        setClassName("");
        setClassDescription("");
    };

    const handleCancelClick = () => {
        setClassName("");
        setClassDescription("");
        // Закройте модальное окно или измените состояние, чтобы скрыть его
    };

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400">
            <div className="modal-content bg-white p-4 rounded-lg">
                <CreateClassHeader />
                <CreateClassBody />
                <CreateClassBottom />
            </div>
        </div>
    );
}
