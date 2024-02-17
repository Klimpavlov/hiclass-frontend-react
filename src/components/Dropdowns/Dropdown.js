'use client';

import React, { useState } from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";

const Dropdown = ({ dropdownFormText, placeholderText, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        const isOptionSelected = selectedOptions.includes(option);

        if (isOptionSelected) {
            const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
            setSelectedOptions(updatedOptions);
        } else {
            const updatedOptions = [...selectedOptions, option];
            setSelectedOptions(updatedOptions);
        }
    };

    const displayText = selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholderText;

    return (
        <div className="">
            {dropdownFormText}
            <div
                className="flex justify-between py-3 px-5 rounded-lg border border-neutral-200-b-2-b-7-bd bg-white shadow-xs text-neutral-9000-c-0-f-12 text-center font-inter text-base leading-6"
                onClick={toggleDropdown}
            >
                <div className="">{displayText}</div>
                <Image className={`ml-1 ${isOpen ? "rotate-180" : ""}`} src={imgSrc} alt="hiClass chevronDown" />
            </div>
            {isOpen && (
                <div className="">
                    <div className="py-2">
                        {options.map((option, index) => (
                            <div
                                className="py-3 px-3 flex items-center justify-between cursor-pointer"
                                key={index}
                                onClick={() => handleOptionClick(option)}
                            >
                                <span className="">{option}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;



{/*<input*/}
{/*    type="checkbox"*/}
{/*    className="form-checkbox h-4 w-4 text-green-500 rounded"*/}
{/*    checked*/}
{/*    onChange*/}
{/*/>*/}