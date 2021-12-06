import errorMsg from "./CheckFormErrorMsg";
import checkFormErrorMsg from "./CheckFormErrorMsg";
import { CheckSizeArgs } from "./CheckFormErrorMsg";
import formFunction from "./CheckFormFunction";
class CheckForm implements CheckFormType {

    modelStructure;
    modelErrorStructure;
    testToPerform;
    errorMsg;
    isInvalidForm;
    checkFormFunction;

    constructor(
        private model: { [key: string]: any },
        private params: CheckFormType['testToPerform']
    ) {
        this.modelStructure = model;
        this.testToPerform = params;
        this.checkFormFunction = formFunction;
        this.errorMsg = checkFormErrorMsg;
        this.isInvalidForm = false;
        this.modelErrorStructure = {} as CheckFormType['modelErrorStructure'];
        Object.keys(this.modelStructure).forEach((element: string) => {
            this.modelErrorStructure[element] = {
                hasError: false,
                errMsg: []
            }
        });

    }
    enhanceCheckData = () => {
        let resultTest: ResponseMsg, functionToPerform: OneParamTest | ThreeParamsTest | OneParamTest[], reverse: boolean = false, operator: Operator | undefined, size: number | undefined;

        Object.keys(this.modelStructure).forEach((keyModel: string) => {

            this.testToPerform.forEach((element) => {

                element.key.forEach((keyParams) => {

                    if (keyModel === keyParams || keyParams === "*") {

                        functionToPerform = element.perform[0];

                        if ((element.perform.length === 3) && (element.perform[1] && element.perform[2])) {
                            operator = element.perform[1];
                            size = element.perform[2];
                        }

                        reverse = (element.perform[1] === 'reverse');

                        if (Array.isArray(functionToPerform)) {
                            functionToPerform.forEach((test: OneParamTest) => {
                                resultTest = this.enhanceTest(this.modelStructure[keyModel], test, undefined, undefined, reverse);
                                this.introduceModelError(resultTest, keyModel);
                            });

                        }
                        else {
                            resultTest = this.enhanceTest(this.modelStructure[keyModel], functionToPerform as OneParamTest | ThreeParamsTest, operator, size, reverse);
                            this.introduceModelError(resultTest, keyModel);
                        }
                    }
                    operator = size = undefined;
                })

            })
            //cleaning the possible duplicate error message
            this.modelErrorStructure[keyModel].errMsg = [...new Set(this.modelErrorStructure[keyModel].errMsg)];
        });

    }
    introduceModelError = (resultTest: ResponseMsg, keyModel: string) => {
        if (!resultTest.hasPassed) {
            this.isInvalidForm = true;
            this.modelErrorStructure[keyModel].hasError = !resultTest.hasPassed;

            if (Array.isArray(resultTest.errMsg) && typeof resultTest.errMsg !== "string") {
                this.modelErrorStructure[keyModel].errMsg.push(...resultTest.errMsg);
            }
            else {
                this.modelErrorStructure[keyModel].errMsg.push(resultTest.errMsg);
            }

        }
    }
    enhanceTest = (valueToCheck: any, functionToPerform: OneParamTest | ThreeParamsTest, operator?: Operator, size?: number, reverse: boolean = false): ResponseMsg => {
        let response: ResponseMsg = {
            hasPassed: false,
            errMsg: ""
        };

        response.hasPassed = ((typeof size && typeof operator) !== "undefined") ? this.checkFormFunction[functionToPerform](valueToCheck, size, operator) : this.checkFormFunction[functionToPerform](valueToCheck);
        reverse && (response.hasPassed = !response.hasPassed)

        if (!response.hasPassed) {
            switch (operator) {
                case "greater":
                    response.errMsg = errorMsg[functionToPerform][CheckSizeArgs.lesser]
                    break;
                case "lesser":
                    response.errMsg = errorMsg[functionToPerform][CheckSizeArgs.greater]
                    break;
                case "equal":
                    response.errMsg = errorMsg[functionToPerform][CheckSizeArgs.notEqual]
                    break;
                case "not-equal":
                    response.errMsg = errorMsg[functionToPerform][CheckSizeArgs.equal]
                    break;
                case "lesser-equal":
                    response.errMsg = [errorMsg[functionToPerform][CheckSizeArgs.notEqual], errorMsg[functionToPerform][CheckSizeArgs.greater]];
                    break;
                case "greater-equal":
                    response.errMsg = [errorMsg[functionToPerform][CheckSizeArgs.notEqual], errorMsg[functionToPerform][CheckSizeArgs.lesser]];
                    break;
                default:
                    response.errMsg = (errorMsg[functionToPerform][reverse ? 1 : 0]) as string;
            }

        }
        return response;
    }

    //getters

    getModelStructure = () => {
        return this.modelStructure;
    }
    getModelErrorStructure = () => {
        return this.modelErrorStructure;
    }

}
export default CheckForm;