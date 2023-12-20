'use client';

import React, {useState} from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";

const Filter = ({buttonText}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const subjects = ["Математика", "Физика", "История", "География"]; // Список предметов

    return (
        <div className="relative">
            <div className='flex justify-between py-2 px-4 rounded-lg border border-neutral-200-b-2-b-7-bd bg-white shadow-xs
         text-neutral-9000-c-0-f-12 text-center font-inter text-base leading-6'
                 onClick={toggleDropdown}>
                <div className="">
                    {buttonText}
                </div>
                <Image className={`ml-1 ${isOpen ? 'rotate-180' : ''}`} src={imgSrc} alt="hiClass chevronDown"/>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white border rounded-lg
                  border-neutral-200-b-2-b-7-bd shadow-xs">
                    <div className="py-2 ">
                        {subjects.map((subject, index) => (
                            <div className='py-3 px-3 ' key={index}>{subject}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;


// import React from "react";
//
// const Filter = ({buttonText}) => {
//     return (
//         <div className="py-2 px-4 rounded-lg border border-neutral-200-b-2-b-7-bd
//          bg-white shadow-xs text-neutral-9000-c-0-f-12
//           text-center font-inter text-base leading-6">
//             {buttonText}
//         </div>
//     )
// }
//
// export default Filter