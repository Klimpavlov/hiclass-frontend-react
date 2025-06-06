// 'use client';
//
// import React, {useState, useEffect, useRef} from "react";
// import CreateClassHeader from "@/components/СreateClass/CreateClassHeader";
// import CreateClassBottom from "@/components/СreateClass/CreateClassBottom";
// import CreateClassBody from "@/components/СreateClass/CreateClassBody";
// import postCreateClass from "@/app/[locale]/postCreateClass/postCreateClass";
// import putClassImage from "@/app/[locale]/postCreateClass/setClassImage/putClassImage";
// import ErrorNotification from "@/components/Error/ErrorNotification";
// import {useTranslations} from "next-intl";
// import {reverseTranslateItems} from "@/app/[locale]/translateItems/reverseTranslateItems";
// import languagesMapping from "../../../mapping/languagesMapping/languagesMapping.json";
// import disciplinesMapping from "../../../mapping/disciplinesMapping/disciplinesMapping.json";
// import {usePathname} from "next/navigation";
//
// export default function CreateClassModal({classId, setIsModalOpen, onCreateClass}) {
//
//     const [title, setTitle] = useState('');
//     const [grade, setGrade] = useState('');
//     const [selectedDisciplines, setSelectedDisciplines] = useState([]);
//     const [selectedLanguages, setSelectedLanguages] = useState('');
//     const [photo, setPhoto] = useState(null);
//
//     const pathname = usePathname()
//     const toast = useRef(null);
//
//     const [isSubmitting, setIsSubmitting] = useState(false);
//
//     const handlePostCreateClass = async () => {
//         if (isSubmitting) return;
//
//         setIsSubmitting(true);
//
//         if (!title || !grade || !selectedDisciplines || !selectedLanguages || !photo) {
//             toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields', life: 3000 });
//             setIsSubmitting(false);
//             return;
//         }
//
//         let languagesToSend = selectedLanguages;
//         let disciplinesToSend = selectedDisciplines;
//
//         if (pathname.includes('ru')) {
//             languagesToSend = reverseTranslateItems(selectedLanguages, languagesMapping);
//             disciplinesToSend = reverseTranslateItems(selectedDisciplines, disciplinesMapping);
//         }
//
//         const createClassSuccess = await postCreateClass(title, grade, languagesToSend, disciplinesToSend, toast);
//         if (createClassSuccess) {
//             const uploadImageSuccess = await putClassImage(photo, toast);
//             if (uploadImageSuccess) {
//                 toast.current.show({ severity: 'info', summary: 'Success', detail: 'Class successfully created', life: 3000 });
//                 window.location.reload();
//             }
//         }
//         setIsSubmitting(false);
//     };
//
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };
//
//     // translation
//
//     const t = useTranslations('CreateClass');
//
//     return (
//         <>
//
//             <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400">
//                 <ErrorNotification ref={toast} />
//                 <div className="modal-content bg-white p-4 rounded-lg w-4/5 sm:w-3/5">
//                     <CreateClassHeader headerText={t("headerText")}
//                                        handleCloseModal={handleCloseModal}
//                     />
//                     <CreateClassBody setTitle={setTitle}
//                                      setPhoto={setPhoto}
//                                      setSubjects={setSelectedDisciplines}
//                                      setGrades={setGrade}
//                                      setLanguage={setSelectedLanguages}
//                                      classId={classId}
//                     />
//                     <CreateClassBottom handleCloseModal={handleCloseModal}
//                                        handlePostClass={handlePostCreateClass}
//
//                     />
//                 </div>
//             </div>
//
//         </>
//     );
// }

'use client';

import React, {useState, useEffect, useRef} from "react";
import CreateClassHeader from "@/components/Class/СreateClass/CreateClassHeader";
import CreateClassBottom from "@/components/Class/СreateClass/CreateClassBottom";
import CreateClassBody from "@/components/Class/СreateClass/CreateClassBody";
import postCreateClass from "@/app/[locale]/api/class/postCreateClass/postCreateClass";
import {getAvailableDisciplines} from "@/app/[locale]/api/staticData/getAvailableDisciplines/getAvailableDisciplines";
import putClassImage from "@/app/[locale]/api/class/postCreateClass/setClassImage/putClassImage";
import ErrorNotification from "@/components/Error/ErrorNotification";
import {useTranslations} from "next-intl";
import {reverseTranslateItems} from "@/app/[locale]/api/translateItems/reverseTranslateItems";
import languagesMapping from "../../../../mapping/languagesMapping/languagesMapping.json";
import disciplinesMapping from "../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import {usePathname} from "next/navigation";
import {RingLoader} from "react-spinners";

export default function CreateClassModal({classId, setIsModalOpen, onCreateClass}) {

    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState('');
    const [photo, setPhoto] = useState(null);

    const pathname = usePathname()
    const toast = useRef(null);
    // const [loading, setLoading] = useState(false); // Для управления лоадером

    const [isSubmitting, setIsSubmitting] = useState(false);

    // translation

    const t = useTranslations('CreateClass');
    const errorToastTranslation = useTranslations('DialogModal.Error');
    const createClassToastTranslation = useTranslations('DialogModal.CreateClass');

    const handlePostCreateClass = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!title || !grade || selectedDisciplines.length === 0 || !selectedLanguages || selectedLanguages.length === 0) {
            toast.current.show({ severity: 'error', summary: errorToastTranslation("error"), detail: errorToastTranslation("emptyFields"), life: 3000 });
            setIsSubmitting(false);
            return;
        }

        let languagesToSend = selectedLanguages;
        let disciplinesToSend = selectedDisciplines;

        if (pathname.includes('ru')) {
            languagesToSend = reverseTranslateItems(selectedLanguages, languagesMapping);
            disciplinesToSend = reverseTranslateItems(selectedDisciplines, disciplinesMapping);
        }

        const createClassSuccess = await postCreateClass(title, grade, languagesToSend, disciplinesToSend, toast);
        if (createClassSuccess) {
            if (photo) {
                const uploadImageSuccess = await putClassImage(photo, toast);
                if (!uploadImageSuccess) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Image upload failed', life: 3000 });
                }
            }
            toast.current.show({ severity: 'info', summary: createClassToastTranslation("success"), detail: createClassToastTranslation("successMessage"), life: 3000 });
        }
        setIsModalOpen(false);
        onCreateClass()
        setIsSubmitting(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    // if (loading) return (
    //     <div className='flex items-center justify-center h-screen'>
    //         <RingLoader
    //             color={'#36d7b7'}
    //             loading={loading}
    //             size={150}
    //             aria-label="Loading Spinner"
    //             data-testid="loader"
    //         />
    //     </div>
    // );

    return (
        <>

            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-400">
                <ErrorNotification ref={toast} />
                <div className="modal-content bg-white p-4 rounded-lg w-4/5 sm:w-3/5">
                    <CreateClassHeader headerText={t("headerText")}
                                       handleCloseModal={handleCloseModal}
                    />
                    <CreateClassBody setTitle={setTitle}
                                     setPhoto={setPhoto}
                                     setSubjects={setSelectedDisciplines}
                                     setGrades={setGrade}
                                     setLanguage={setSelectedLanguages}
                                     classId={classId}
                    />
                    <CreateClassBottom handleCloseModal={handleCloseModal}
                                       handlePostClass={handlePostCreateClass}

                    />
                </div>
            </div>

        </>
    );
}
