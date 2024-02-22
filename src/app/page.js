'use client';

import React, {useEffect, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import Filter from "@/components/Filter/Filter";
import Switch from "@/components/Buttons/SwitchButton";
import ClassesSection from "@/components/ClassesSection/ClassesSection";
import classPreview from "@/components/ClassPreview/ClassPreview";
import {useRouter} from "next/navigation";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";
import {getAvailableLanguages} from "@/app/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableCountries} from "@/app/api/getAvailableCountry/getAvailableCountries";
import {getDefaultSearch} from "@/app/api/defaultSearch/defaultSearch";

export default function ExplorePage() {

    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterApply = (selectedFilters) => {
        setSelectedFilters(selectedFilters);
    };

    const handleClearAll = () => {
        setSelectedFilters([]);
    };

    // disciplines

    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);

    useEffect(() => {
        getDisciplines()
    }, []);


    async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(availableDisciplines);
    }

    // grades

    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


    // languages

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        getLanguages()
    }, []);


    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(availableLanguages);
    }

    // countries

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries()
    }, [])

    async function getCountries() {
        const accessToken = localStorage.getItem('accessToken');
        const availableCountries = await getAvailableCountries(accessToken);
        setCountries(availableCountries);
    }


    // default search

    useEffect(() => {
        defaultSearch()
    }, [])
    async function defaultSearch() {
        const accessToken = localStorage.getItem('accessToken');
        const defaultSearch = await getDefaultSearch(accessToken);
        console.log(defaultSearch)
    }


    return (
        <main className="">
            <Header />
            <TopSection />
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-2 md:py-4 border-b border-b-gray">
                <div className="flex flex-wrap gap-2 px-4 md:px-8">
                    <Filter buttonText="Subject" options={disciplines} onApply={handleFilterApply} clearAll={handleClearAll} />
                    <Filter buttonText="Grade" options={grades} onApply={handleFilterApply} clearAll={handleClearAll} />
                    <Filter buttonText="Language" options={languages} onApply={handleFilterApply} clearAll={handleClearAll} />
                    <Filter buttonText="Location" options={countries} onApply={handleFilterApply} clearAll={handleClearAll} />
                </div>
                <div className="show-experts px-4 md:px-8 flex items-center mt-4 md:mt-0">
                    <Switch />
                    <span className="ml-2 md:ml-4">Show only experts</span>
                </div>
            </div>
            <div className="applied-filters-container">
                <div>
                    {selectedFilters.map((filter, index) => (
                        <span key={index}>{filter + " "}</span>
                    ))}
                </div>
            </div>
            {/*<ClassesSection selectedFilters={selectedFilters} />*/}
        </main>
    );
}