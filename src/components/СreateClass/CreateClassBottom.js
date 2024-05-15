import React, {useRef} from "react";
import App from "next/app";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import postCreateClass from "@/app/postCreateClass/postCreateClass";

const CreateClassBottom = ({handleCloseModal, handlePostClass}) => {
    const handleClose = () => {
        handleCloseModal();
    }

    const buttonRef = useRef(null);

    const handleClick = () => {
        if (buttonRef.current && !buttonRef.current.disabled) {
            buttonRef.current.disabled = true;
            // Perform the action
            // After the action is complete, reset buttonRef.current.disabled to false
        }
    };

    const handlePost = () => {
        handlePostClass();
        handleClick()
    }
    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="flex items-center gap-6 sm:gap-3 md:gap-4">
                <ClearAllButton buttonText='Cancel' clearAll={handleClose}/>
                <ApplyButton buttonText='Create' onApply={handlePost} buttonRef={buttonRef}/>
            </div>
        </div>
    )
}

export default CreateClassBottom