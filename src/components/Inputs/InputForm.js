import React from "react";
import Link from "next/link";

const InputForm = ({inputFormText, optionalFormText, placeholderText, value, link, onChange, isPassword, error, hasMaxLength, maxLength}) => {

    const inputType = isPassword ? 'password' : 'text';


    return (
        <div className="">
            <div className='flex justify-between'>
                {inputFormText}
                {optionalFormText && <Link href={link} className='text-green-800 cursor-pointer'>{optionalFormText}</Link>}
            </div>
            <label htmlFor="Input">
                <input className="input flex justify-center items-center py-3 px-5
                 rounded-lg border border-gray-400 w-full"
                       type={inputType}
                       placeholder={placeholderText}
                       value={value}
                       onChange={onChange}
                       maxLength={hasMaxLength ? maxLength : undefined}

                />
                {error && <div className='text-red-700'>{error}</div>}
            </label>
            {hasMaxLength && (
                <div className="text-gray-500 text-right">
                    {`${value.length}/${maxLength}`}
                </div>
            )}
        </div>
    );
};

export default InputForm