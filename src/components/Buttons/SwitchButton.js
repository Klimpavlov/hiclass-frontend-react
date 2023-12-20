'use client';
import React, {useState} from "react";
import classNames from "classnames";

const Switch = () => {
    const [isSelected, setIsSelected] = useState(true);
    return (
        <div
            onClick={()=> setIsSelected(!isSelected)}
            className={classNames('flex w-10 h-5 bg-gray-600 rounded-full', {
            'bg-green-700' : isSelected,
        })}>
            <span className={classNames('h-4 w-4 mt-0.5 bg-white rounded-full transition-all duration-500', {
                'ml-5': isSelected,
            })}/>

        </div>
    )
}

export default Switch