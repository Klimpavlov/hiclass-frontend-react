import React from "react";

const CreateClassHeader = ({ headerText, handleCloseModal }) => {
    return (
        <div className="flex justify-between items-center px-8 py-4 gap-8 max-w-screen-xl mx-auto">
            <div className="header-left flex items-center">
                {headerText}
            </div>
            <div
                className="header-right flex items-center gap-6 sm:gap-3 md:gap-4 cursor-pointer"
                onClick={handleCloseModal}
            >
                &times;
            </div>
        </div>
    );
};

export default CreateClassHeader;