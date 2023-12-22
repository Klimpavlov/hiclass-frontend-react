import React from "react";

const ClearAllButton = () => {
    return (
        <button
            className="flex items-center justify-center px-5 py-3 mt-4
                             mx-auto rounded-lg text-black
                              text-sm font-medium shadow-xs"
            onClick={() => {
                // Действия по применению фильтра
            }}
        >
           Clear all
        </button>
    )
}

export default ClearAllButton