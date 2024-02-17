import React from "react";

const SearchInput = ({inputFormText, placeholderText, value, onChange}) => {



    return (
        <div className="">{inputFormText}
            <label htmlFor="Input">
                <input className="input flex justify-center items-center py-3 px-5
                 rounded-lg border border-gray-400 w-full"
                       placeholder={placeholderText}
                       value={value}
                       onChange={onChange}/>
            </label>
        </div>
    );
};

export default SearchInput