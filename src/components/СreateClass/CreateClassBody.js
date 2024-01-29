import React from "react";
import InputForm from "@/components/Inputs/InputForm";

const CreateClassBody = () => {
    return (
        <div className='flex flex-col sm:flex-row'>
            <div className='section-photo  w-full sm:w-1/3'>
                <div>Class photo (required)</div>
                <div className='w-full'>
                    <div className='p-28 border border-black'>+ Upload image</div>
                </div>
                <div>Minimum size of “808x632px”. GIF files will not animate</div>
            </div>
            <div className='section-info w-full '>
                <InputForm inputFormText='Title' placeholderText='Class title'/>
                <div className='flex justify-between flex-col sm:flex-row'>
                    <InputForm inputFormText='Grade' placeholderText='Select grade'/>
                    <InputForm inputFormText='Age' placeholderText='Select age'/>
                </div>
                <InputForm inputFormText='Subjects' placeholderText='Class title'/>
                <InputForm inputFormText='Description' placeholderText='Class description'/>
            </div>
        </div>
    )
}

export default CreateClassBody