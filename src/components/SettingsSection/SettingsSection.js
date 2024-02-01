import React from "react";
const SettingsSection = ({title, details}) => {
    return (
        <div>
            <div className='text-xl font-semibold'>{title}</div>
            <div className='text-sm font-normal text-gray-600'>{details}</div>
        </div>
    )
}

export default SettingsSection