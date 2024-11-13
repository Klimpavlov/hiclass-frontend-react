import React from 'react';

const InputRadioForm = ({ inputFormText, inputAboutFormText, checked, onChange, onKeyDown }) => {
    return (
        <div className="input py-3 px-5 rounded-lg border border-gray-400 w-full">
            <label htmlFor="Input">
                <div className="flex justify-between items-center">
                    <div>{inputFormText}</div>
                    <input className="" type="checkbox" checked={checked}
                           onChange={(e) => onChange(e.target.checked)}
                           onKeyDown={onKeyDown}
                    />
                </div>
                <div className="text-gray-600 text-sm">{inputAboutFormText}</div>
            </label>
        </div>
    );
};

export default InputRadioForm;