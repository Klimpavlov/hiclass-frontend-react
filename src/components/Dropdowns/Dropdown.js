'use client';

import React, {useState} from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";

const Dropdown = ({ dropdownFormText, placeholderText, options}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            {dropdownFormText}
            <div className="flex justify-between py-3 px-5 rounded-lg border
             border-neutral-200-b-2-b-7-bd bg-white shadow-xs
              text-neutral-9000-c-0-f-12 text-center font-inter
              text-base leading-6"
                 onClick={toggleDropdown}>
                <div className="">{placeholderText}</div>
                <Image className={`ml-1 ${isOpen ? "rotate-180" : ""}`} src={imgSrc} alt="hiClass chevronDown" />
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full
                 pm rumd:w-80 bg-white border rounded-lg border-neutral-200-b-2-b-7-bd shadow-xs">
                    <div className="py-2">
                        {options.map((option, index) => (
                            <div
                                className="py-3 px-3 flex items-center justify-between cursor-pointer"
                                key={index}
                            >
                                <span className="">{option}</span>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-green-500 rounded"
                                    checked
                                    onChange
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dropdown;