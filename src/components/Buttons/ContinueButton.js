'use client';

import React from "react";


const ContinueButton = ({buttonText, onClick}) => {
    return (
        <div  className="flex justify-center items-center py-3 px-5
         rounded-lg w-full bg-green-800 text-white cursor-pointer"
              onClick={onClick}>
            {buttonText}
        </div>
    )
}

export default ContinueButton