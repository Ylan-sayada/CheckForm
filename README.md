# Check Form 
### _Simple, lighweight and smart._
Check Form is a tiny module that check your form with a few line of code.

## Installation 

Install the package : 

```sh
npm i ez-check-form 
```
import the module : 
```js
    --NodeJs require--
CheckForm = require("ez-check-form");
       <!-- Or ---!>
    --ES6 import--
import CheckForm from "ez-check-form";
```
## Usage

Enhance an instance of CheckForm with the object and key value of the form.\
Example of form structure : 
```js
 let formData = {
        firstName: "",
        lastName: "",
        companyName: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        postCode: "",
        gender: "",
    }
```
> Note: it can work with any type of key/value.

Store the values of the form into your object and open a new instance of CheckForm.\
The constructor should contain the form to check and an array of instruction : 
```js
let checkForm  = new CheckForm(formData,instruction[]);
```
Example of single instruction : 
```js
{ key: ["phoneNumber"], perform:["isValidPhoneNumber"] }
```
> **Note** : The key should correspond to at last one of the key in the form data.\
> **Note 2** : There are a multiple built in function to perform see [below](#Function-table).

Its also possible to perform multiple check on multiple key : 
```js 
//check if isn't empty string and not contains Special chars on 
//last name and first name
{ 
key: ["lastName","firstName"], perform: [['hasSpecialChars', 'isEmptyString'], 'reverse']
}
//Check if all the value on the form are empty
{ key: ["*"], perform: ['isEmptyString'] } 
//Concat instructions 
[
   { key: ["*"], perform: [['hasSpecialChars', 'isEmptyString'], 'reverse']},
   { key: ["phoneNumber"], perform: ["isValidPhoneNumber"] },
   { key: ["postCode"], perform: ["isOnlyNumber"] }
]
//You can also use the checkStrSize() that contains three argument :
{ key: ["lastName"], perform: ['checkStrSize',operator,number] } 
```
> **Note** : The 'reverse' flag isn't available on checkStrSize function.

### Its time to the ✨**show**✨  : 
Enhance the EnhanceCheckData() function and get your Model Error Structure: 
```js 
checkForm.enhanceCheckData();
console.log(checkForm.isInvalidform) // output: boolean
console.log(checkForm.getModelErrorStructure()); 
/* output : 
{
        firstName: { hasError: boolean, errMsg: string[] },
        lastName: { hasError: boolean, errMsg: string[] },
        companyName: { hasError: boolean, errMsg: string[] },
        phoneNumber: { hasError: boolean, errMsg: string[] },
        address: { hasError: boolean, errMsg: string[] },
        city: { hasError: boolean, errMsg: string[] },
        country:{ hasError: boolean, errMsg: string[] },
        postCode: { hasError: boolean, errMsg: string[] },
        gender: { hasError: boolean, errMsg: string[] },
}
    */ 
```

## Function table
Check available for now :
| Check | Description|
| ------ | ------ |
| isMail | check if the input is a valid mail |
| isOnlyNumber | check if the input only contain number |
| isExternal | check if the input is an external link |
| hasSpecialChars | check if contain special character as *%^": |
| isStr | perform check on the type of the input if is Str type |
| isInt | same as isStr but for Int type |
| isEmptyString | check if the input is an empty string |
| containsHeb | check if the input contain hebrew characters |
| checkStrSize | check if the input is lesser/greater/equal/different than the number expected|


### Features incoming 
There only built-in function available for now.
I plan to add custom regex check  and custom function model/error model.


