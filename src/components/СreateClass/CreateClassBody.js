import React, {useState, useEffect} from "react";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";
import {getUserProfile} from "@/app/[locale]/api/getUserProfile/getUserProfile";
import Image from "next/image";
import {getClassInfo} from "@/app/[locale]/api/getClassProfile/getClassInfo";
import {useTranslations} from "next-intl";
import ruLocale from "../../../messages/ru.json";
import {usePathname} from "next/navigation";
import disciplinesMapping from "../../../mapping/disciplinesMapping/disciplinesMapping.json";
import languagesMapping from "../../../mapping/languagesMapping/languagesMapping.json";
import {reverseTranslateItems} from "@/app/[locale]/translateItems/reverseTranslateItems";


const CreateClassBody = ({classId, setTitle, setPhoto, setSubjects, setGrades, setLanguage}) => {

    //current locale
    const pathname = usePathname();
    const currentPathname = pathname.slice(1);

    // get Class Info

    useEffect(() => {
        getClass()
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
        setInitialSubjects(translateItems(classInfo.value.disciplines, disciplinesMapping))
        setInitialGrades([classInfo.value.grade])
        setInitialLanguages(translateItems(classInfo.value.languages, languagesMapping))
        setInitialPhoto(classInfo.value.imageUrl)

    }

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
        getUserInfo()
    }, []);

    async function getUserInfo() {
        const userProfile = await getUserProfile();
        const availableDisciplines = userProfile.disciplineTitles;
        const availableGrades = userProfile.gradeNumbers;
        const availableLanguages = userProfile.languageTitles;

        setLanguages(translateItems(availableLanguages, languagesMapping));
        setDisciplines(translateItems(availableDisciplines, disciplinesMapping));
        setGrade(availableGrades);
    }

    //translation
    const translateItems = (items, mappingFile) => {
        if (pathname.includes('ru')){
            return items.map(item => Object.keys(mappingFile).find(key => mappingFile[key] === item) || item)
        }
        return items;
    }


    const t = useTranslations('CreateClass');

    return (
        <div className="flex flex-col sm:flex-row gap-5">
            <div className="section-photo w-full sm:w-1/2">
                <div>{t("classPhoto")}</div>
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
                                    + {t("uploadImage")}
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
                <InputForm inputFormText={t("title")} placeholderText='Class title'
                           value={initialTitle}
                           onChange={(e) => setInitialTitle(e.target.value)}/>
                <Dropdown dropdownFormText={t("grade")}
                          placeholderText={initialGrades.length > 0 ? initialGrades.join(", ") : t("selectGrade")}
                          options={grades} initialSelectedOptions={initialGrades} onChange={setSelectedGrades}/>

                <Dropdown dropdownFormText={t("subject")}
                          placeholderText={initialSubjects.length > 0 ? initialSubjects.join(", ") : t("selectSubject")}
                          options={disciplines} initialSelectedOptions={initialSubjects} onChange={setSelectedDisciplines}/>
                <Dropdown dropdownFormText={t("language")}
                          placeholderText={initialLanguages.length > 0 ? initialLanguages.join(", ") : t("selectLanguage")}
                          options={languages} initialSelectedOptions={initialLanguages} onChange={setSelectedLanguages}/>
            </div>
        </div>
    )
}

export default CreateClassBody


