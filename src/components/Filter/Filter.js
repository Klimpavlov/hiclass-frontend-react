'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import imgSrc from "@/components/Filter/chevron-down.svg";
import ApplyButton from "@/components/Buttons/ApplyButton";
import ClearAllButton from "@/components/Buttons/ClearAllButton";
import { useTranslations } from "next-intl";

const Filter = ({ buttonText, onApply, options, clearAll, filterName, currentFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const filterRef = useRef(null);
    const t = useTranslations("Filter");

    // Обработчик кликов вне области компонента и нажатия Enter
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // Новый обработчик нажатия клавиши Enter
        function handleKeyPress(event) {
            // Проверка нажатия Enter и открытости фильтра
            if (event.key === 'Enter' && isOpen) {
                handleApply();
            }
        }

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);

        // Удаление обработчиков при размонтировании
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, selectedOptions]);

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
        setSelectedOptions((prevOptions) =>
            prevOptions.includes(option) ? prevOptions.filter((item) => item !== option) : [...prevOptions, option]
        );
    };

    // Вызов handleApply() при нажатии Enter
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
        <div className="relative" ref={filterRef}>
            <div className="flex justify-between py-2 px-4 rounded-lg border border-neutral-200 bg-white shadow-xs text-neutral-900 text-center font-inter text-base leading-6 cursor-pointer" onClick={toggleDropdown}>
                <div>{buttonText}</div>
                <Image className={`ml-1 ${isOpen ? "rotate-180" : ""}`} src={imgSrc} alt="Chevron Down" />
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 md:w-80 bg-white border rounded-lg border-neutral-200 shadow-xs md:max-w-xs z-50">
                    <div className="py-2 max-h-60 overflow-y-auto">
                        {options.map((option, index) => (
                            <div className="py-3 px-3 flex items-center justify-between cursor-pointer" key={index} onClick={() => handleOptionToggle(option)}>
                                <span>{option}</span>
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500 rounded" checked={selectedOptions.includes(option)} onChange={() => handleOptionToggle(option)} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between px-3 py-2">
                        <ApplyButton buttonText={t("applyBtn")} onApply={handleApply} />
                        <ClearAllButton buttonText={t("clearAllBtn")} clearAll={handleClearAll} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;
