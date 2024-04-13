import React, {useState} from "react";
import Image from "next/image";

const Banner = ({ onFileSelected }) => {
    const [file, setFile] = useState();

    function getFile(event) {
        const selectedFile = event.target.files[0];
        setFile(URL.createObjectURL(selectedFile));
        onFileSelected(selectedFile); // Вызов функции onFileSelected с выбранным файлом
    }

    return (
        <div className="flex items-center relative justify-center px-4 md:px-8 py-8 md:py-16 bg-gray-100">
            <div className="button text-center">
                <input type="file" onChange={getFile} />
                {file && (
                    <div className="w-full">
                        <Image
                            src={file}
                            alt="banner photo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;