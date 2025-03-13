'use client';

import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";

const Dropdown = ({
                      dropdownFormText,
                      placeholderText,
                      options,
                      initialSelectedOptions,
                      onChange,
                      isSingleSelect = false
                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const initialSelectedState = initialSelectedOptions ? [initialSelectedOptions] : [];
    const [selectedOptions, setSelectedOptions] = useState(initialSelectedState);

    useEffect(() => {
        setSelectedOptions(initialSelectedOptions ? initialSelectedOptions : []);
    }, [initialSelectedOptions]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        if (isSingleSelect) {
            setSelectedOptions([option]);
            onChange([option]);
        } else {
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
        }
    };

    const displayText = selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholderText;

    return (
        <div className="relative" ref={dropdownRef}>
            {dropdownFormText}
            <div
                className="flex justify-between py-3 px-5 rounded-lg border border-gray-300-b-2-b-7-bd bg-white
                 shadow-xs text-neutral-9000-c-0-f-12 text-center font-inter text-base leading-6 cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className={selectedOptions.length === 0 ? "text-gray-400" : "text-black"}>
                    {displayText}
                </div>
                <Image className={`ml-1 ${isOpen ? "rotate-180" : ""}`} src={imgSrc} alt="hiClass chevronDown"/>
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
                                       onChange={() => handleOptionClick(option)}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
