import React from "react";

const CreateClassHeader = () => {
    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                Create class
            </div>
            <div className="header-right flex items-center gap-6 sm:gap-3 md:gap-4">
                &times;
            </div>
        </div>
    )
}

export default CreateClassHeader