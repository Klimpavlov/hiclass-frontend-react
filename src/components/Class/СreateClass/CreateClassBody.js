import React, {useState, useEffect} from "react";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import {getUserProfile} from "@/app/[locale]/api/user/getUserProfile/getUserProfile";
import Image from "next/image";
import {getClassInfo} from "@/app/[locale]/api/class/getClassProfile/getClassInfo";
import {useTranslations} from "next-intl";
import ruLocale from "../../../../messages/ru.json";
import {usePathname} from "next/navigation";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "../../../../mapping/languagesMapping/languagesMapping.json";
import {reverseTranslateItems} from "@/app/[locale]/api/translateItems/reverseTranslateItems";


const CreateClassBody = ({classId, setTitle, setPhoto, setSubjects, setGrades, setLanguage}) => {

    //current locale
    const pathname = usePathname();
    const currentPathname = pathname.slice(1);

    // get Class Info

    useEffect(() => {
        if (classId) {
            getClass()
        }
    }, [])


    const [initialTitle, setInitialTitle] = useState('')
    const [initialSubjects, setInitialSubjects] = useState([]);
    const [initialGrades, setInitialGrades] = useState([]);
    const [initialLanguages, setInitialLanguages] = useState([]);
    const [initialPhoto, setInitialPhoto] = useState('');

    async function getClass() {
        const classInfo = await getClassInfo(classId)
        console.log(classInfo)

        setInitialTitle(classInfo.value.title)
        setInitialSubjects(translateDisciplines(classInfo.value.disciplineTitle))
        setInitialGrades([classInfo.value.grade])
        setInitialLanguages(translateItems(classInfo.value.languageTitles, languagesMapping))
        setInitialPhoto(classInfo.value.imageUrl);
    }


    setTitle(initialTitle)


    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (file && allowedTypes.includes(file.type)) {
            setSelectedImage(URL.createObjectURL(file));
            setPhoto(file ? file : initialPhoto);
        } else {
            alert("Please upload an image file (jpeg, jpg, png).");
        }

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
        getUserInfo()
    }, []);

    async function getUserInfo() {
        const userProfile = await getUserProfile();
        const availableDisciplines = userProfile.disciplineTitles;
        const availableGrades = userProfile.gradeNumbers;
        const availableLanguages = userProfile.languageTitles;

        setLanguages(translateItems(availableLanguages, languagesMapping));
        setDisciplines(translateItems(availableDisciplines, disciplinesMapping));

        setGrade(availableGrades.sort((a, b) => a - b));
    }

    //translation
    const translateItems = (items, mappingFile) => {
        if (pathname.includes('ru')) {
            return items.map(item => Object.keys(mappingFile).find(key => mappingFile[key] === item) || item)
        }
        return items;
    }

    const translateDisciplines = (disciplines) => {
        if (pathname === '/ru/myProfile') {
            return disciplines.split(',').map(discipline => Object.keys(disciplinesMapping).find(key => disciplinesMapping[key] === discipline) || discipline);
        }
        return disciplines.split(',');
    };


    const t = useTranslations('CreateClass');

    return (
        <div className="flex flex-col sm:flex-row gap-5">
            <div className="section-photo w-full sm:w-1/2">
                <div className="mb-2">{t("classPhoto")}</div>
                <div className="relative w-full h-40 md:h-64 border border-black rounded-lg overflow-hidden bg-gray-100">
                    <label htmlFor="uploadImage" className="cursor-pointer block w-full h-full">
                        {selectedImage || initialPhoto ? (
                            <img
                                src={selectedImage ? selectedImage : initialPhoto}
                                alt="Uploaded"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-green-800">
                                + {t("uploadImage")}
                            </div>
                        )}
                    </label>
                </div>
                <input
                    type="file"
                    id="uploadImage"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <div className="text-sm text-gray-600 mt-2">{t("uploadImageText")}</div>
            </div>
            <div className='section-info w-full '>
                <InputForm inputFormText={t("title")} placeholderText={t("placeholderClassTitle")}
                           value={initialTitle} hasMaxLength={true} maxLength={25}
                           onChange={(e) => setInitialTitle(e.target.value)}/>
                <Dropdown dropdownFormText={t("grade")}
                          placeholderText={initialGrades.length > 0 ? initialGrades.join(", ") :
                              <span className='text-gray-400'>{t("selectGrade")}</span>}
                          options={grades} initialSelectedOptions={initialGrades} onChange={setSelectedGrades}
                          isSingleSelect={true}/>

                <Dropdown dropdownFormText={t("subject")}
                          placeholderText={initialSubjects.length > 0 ? initialSubjects.join(", ") :
                              <span className='text-gray-400'>{t("selectSubject")}</span>}
                          options={disciplines} initialSelectedOptions={initialSubjects}
                          onChange={setSelectedDisciplines}
                          isSingleSelect={true}/>
                <Dropdown dropdownFormText={t("language")}
                          placeholderText={initialLanguages.length > 0 ? initialLanguages.join(", ") :
                              <span className='text-gray-400'>{t("selectLanguage")}</span>}
                          options={languages} initialSelectedOptions={initialLanguages}
                          onChange={setSelectedLanguages}/>
            </div>
        </div>
    )
}

export default CreateClassBody


