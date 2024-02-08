import React from "react";

const InputRadioForm = ({inputFormText, inputAboutFormText}) => {

    return (
        <div className='input flex justify-center items-center py-3 px-5
                 rounded-lg border border-gray-400 w-full'>
            <label htmlFor="Input">
                <div className='flex justify-between items-center'>
                    <div>
                        {inputFormText}
                    </div>
                    <input className=""
                           type="checkbox"

                    />
                </div>
                <div className='text-gray-600 text-sm'>
                    {inputAboutFormText}
                </div>
            </label>
        </div>
    )
}

export default InputRadioForm