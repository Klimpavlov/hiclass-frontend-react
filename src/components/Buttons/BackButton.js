'use client';

import React from "react";
import Image from "next/image";
import imgBackArrow from "../Buttons/BackArrow.svg";
import Link from "next/link";

const BackButton = ({buttonText}) => {
    return (
        <Link href='/myProfile'>
            <div className="flex">
                <Image src={imgBackArrow} alt="BackArrow"/>
                <span className="text-green-800 pl-3">{buttonText}</span>
            </div>
        </Link>

    );
};

export default BackButton;