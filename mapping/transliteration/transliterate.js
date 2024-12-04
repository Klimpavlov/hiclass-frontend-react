// Функция для трансформации текста

import transliteration from "./transliteration.json";

export default function transliterate(text) {
    return text
        .split("")
        // .map((char) => transliteration[char] || char)
        .map((char) => {
                const variants = transliteration[char];
                if (variants) {
                    return variants.find((variant) => variant);
                }
                return char
            }
        )
        .join("");
}