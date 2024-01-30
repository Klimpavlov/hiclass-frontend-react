import React from "react";

const ClearAllButton = ({buttonText, clearAll}) => {
    return (
        <button
            className="flex items-center justify-center px-5 py-3 mt-4
                             mx-auto rounded-lg text-black
                              text-sm font-medium shadow-xs"
            onClick={clearAll}
        >
            {buttonText}
        </button>
    )
}

export default ClearAllButton