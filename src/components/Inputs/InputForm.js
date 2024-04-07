import React from "react";

const InputForm = ({inputFormText, placeholderText, value, onChange, isPassword, error}) => {

    const inputType = isPassword ? 'password' : 'text';


    return (
        <div className="">{inputFormText}
            <label htmlFor="Input">
                <input className="input flex justify-center items-center py-3 px-5
                 rounded-lg border border-gray-400 w-full"
                       type={inputType}
                       placeholder={placeholderText}
                       value={value}
                       onChange={onChange}
                />
                {error && <div className='text-red-700'>{error}</div>}
            </label>
        </div>
    );
};

export default InputForm