import React from "react";

const DeleteAccountButton = ({ buttonText, onApply }) => {
    return (
        <button
            className=" py-3 mt-4 mx-auto rounded-lg bg-white text-red-700 text-sm font-medium shadow-xs"
            onClick={onApply}
        >
            {buttonText}
        </button>
    );
};

export default DeleteAccountButton;