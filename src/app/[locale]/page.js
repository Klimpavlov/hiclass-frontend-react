'use client';

import React, {useEffect, useState} from "react";
import Header from "@/components/Header/Header";
import TopSection from "@/components/TopSection/TopSection";
import Filter from "@/components/Filter/Filter";
import Switch from "@/components/Buttons/SwitchButton";
import ClassPreview from "@/components/ClassPreview/ClassPreview";
import {getAvailableDisciplines} from "@/app/[locale]/api/getAvailableDisciplines/getAvailableDisciplines";
import {getAvailableLanguages} from "@/app/[locale]/api/getAvailableLanguages/getAvailableLanguages";
import {getAvailableCountries} from "@/app/[locale]/api/getAvailableCountry/getAvailableCountries";
import {getDefaultSearch} from "@/app/[locale]/api/defaultSearch/defaultSearch";
import {searchRequest} from "@/app/[locale]/api/searchRequest/searchRequest";
import Tag from "@/components/Tags/Tag";
import ClassPreviewModal from "@/components/ClassPreview/ClassPreviewModal";
import {RingLoader} from "react-spinners";
import { useTranslations } from "next-intl";
import ruLocale from '/messages/ru.json';
import { usePathname } from 'next/navigation';
import Link from "next/link";


export default function ExplorePage() {

    //current locale

    const pathname = usePathname();
    const currentPathname = pathname.slice(1);

    // loader

    const [loading, setLoading] = useState(true);


    const [currentFilters, setCurrentFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // const [filtersNames, setFiltersNames] = useState('');
    const [languagesFilterName, setLanguagesFilterName] = useState('');
    const [countriesFilterName, setCountriesFilterName] = useState('');
    const [gradesFilterName, setGradesFilterName] = useState('');
    const [disciplinesFilterName, setDisciplinesFilterName] = useState('');

    const [selectedClass, setSelectedClass] = useState(null);

    const [currentSearchFilterName, setCurrentSearchFilterName] = useState('');

    //логика раскрытия класса
    const handleClassClick = (selectedClass, teacher) => {
        setSelectedClass(selectedClass);
        localStorage.setItem('selectedUserId', teacher.userId);

    };

    // disciplines mapping

    const disciplineMapping = {
        "Физика": "Physics",
        "География": "Geography",
        "Русская литература": "Russian literature",
        "Китайский язык как иностранный": "Chinese as a foreign language",
        "Информатика": "Computer science",
        "Изобразительное искусство": "Fine arts",
        "Краеведение": "Regional studies",
        "Мировое искусство": "World art",
        "Социальные науки": "Social science",
        "Проектная деятельность": "Project-based learning",
        "Русский язык": "Russian language",
        "Экономика": "Economics",
        "Астрономия": "Astronomy",
        "Музыка": "Music",
        "Каникулярное образование": "Vacation education",
        "Английский язык как иностранный": "English as a foreign language",
        "Декоративно-прикладное искусство": "Crafts",
        "Культурный обмен": "Cultural exchange",
        "Итальянский язык как иностранный": "Italian as a foreign language",
        "Математика": "Mathematics",
        "Технология": "Technology",
        "Французский язык как иностранный": "French as a foreign language",
        "Химия": "Chemistry",
        "Испанский язык как иностранный": "Spanish as a foreign language",
        "История": "History",
        "Немецкий язык как иностранный": "German as a foreign language",
        "Биология": "Biology",
        "Естествознание": "Natural science"
    };



    const handleFilterApply = (selectedFilter, filterName) => {
        // setCurrentFilters(selectedFilter);
        // console.log(selectedFilter)
        // console.log(filterName)
        // handleSearchRequest(selectedFilter, filterName)
        // setCurrentSearchFilterName(filterName);

        const updatedFilters = [...currentFilters, ...selectedFilter];

        const englishSelectedOptions = updatedFilters.map(option => {
            if (currentPathname === 'ru') {
                return disciplineMapping[option] || option; // Если перевод не найден, использовать оригинальное значение
            }
            return option;
        });

        if (currentPathname === 'ru') {
            setCurrentFilters(englishSelectedOptions) ;
        }

        else {
            setCurrentFilters(updatedFilters) ;
        }


        console.log(englishSelectedOptions)
        const filterValues = updatedFilters.join(', ') || englishSelectedOptions.join(', ') // Concatenate filter values in one line
        setCurrentSearchFilterName(filterName + ': ' + filterValues);

        if (currentPathname === 'ru') {
            handleSearchRequest(englishSelectedOptions, filterName);

        }
        else {
            handleSearchRequest(updatedFilters, filterName);
        }
        // handleSearchRequest(updatedFilters, filterName);
    };
    console.log(currentFilters)


    const handleClearAll = () => {
        setCurrentFilters([]);
        setSearchClassData([]);
    };

    const handleRemoveTag = (filter) => {
        // const updatedFilters = currentFilters.filter((selectedFilter) => selectedFilter !== filter);
        // setCurrentFilters(updatedFilters);
        //
        // // const updatedClassData = searchClassData.filter((prevSearchData) =>prevSearchData !== searchData);
        //
        // console.log(currentSearchFilterName)
        //
        // handleSearchRequest(updatedFilters, currentSearchFilterName);

        const updatedFilters = currentFilters.filter((selectedFilter) => selectedFilter !== filter);
        setCurrentFilters(updatedFilters);


        const filterValues = updatedFilters.join(', '); // Concatenate filter values in one line
        setCurrentSearchFilterName(currentSearchFilterName.split(':')[0] + ': ' + filterValues);

        handleSearchRequest(updatedFilters, currentSearchFilterName.split(':')[0]);
    };


    // disciplines


    const [disciplines, setDisciplines] = useState([]);
    const disciplinesFilter = 'Disciplines'


    useEffect(() => {
        getDisciplines()
    }, []);

    async function getDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const availableDisciplines = await getAvailableDisciplines(accessToken);
        // console.log(Object.keys(ruLocale.Disciplines))
        if (currentPathname === 'ru') {
            setDisciplines(Object.values(ruLocale.Disciplines))
        }
        else {
            setDisciplines(availableDisciplines);
        }
        // setDisciplines(availableDisciplines);
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
        if (currentPathname === 'ru') {
            setLanguages(Object.values(ruLocale.Languages))
        }
        else {
            setLanguages(availableLanguages);
        }
        // setLanguages(availableLanguages);
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
        async function defaultSearch() {
            const accessToken = localStorage.getItem('accessToken');
            const defaultSearch = await getDefaultSearch(accessToken);
            const teacherByCountry = defaultSearch.teacherProfilesByCountry
            setTeacherProfileData(teacherByCountry)
            console.log(defaultSearch)
            setTimeout(() => {
                setLoading(false)
            }, 1300)
        }

        defaultSearch()
    }, [])


    console.log(teacherProfileData)

    // search

    const [searchClassData, setSearchClassData] = useState([]);

    async function handleSearchRequest(selectedFilters, filterName) {
        const accessToken = localStorage.getItem('accessToken');

        const queryParameters = selectedFilters.map(filterValue => `${filterName}=${filterValue}`).join('&');

        console.log(selectedFilters)

        const searchUrl = `http://localhost:7280/api/Search/search-request?${queryParameters}`;

        try {
            const response = await searchRequest(accessToken, searchUrl);
            // Обработка полученных данных
            console.log(response)

            // const searchData = response.classProfiles
            const searchData = response.teacherProfiles
            setSearchClassData(searchData)

        } catch (error) {
            console.error(error);
        }
    }


    // translation

    const t = useTranslations("MainPage")
    const filtersTranslation = useTranslations("Filters");


    return (

        <main className="">
            {loading ? (
                <div className='flex items-center justify-center h-screen'>
                    <RingLoader
                        color={'#36d7b7'}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <>
                    <Header/>
                    <TopSection/>
                    <div
                        className="flex flex-col md:flex-row justify-between px-4 md:px-8 py-2 md:py-4 border-b border-b-gray">
                        <div className="flex flex-wrap gap-2 px-4 md:px-8">
                            <Filter buttonText={filtersTranslation('Subject')} options={disciplines} onApply={handleFilterApply}
                                    clearAll={handleClearAll} filterName={disciplinesFilterName}/>
                            <Filter buttonText={filtersTranslation('Grade')} options={grades} onApply={handleFilterApply}
                                    clearAll={handleClearAll} filterName={gradesFilterName}/>
                            <Filter buttonText={filtersTranslation('Language')} options={languages} onApply={handleFilterApply}
                                    clearAll={handleClearAll} filterName={languagesFilterName}/>
                            <Filter buttonText={filtersTranslation('Location')} options={countries} onApply={handleFilterApply}
                                    clearAll={handleClearAll} filterName={countriesFilterName}/>
                        </div>
                        <div className="show-experts px-4 md:px-8 flex items-center mt-4 md:mt-0">
                            <Switch/>
                            <span className="ml-2 md:ml-4">{t('showOnlyExperts')}</span>
                        </div>
                    </div>
                    <div className="applied-filters-container px-4 md:px-8">
                        <div className='px-4 md:px-8 pt-2 md:pt-4'>
                            {currentFilters.map((filter) => (
                                <span className='pl-2'>
                            <Tag text={filter} removeTag={true} onChange={() => handleRemoveTag(filter)}/>
                        </span>
                            ))}
                        </div>
                    </div>
                    <div className='p-4 sm:p-8 md:p-12 lg:p-16'>
                        <div className="clsCntMain mt-10 sm:mt-4 md:mt-6 lg:mt-8 grid grid-cols-1
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
                            <div className='font-bold'>{t('mostPopularClasses')}<span
                                className='text-green-700'>{t('Belarus')}</span>
                            </div>
                            <div className='text-green-700'>{t('seeAll')}</div>
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
                </>
            )}
        </main>
    );
}


