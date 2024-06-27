'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";

const Dropdown = ({ dropdownFormText, placeholderText, options, initialSelectedOptions, onChange  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([initialSelectedOptions]);

    useEffect(() => {
        setSelectedOptions(initialSelectedOptions)
    }, [initialSelectedOptions]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        const isOptionSelected = selectedOptions.includes(option);

        if (isOptionSelected) {
            const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
            setSelectedOptions(updatedOptions);
            onChange(updatedOptions);
        } else {
            const updatedOptions = [...selectedOptions, option];
            setSelectedOptions(updatedOptions);
            onChange(updatedOptions);
        }
    };

    const displayText = selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholderText;


    return (
        <div className="relative">
            {dropdownFormText}
            <div
                className="flex justify-between py-3 px-5 rounded-lg border border-neutral-200-b-2-b-7-bd bg-white shadow-xs text-neutral-9000-c-0-f-12 text-center font-inter text-base leading-6"
                onClick={toggleDropdown}
            >
                <div className="">{displayText}</div>
                <Image className={`ml-1 ${isOpen ? "rotate-180" : ""}`} src={imgSrc} alt="hiClass chevronDown" />
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full">
                <div className="py-2 max-h-60 overflow-y-auto">
                        {options.map((option, index) => (
                            <div
                                className="py-3 px-3 flex items-center justify-between cursor-pointer"
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                onChange={onChange}
                            >
                                <span className="">{option}</span>
                                <input type='checkbox' checked={selectedOptions.includes(option)}
                                       onChange={()=>handleOptionClick(option)}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
