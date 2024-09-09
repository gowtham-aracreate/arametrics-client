
export const formatData = (data) => JSON.stringify(data, null, 2);

export const getCurrentDateTime = () => new Date();

export const hasNoText = (str) => !(str && str.trim() !== "");

export const hasText = (str) => !!(str && str.trim() !== "");

export const isEmptyArray = (val) => val && !val.length;

export const isEmptyObject = (val) => isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

export const isNullOrEmpty = (str) => !str;

export const isPastDateTime = (datetime) => datetime < getCurrentDateTime();

export const parseArray = (arr, replaceStr = []) => isNullOrEmpty(arr) || isEmptyArray(arr) ? replaceStr : arr;

export const parseStr = (str, replaceStr = "") => isNullOrEmpty(str) ? replaceStr : str;

export const strToLowercase = (str) => str.toLowerCase();

export const strToUppercase = (str) => str.toUpperCase();

export const sortArrayOfObjects = (arr, keyToSort, direction) => {
    if (direction === 'none') return arr;

    const compare = (objectA, objectB) => {
        const valueA = objectA[keyToSort]
        const valueB = objectB[keyToSort]

        if (valueA === valueB) return 0;

        if (valueA > valueB) {
            return direction === 'ascending' ? 1 : -1
        } else {
            return direction === 'ascending' ? -1 : 1
        }
    }

    return arr.slice().sort(compare)
}

export const getRandomArrayElements = (array, numElements) => {

    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, numElements);
}
