import React, {useState, useEffect} from "react";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import Image from "next/image";
import {getClassInfo} from "@/app/[locale]/api/getClassProfile/getClassInfo";

const CreateClassBody = ({classId, setTitle, setPhoto, setSubjects, setGrades, setLanguage}) => {

    console.log(classId)

// get Class Info


    useEffect(() => {
        getClass()
    }, [])

    const [initialTitle, setInitialTitle] = useState('')
    const [initialSubjects, setInitialSubjects] = useState('');
    const [initialGrades, setInitialGrades] = useState('');
    const [initialLanguages, setInitialLanguages] = useState('');
    const [initialPhoto, setInitialPhoto] = useState('');

    async function getClass() {
        const accessToken = localStorage.getItem('accessToken');
        const classInfo = await getClassInfo(accessToken, classId)
        console.log(classInfo)

        setInitialTitle(classInfo.value.title)
        setInitialSubjects(classInfo.value.disciplines)
        setInitialGrades(classInfo.value.grade)
        setInitialLanguages(classInfo.value.languages)
        setInitialPhoto(classInfo.value.imageUrl)

    }

    console.log(initialTitle)

    setTitle(initialTitle)


    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setPhoto(file ? file : initialPhoto);

    };

    const [disciplines, setDisciplines] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    setSubjects(selectedDisciplines.length > 0 ? selectedDisciplines : initialSubjects)

    const [grades, setGrade] = useState([]);
    const [selectedGrades, setSelectedGrades] = useState([]);
    setGrades(selectedGrades.length > 0 ? selectedGrades : initialGrades);

    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    setLanguage(selectedLanguages.length > 0 ? selectedLanguages : initialLanguages)

    useEffect(() => {
        getUserDisciplines()
    }, []);

    async function getUserDisciplines() {
        const accessToken = localStorage.getItem('accessToken');
        const userProfile = await getUserProfile(accessToken);
        const availableDisciplines = userProfile.disciplineTitles;
        const availableGrades = userProfile.gradeNumbers;
        const availableLanguages = userProfile.languageTitles;
        setDisciplines(availableDisciplines);
        setGrade(availableGrades);
        setLanguages(availableLanguages);
    }

    return (
        <div className="flex flex-col sm:flex-row gap-5">
            <div className="section-photo w-full sm:w-1/2">
                <div>Class photo (required)</div>
                <div className="w-full border border-black aspect-w-3 aspect-h-4">
                    <div className="border border-black relative">
                        <label htmlFor="uploadImage" className="cursor-pointer block w-full h-full">
                            {selectedImage || initialPhoto ? (
                                <img
                                    src={selectedImage ? selectedImage : initialPhoto}
                                    alt="Uploaded"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center w-full h-full
                                     border-2 cursor-pointer">
                                    + Upload image
                                </div>
                            )}
                        </label>
                    </div>
                    <input
                        type="file"
                        id="uploadImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>
                <div>Minimum size of "808x632px". GIF files will not animate</div>
            </div>
            <div className='section-info w-full '>
                <InputForm inputFormText='Title' placeholderText='Class title'
                           value={initialTitle}
                           onChange={(e) => setInitialTitle(e.target.value)}/>
                <Dropdown dropdownFormText='Grade' placeholderText={initialGrades.length > 0 ? initialGrades.join(", ") : 'Select grade'}
                          options={grades} onChange={setSelectedGrades}/>

                <Dropdown dropdownFormText='Subjects' placeholderText={initialSubjects.length > 0 ? initialSubjects.join(", ") : "Select subject"}
                          options={disciplines} onChange={setSelectedDisciplines}/>
                <Dropdown dropdownFormText='Languages' placeholderText={initialLanguages.length > 0 ? initialLanguages.join(", ") :'Class languages'}
                          options={languages} onChange={setSelectedLanguages}/>
            </div>
        </div>
    )
}

export default CreateClassBody


