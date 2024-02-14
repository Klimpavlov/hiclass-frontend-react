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
        <div>
            <input type="file" onChange={getFile} />
            <img src={file} alt="Profile Photo" />
        </div>
    );
};

export default AddProfilePhoto;