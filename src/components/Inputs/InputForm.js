import React, {useState} from "react";
import Link from "next/link";

const InputForm = ({inputFormText, optionalFormText, placeholderText, value, link,
                       onChange, isPassword, error, hasMaxLength, maxLength, isTextarea, onFocus}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : 'text';


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
                    <div className="relative w-full">
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
                        {isPassword && (
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? '👁️' : '🙈'}
                            </button>
                        )}
                    </div>

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