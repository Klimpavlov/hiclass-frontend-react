'use client';

import React, {useEffect, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import Filter from "@/components/Filter/Filter";
import Switch from "@/components/Buttons/SwitchButton";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import {getAvailableDisciplines} from "@/app/api/getAvailableDisciplines/getAvailableDisciplines";
import {getAvailableLanguages} from "@/app/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableCountries} from "@/app/api/getAvailableCountry/getAvailableCountries";
import {getDefaultSearch} from "@/app/api/defaultSearch/defaultSearch";
import {searchRequest} from "@/app/api/searchRequest/searchRequest";
import Tag from "@/components/Tags/Tag";
import ClassPreviewModal from "@/components/ClassPreview/ClassPreviewModal";
import {RingLoader} from "react-spinners";


export default function ExplorePage() {
    // loader

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    })

    // filters

    const [selectedFilters, setSelectedFilters] = useState([]);
    // const [filterName, setFilterName] = useState('');
    const [languagesFilterName, setLanguagesFilterName] = useState('');
    const [countriesFilterName, setCountriesFilterName] = useState('');
    const [gradesFilterName, setGradesFilterName] = useState('');
    const [disciplinesFilterName, setDisciplinesFilterName] = useState('');

    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    //логика раскрытия класса
    const handleClassClick = (selectedClass, teacher) => {
        setSelectedClass(selectedClass);
        setSelectedTeacher(teacher)
        localStorage.setItem('selectedUserId', teacher.userId);

    };

    // console.log(selectedTeacher && selectedTeacher.email);



    const handleFilterApply = (selectedFilters, filterName) => {
        setSelectedFilters(selectedFilters);
        console.log(selectedFilters)
        console.log(filterName)
        handleSearchRequest(selectedFilters, filterName)
    };

    const handleClearAll = () => {
        setSelectedFilters([]);
        setSearchClassData([]);
    };

    // disciplines

    const [disciplines, setDisciplines] = useState([]);
    const disciplinesFilter = 'Disciplines'

    useEffect(() => {
        getDisciplines();
    }, []);

    async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        setDisciplines(availableDisciplines);
        setDisciplinesFilterName(disciplinesFilter)
    }

    // grades

    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const gradesFilter = 'Grades'
    useEffect(() => {
        setGradesFilterName(gradesFilter);
    }, []);


    // languages

    const [languages, setLanguages] = useState([]);
    const languagesFilter = 'Languages'

    useEffect(() => {
        getLanguages()
    }, []);


    async function getLanguages() {
        const accessToken = localStorage.getItem('accessToken');
        const availableLanguages = await getAvailableLanguages(accessToken);
        setLanguages(availableLanguages);
        setLanguagesFilterName(languagesFilter)
    }

    // countries

    const [countries, setCountries] = useState([]);
    const countriesFilter = 'Countries'

    useEffect(() => {
        getCountries()
    }, [])

    async function getCountries() {
        const accessToken = localStorage.getItem('accessToken');
        const availableCountries = await getAvailableCountries(accessToken);
        setCountries(availableCountries);
        setCountriesFilterName(countriesFilter)
    }


    // default search

    const [teacherProfileData, setTeacherProfileData] = useState([]);

    useEffect(() => {
        defaultSearch()
    }, [])

    async function defaultSearch() {
        const accessToken = localStorage.getItem('accessToken');
        const defaultSearch = await getDefaultSearch(accessToken);

        const teacherByCountry = defaultSearch.teacherProfilesByCountry
        setTeacherProfileData(teacherByCountry)

        console.log(defaultSearch)
    }


    console.log(teacherProfileData)

    // search

    const [searchClassData, setSearchClassData] = useState([]);

    async function handleSearchRequest(selectedFilters, filterName) {
        const accessToken = localStorage.getItem('accessToken');

        // const queryParameters = selectedFilters.map(filter => `Countries=${filter}`).join('&');

        const queryParameters = selectedFilters.map(filterValue => `${filterName}=${filterValue}`).join('&');


        console.log(selectedFilters)
        // const searchUrl = `http://localhost:7280/api/Search/search-request?${queryParameters}`;

        const searchUrl = `http://localhost:7280/api/Search/search-request?${queryParameters}`;

        try {
            const response = await searchRequest(accessToken, searchUrl);
            // Обработка полученных данных
            console.log(response)

            const searchData = response.teacherProfiles
            setSearchClassData(searchData)

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <main className="">
            {/*{loading ? (*/}
            {/*    <div className='flex items-center justify-center h-screen'>*/}
            {/*        <RingLoader*/}
            {/*            color={'#36d7b7'}*/}
            {/*            loading={loading}*/}
            {/*            size={150}*/}
            {/*            aria-label="Loading Spinner"*/}
            {/*            data-testid="loader"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <>*/}
            <Header/>
            <TopSection/>
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-2 md:py-4 border-b border-b-gray">
                <div className="flex flex-wrap gap-2 px-4 md:px-8">
                    <Filter buttonText="Subject" options={disciplines} onApply={handleFilterApply}
                            clearAll={handleClearAll} filterName={disciplinesFilterName}/>
                    <Filter buttonText="Grade" options={grades} onApply={handleFilterApply}
                            clearAll={handleClearAll} filterName={gradesFilterName}/>
                    <Filter buttonText="Language" options={languages} onApply={handleFilterApply}
                            clearAll={handleClearAll} filterName={languagesFilterName}/>
                    <Filter buttonText="Location" options={countries} onApply={handleFilterApply}
                            clearAll={handleClearAll} filterName={countriesFilterName}/>
                </div>
                <div className="show-experts px-4 md:px-8 flex items-center mt-4 md:mt-0">
                    <Switch/>
                    <span className="ml-2 md:ml-4">Show only experts</span>
                </div>
            </div>
            <div className="applied-filters-container">
                <div>
                    {selectedFilters.map((filter, index) => (
                        <Tag key={index} text={filter}/>
                    ))}
                </div>
            </div>
            <div className='p-4 sm:p-8 md:p-12 lg:p-16'>
                <div  className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1
                     sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
                    {searchClassData.map((teacher) => (
                        teacher.classDtos.map((classInfo) => (
                            <div key={classInfo.classId} onClick={() => handleClassClick(classInfo, teacher)}>
                                <ClassPreview key={classInfo.classId}
                                              title={classInfo.title}
                                              username={classInfo.userFullName}
                                              tags={classInfo.disciplines}
                                              photo={classInfo.imageUrl}
                                ></ClassPreview>
                            </div>
                        ))))}
                </div>
                <div className='flex justify-between mt-4 md:mt-8'>
                    <div className='font-bold'>Most popular classes in <span className='text-green-700'>Belarus</span>
                    </div>
                    <div className='text-green-700'>See all</div>
                </div>
                <div
                    className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1
                     sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
                    {teacherProfileData.map((teacher) => (
                        teacher.classDtos.map((classInfo) => (
                            <div key={classInfo.classId} onClick={() => handleClassClick(classInfo, teacher)}>
                                <ClassPreview key={classInfo.classId}
                                              title={classInfo.title}
                                              username={classInfo.userFullName}
                                              tags={classInfo.disciplines}
                                              photo={classInfo.imageUrl}
                                ></ClassPreview>
                            </div>
                        ))))}
                </div>

                {selectedClass && (
                    <ClassPreviewModal
                        headerText='Lorem ipsum dolor sit amet consectetur. Sapien lectus platea magna sed .'
                        classId={selectedClass.classId}
                        title={selectedClass.title}
                        username={selectedClass.userFullName}
                        tags={selectedClass.disciplines}
                        photo={selectedClass.imageUrl}
                        handleCloseModal={() => setSelectedClass(null)}
                    ></ClassPreviewModal>
                )}
            </div>
            {/*    </>*/}
            {/*)}*/}
        </main>
    );
}