import React, {useState} from "react";
import InputForm from "@/components/Inputs/InputForm";
import Dropdown from "@/components/Dropdowns/Dropdown";

const CreateClassBody = ({ setTitle, setPhoto }) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));

    };

    return (
        <div className="flex flex-col sm:flex-row gap-5">
            <div className="section-photo w-full sm:w-1/3">
                <div>Class photo (required)</div>
                <div className="w-full aspect-w-3 aspect-h-4">
                    <div className="border border-black">
                        <label htmlFor="uploadImage" className="cursor-pointer block w-full h-full">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Uploaded"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full border-dashed border-2 cursor-pointer">
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
                <InputForm inputFormText='Title' placeholderText='Class title' onChange={(e) => setTitle(e.target.value)}/>
                <div className='flex justify-between flex-col sm:flex-row'>
                    <Dropdown dropdownFormText='Grade' placeholderText='Select grade'/>
                    <Dropdown dropdownFormText='Age' placeholderText='Select age'/>
                </div>
                <Dropdown dropdownFormText='Subjects' placeholderText='Class title'/>
                <InputForm inputFormText='Description' placeholderText='Class description'/>
            </div>
        </div>
    )
}

export default CreateClassBody


