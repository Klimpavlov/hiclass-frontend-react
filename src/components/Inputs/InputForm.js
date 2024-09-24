import React from "react";
import Link from "next/link";

const InputForm = ({inputFormText, optionalFormText, placeholderText, value, link,
                       onChange, isPassword, error, hasMaxLength, maxLength, isTextarea, onFocus}) => {

    const inputType = isPassword ? 'password' : 'text';


    return (
        <div className="">
            <div className='flex justify-between'>
                {inputFormText}
                {optionalFormText && <Link href={link} className='text-green-800 cursor-pointer'>{optionalFormText}</Link>}
            </div>
            <label htmlFor="Input">
                {isTextarea ? (
                    <textarea
                        className="input flex justify-center items-center py-3 px-5
                        rounded-lg border border-gray-400 w-full resize-none"
                        placeholder={placeholderText}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        maxLength={hasMaxLength ? maxLength : undefined}
                        rows={5}
                    />
                ) : (
                    <input
                        className="input flex justify-center items-center py-3 px-5
                        rounded-lg border border-gray-400 w-full"
                        type={inputType}
                        placeholder={placeholderText}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        maxLength={hasMaxLength ? maxLength : undefined}
                    />
                )}
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