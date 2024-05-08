'use client';

import React, { useState } from "react";

const AddProfilePhoto = ({ onFileSelected }) => {
    const [file, setFile] = useState();

    function getFile(event) {
        const selectedFile = event.target.files[0];
        setFile(URL.createObjectURL(selectedFile));
        onFileSelected(selectedFile); // Вызов функции onFileSelected с выбранным файлом
    }

    return (
        // <div>
        //     <input type="file" onChange={getFile} />
        //     <img src={file} alt="Profile Photo" />
        // </div>
        <div className="w-full border border-black aspect-w-3 aspect-h-4">
            <div className="border rounded border-solid relative">
                <label htmlFor="uploadImage" className="cursor-pointer block w-full h-full">
                        <img
                            src={file}
                            alt="+ Upload image"
                            className="w-full h-full object-cover"
                        />
                </label>
            </div>
            <input
                type="file"
                id="uploadImage"
                accept="image/*"
                onChange={getFile}
                className="hidden"
            />
        </div>
    );
};

export default AddProfilePhoto;