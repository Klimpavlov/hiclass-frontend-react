import React from "react";
import Image from "next/image";
import imgCalendar from "@/components/Inputs/Calendar.svg";


const InputCalendar = ({inputFormText, placeholderText, value, onChange}) => {

    return (
        <div className="">{inputFormText}
            <label htmlFor="Input" className='flex justify-between'>
                <input className="input flex justify-center items-center py-3 px-5
                 rounded-lg border border-gray-400 w-full"
                       placeholder={placeholderText}
                       value={value}
                       onChange={onChange}/>
                <Image src={imgCalendar} alt='Calendar' onClick={}/>
            </label>
        </div>
    );
};

export default InputCalendar