import React from "react";

const ApplyButton = ({ onApply }) => {
    return (
        <button
            className="flex items-center justify-center px-5 py-3 mt-4 mx-auto rounded-lg bg-green-800 text-white text-sm font-medium shadow-xs"
            onClick={onApply}
        >
            Apply
        </button>
    );
};

export default ApplyButton;