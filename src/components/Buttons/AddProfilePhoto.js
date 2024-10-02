'use client';

import React, { useState } from "react";
import {useTranslations} from "next-intl";

const AddProfilePhoto = ({ onFileSelected }) => {
    const [file, setFile] = useState();

    function getFile(event) {
        // const selectedFile = event.target.files[0];
        // setFile(URL.createObjectURL(selectedFile));
        // onFileSelected(selectedFile); // Вызов функции onFileSelected с выбранным файлом

        const selectedFile = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(URL.createObjectURL(selectedFile));
            onFileSelected(selectedFile);
        } else {
            alert("Please upload an image file (jpeg, jpg, png).");
        }
    }

    const t = useTranslations('CreateAccount.ProfilePhoto');


    return (
        // <div>
        //     <input type="file" onChange={getFile} />
        //     <img src={file} alt="Profile Photo" />
        // </div>
        <div className="w-full border border-black aspect-w-3 aspect-h-4">
            <div className="relative w-full h-64 border overflow-hidden bg-gray-100 flex items-center justify-center">
                <label htmlFor="uploadImage" className="cursor-pointer w-full h-full flex items-center justify-center">
                    {file ? (
                        <img
                            src={file}
                            alt={t("uploadImage")}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-green-700">{t("uploadImage")}</span>
                    )}
                </label>
            </div>
            <input
                type="file"
                id="uploadImage"
                accept="image/jpeg,image/png,image/jpg"
                onChange={getFile}
                className="hidden"
            />
        </div>

    );
};

export default AddProfilePhoto;