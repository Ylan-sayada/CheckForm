type Operator = 'greater' | 'lesser' | 'equal' | 'greater-equal' | 'lesser-equal' | 'not-equal';
type OneParamTest = 'isInt' | 'isStr' | 'isMail' | 'containsHeb' | 'isExternal' | 'isEmptyString' | 'isOnlyNumber' | 'isValidPhoneNumber' | 'hasSpecialChars';
type ThreeParamsTest = 'checkStrSize';
type ErrorMsg = Record<ThreeParamsTest | OneParamTest, string | string[]>;
type ErrorDetails = { hasError: boolean, errMsg: string[] };
type ResponseMsg = { hasPassed: boolean, errMsg: string | string[] };
interface CheckFormType {
    modelStructure: unknown,
    modelErrorStructure: Record<any, ErrorDetails>,
    testToPerform: {
        key: string[],
        perform: [ThreeParamsTest, Operator, number] | [OneParamTest | OneParamTest[]] | [OneParamTest | OneParamTest[], 'reverse']
    }[],
    isInvalidForm: boolean,
    errorMsg: ErrorMsg,
    checkFormFunction: Record<ThreeParamsTest | OneParamTest, (...arg: any) => boolean>
}

