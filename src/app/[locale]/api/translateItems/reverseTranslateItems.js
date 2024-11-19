export const reverseTranslateItems = (items, mappingFile) => {
        return items.map(item => mappingFile[item] || item);
    };
