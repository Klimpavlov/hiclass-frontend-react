'use client';

import React from "react";
import axios from "axios";


const ContinueButton = ({buttonText}) => {

    const postLoginData = () => {

        axios.post('http://localhost:7280/api/User/login', {
            Email: "Klimpaulau@icloud.com",
            Password: "111111"
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div onClick={postLoginData} className="flex justify-center items-center py-3 px-5
         rounded-lg w-full bg-green-800 text-white ">
            {buttonText}
        </div>
    )
}

export default ContinueButton