import React from "react";

const ApplyButton = ({ buttonText, onApply, buttonRef }) => {
    return (
        <button
            className="px-5 py-3 mt-4 mx-auto rounded-lg bg-green-800 text-white text-sm font-medium shadow-xs"
            onClick={onApply} ref={buttonRef}
        >
            {buttonText}
        </button>
    );
};

export default ApplyButton;