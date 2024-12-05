// // Функция для трансформации текста

import transliteration from "./transliteration.json";

function generateAllVariants(text) {
    return text
        .split("")
        .map((char) => transliteration[char] || [char])
        .reduce((acc, variants) => {
            const combinations = [];
            acc.forEach((prefix) =>
                variants.forEach((variant) => combinations.push(prefix + variant))
            );
            return combinations;
        }, [""]);
    // other variant

    // const chars = text.split("").map((char) => transliteration[char] || [char]);
    // let combinations = [""]; // Начинаем с пустой строки
    //
    // for (const variants of chars) {
    //     const newCombinations = [];
    //     for (const prefix of combinations) {
    //         for (const variant of variants) {
    //             newCombinations.push(prefix + variant);
    //         }
    //     }
    //     combinations = newCombinations; // Обновляем массив комбинаций
    // }
    //
    // return combinations;
}
export default function transliterate(text) {
    return generateAllVariants(text);
}


// import transliteration from "./transliteration.json";
//
// export default function transliterate(text) {
//     return text
//         .split("")
//         // .map((char) => transliteration[char] || char)
//         .map((char) => {
//                 const variants = transliteration[char];
//                 if (variants) {
//                     return variants.find((variant) => variant);
//                 }
//                 return char
//             }
//         )
//         .join("");
// }