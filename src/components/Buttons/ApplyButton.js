import React from "react";

const ApplyButton = ({ buttonText, onApply, buttonRef, isSubmitting, isExpert }) => {

    const isDisabled = isSubmitting || isExpert;

    return (
        <button
            className={`px-5 py-3 mt-4 mx-auto rounded-lg text-sm font-medium shadow-xs 
            ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-green-800 text-white"}`}
            onClick={onApply} ref={buttonRef}
            disabled={isDisabled}
        >
            {buttonText}
        </button>
    );
};

export default ApplyButton;