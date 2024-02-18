// import React, { useState } from "react";
//
// const InputSearchForm = ({ inputFormText, options, onSelect }) => {
//     const [searchText, setSearchText] = useState("");
//     const [showOptions, setShowOptions] = useState(false);
//
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setSearchText(value);
//         setShowOptions(value !== ""); // Показать варианты, если введен текст
//     };
//
//     const handleOptionClick = (option) => {
//         setSearchText(option);
//         setShowOptions(false);
//         onSelect(option); // Вызов колбэка onSelect с выбранным вариантом
//     };
//
//     return (
//         <div className="input-search-form">
//             <input
//                 type="text"
//                 placeholder={inputFormText}
//                 value={searchText}
//                 onChange={handleInputChange}
//             />
//             {showOptions && (
//                 <ul className="options-list">
//                     {options.map((option) => (
//                         <li key={option} onClick={() => handleOptionClick(option)}>
//                             {option}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };
//
// export default InputSearchForm;