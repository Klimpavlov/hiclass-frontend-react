import React from "react";

const Tag = ({text, removeTag, onChange}) => {

    return (
        <div className="inline-flex items-center justify-between bg-gray-100
        border border-solid border-neutral-50-ecedef text-white rounded-full px-4 py-1">
            <div className="text-sm text-black">{text}</div>
            {removeTag && (
                <div className="class-preview-close text-black pl-2 cursor-pointer"
                    onClick={onChange}>
                    &times;
                </div>
            )}
        </div>
    )
}

export default Tag