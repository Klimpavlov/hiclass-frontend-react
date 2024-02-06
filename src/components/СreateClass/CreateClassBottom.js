import React from "react";
import App from "next/app";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";

const CreateClassBottom = ({handleCloseModal, handlePostCreateClass}) => {
    const handleClose = () => {
        handleCloseModal();
    }

    const handlePost = () => {
        handlePostCreateClass();

    }
    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="flex items-center gap-6 sm:gap-3 md:gap-4">
                <ClearAllButton buttonText='Cancel' clearAll={handleClose}/>
                <ApplyButton buttonText='Create' onApply={handlePost}/>
            </div>
        </div>
    )
}

export default CreateClassBottom