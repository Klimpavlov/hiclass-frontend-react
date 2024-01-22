'use client';

import React from "react";
import postLoginData from "@/app/signIn/postLoginData";


const ContinueButton = ({buttonText}) => {
    return (
        <div onClick={postLoginData} className="flex justify-center items-center py-3 px-5
         rounded-lg w-full bg-green-800 text-white ">
            {buttonText}
        </div>
    )
}

export default ContinueButton