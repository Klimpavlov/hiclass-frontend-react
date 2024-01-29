import React from "react";
import App from "next/app";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";

const CreateClassBottom = () => {
    return (
            <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
                <div className="flex items-center gap-6 sm:gap-3 md:gap-4">
                    <ApplyButton/>
                    <ClearAllButton/>
                </div>
            </div>
    )
}

export default CreateClassBottom