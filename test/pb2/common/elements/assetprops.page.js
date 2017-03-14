
var page = require('./../../../common/page');

var input = '//label[contains(.,"***:")]//input'; //Input Fields
var textarea = '//label[contains(.,"***:")]//textarea'; //Textarea fields (Keyword(s), User Description, Meta Description)
var dropdown = '//label[contains(.,"***:")]//a'; //Dropdown using Un-ordered List (ul)
var dropdownOption = '//li[string()="***"]' //Select an option (li) from dropdown using Un-ordered List (ul)
var selectDD = '//label[contains(.,"***:")]//select'; //Dropdown using Select
var checkbox = '//label[contains(.,"***")]//input'; //For Checkbox and Radio button
var locator = '';


var props = Object.create(page, {

    UntilExist: { value: () => { browser.waitForExist(locator, 30000); } },
    UntilVisible: { value: () => { browser.waitForVisible(locator, 30000); } },
    UntilEnabled: { value: () => { browser.waitForEnabled(locator, 30000); } },
    GetElement: { get: () => { return browser.element(locator); } },

    input : { value: { get: (labelName) => {
<<<<<<< HEAD
        switch (labelName)
        {
            case 'WebMD Nickname': locator = input.replace('***:', labelName); return  props.GetElement; break;
            default: locator = input.replace('***', labelName); return  props.GetElement; break;
        }
=======
        locator = input.replace('***', labelName);
        return  props.GetElement;
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f
    }}},

    textarea : { value: { get: (labelName) =>
    {
         locator = textarea.replace('***', labelName);   
         return  props.GetElement;
    }}},

    checkbox : { value: { get: (labelName) => {
        locator = checkbox.replace('***', labelName); 
        console.log(locator);  
         return  props.GetElement;
    }}},

    dropdown: { value: (labelName, option) => {
        locator = dropdown.replace('***', labelName);
        props.UntilExist(locator);
        props.UntilEnabled(locator);
        props.GetElement.click();

        locator = locator.split('//a')[0] + dropdownOption.replace('***', option);
        props.UntilExist(locator);
        props.UntilVisible(locator);
        props.GetElement.click();
    }},

    select: { value: (labelName, option) => {
        locator = selectDD.replace('***', labelName);
        browser.selectByVisibleText(locator, option);
    }}

});

module.exports = props;
