let errorMsg = {
    checkStrSize: ["The input is to much long", "The input is to much short", "The input is equal", "The input is not equal"],
    isInt: ["The input is not a int type", "The input is a int type"],
    isMail: ["The input is not a mail", "The input is a mail"],
    isStr: ["The input is not a string type", "The input is a string type"],
    isExternal: ["The input is not an external link", "The input is an external link"],
    isEmptyString: ["The input is not empty string", "The input is empty string"],
    isValidPhoneNumber: ["The input is an invalid phone number", "The input is a valid phone number"],
    containsHeb: ["The input not contains hebrew characters", "The input contains hebrew characters"],
    hasSpecialChars: ["The input not contains special characters", "The input contains special characters"],
    isOnlyNumber: ["The input not contains only numbers", "The input contains only numbers"]
}
export enum CheckSizeArgs {
    greater, lesser, equal, notEqual
}
export default errorMsg;
