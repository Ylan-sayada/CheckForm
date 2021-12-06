
//Boolean function tests
export let isStr = (element: any): boolean => {
    return typeof element === "string";
}
export let isInt = (element: any): boolean => {
    return typeof element === "number";
}
export let isMail = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    //eslint-disable-next-line
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(argToTest);
}
export let isExternal = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    return argToTest.split('/')[0] === ("https:" || "http:");
}
export let containsHeb = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    return (/[\u0590-\u05FF]/).test(argToTest);
}
export let isEmptyString = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    return (argToTest.length === 0) || argToTest === "NaN";
}
export let isOnlyNumber = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    return (/^[0-9]*$/).test(argToTest);
}
export let hasSpecialChars = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    return !(/^[a-zA-Z0-9\u0590-\u05FF ]*$/).test(argToTest); // Hebrew character are not considered as special char
}
export let isValidPhoneNumber = (argToTest: string | number): boolean => {
    argToTest = argToTest + "";
    return !(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im).test(argToTest);
}

export let checkStringSize = (string: string, length: number, operator: Operator): boolean => {
    let equal = operator === ("greater-equal" || "greater-lesser");
    let res = (() => {
        switch (operator) {
            case 'greater': case 'greater-equal':
                return equal ? string.length >= length : string.length > length;
            case 'lesser': case 'lesser-equal':
                return equal ? string.length <= length : string.length < length;
            case 'equal':
                return string.length === length;
            case 'not-equal':
                return string.length !== length;
            default:
                return false;
        };
    })();
    return res;
}
let checkFormFunction: Record<OneParamTest | ThreeParamsTest, (...arg: any) => boolean> = {
    'isMail': isMail,
    'isOnlyNumber': isOnlyNumber,
    'isExternal': isExternal,
    'isValidPhoneNumber': isValidPhoneNumber,
    'hasSpecialChars': hasSpecialChars,
    'isStr': isStr,
    'isInt': isInt,
    'isEmptyString': isEmptyString,
    'containsHeb': containsHeb,
    'checkStrSize': checkStringSize
}
export default checkFormFunction;