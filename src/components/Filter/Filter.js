'use client';

import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import {useTranslations} from "next-intl";

const Filter = ({buttonText, onApply, options, clearAll, filterName, currentFilters}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    let filterRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);

    }, [])

    useEffect(() => {
        if (currentFilters[filterName]) {
            setSelectedOptions(currentFilters[filterName]);
        } else {
            setSelectedOptions([]);
        }
    }, [currentFilters, filterName]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionToggle = (option) => {
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

    const t = useTranslations("Filter")


    return (
        <div className="relative" ref={filterRef}>
            <div className="flex justify-between py-2 px-4 rounded-lg border border-neutral-200-b-2-b-7-bd bg-white shadow-xs text-neutral-9000-c-0-f-12 text-center font-inter text-base leading-6 cursor-pointer" onClick={toggleDropdown}>
                <div>{buttonText}</div>
                <Image className={`ml-1 ${isOpen ? "rotate-180" : ""}`} src={imgSrc} alt="hiClass chevronDown" />
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full md:w-80 bg-white border rounded-lg border-neutral-200-b-2-b-7-bd shadow-xs md:max-w-xs z-50">
                    <div className="py-2 max-h-60 overflow-y-auto">
                        {options.map((option, index) => (
                            <div className="py-3 px-3 flex items-center justify-between cursor-pointer"
                                 key={index} onClick={() => handleOptionToggle(option)}>
                                <span>{option}</span>
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded"
                                       checked={selectedOptions.includes(option)}
                                       onChange={() => handleOptionToggle(option)} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between px-3 py-2">
                        <ApplyButton buttonText={t("applyBtn")} onApply={handleApply}/>
                        <ClearAllButton buttonText={t("clearAllBtn")} clearAll={handleClearAll}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;
