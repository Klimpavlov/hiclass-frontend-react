export const translateItems = (items, mappingFile, pathname) => {
    if (pathname.includes('ru')){
        return items.map(item => Object.keys(mappingFile).find(key => mappingFile[key] === item) || item)
    }
    return items;
}