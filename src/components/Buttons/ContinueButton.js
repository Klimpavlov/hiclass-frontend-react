'use client';

import React from "react";


const ContinueButton = ({buttonText, onClick, isSubmitting}) => {
    return (
        <button className={`flex justify-center items-center py-3 px-5
rounded-lg w-full ${isSubmitting ? "bg-green-800 text-white cursor-not-allowed" : "bg-green-800 text-white cursor-pointer"}
transition-transform duration-200 ease-in-out active:scale-95`}
                onClick={onClick}
                disabled={isSubmitting}>
            {buttonText}
        </button>
    )
}

export default ContinueButton