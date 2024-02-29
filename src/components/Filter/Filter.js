'use client';

import React, {useState} from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";

const Filter = ({buttonText, onApply, options, clearAll, filterName}) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleSubjectToggle = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };



    const handleApply = () => {
        onApply(selectedOptions, filterName);
        toggleDropdown();
    };

    const handleClearAll = () => {
        clearAll();
        setSelectedOptions([]);
        toggleDropdown();
    };

    return (
        <div className="relative">
            <div
                className="flex justify-between py-2 px-4 rounded-lg border
                 border-neutral-200-b-2-b-7-bd bg-white shadow-xs
                  text-neutral-9000-c-0-f-12 text-center font-inter text-base leading-6"
                onClick={toggleDropdown}
            >
                <div className="">{buttonText}</div>
                <Image
                    className={`ml-1 ${isOpen ? "rotate-180" : ""}`}
                    src={imgSrc}
                    alt="hiClass chevronDown"
                />
            </div>
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 w-full md:w-80 bg-white border rounded-lg border-neutral-200-b-2-b-7-bd shadow-xs">
                    <div className="py-2">
                        {options.map((option, index) => (
                            <div
                                className="py-3 px-3 flex items-center justify-between cursor-pointer"
                                key={index}
                                onClick={() => handleSubjectToggle(option)}
                            >
                                <span className="">{option}</span>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-green-500 rounded"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleSubjectToggle(option)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-3 py-2">
                        <ApplyButton buttonText='Apply' onApply={handleApply}/>
                        <ClearAllButton buttonText='Clear all' clearAll={handleClearAll}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;