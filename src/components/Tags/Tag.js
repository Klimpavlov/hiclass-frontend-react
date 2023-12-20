import React from "react";

const Tag = ({text}) => {
    return (
        <div className="inline-flex items-center justify-center bg-gray-100
        border border-solid border-neutral-50-ecedef text-white rounded-full px-4 py-2">
            <span className="text-sm sm:text-base text-black">{text}</span>
        </div>
    )
}

export default Tag