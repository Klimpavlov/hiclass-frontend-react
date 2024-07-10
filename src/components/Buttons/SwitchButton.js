'use client';
import React, {useEffect, useState} from "react";
import classNames from "classnames";

const Switch = ({isExpert}) => {
    const [isSelected, setIsSelected] = useState(isExpert);
    useEffect(() => {
        setIsSelected(isExpert);
    }, [isExpert]);

    return (
        <div
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