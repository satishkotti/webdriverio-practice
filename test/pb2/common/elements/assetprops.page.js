
const page = require('./../../../common/page');

var label = '//label[contains(.,"***:")]';
var input = `${label}//input`; //Input Fields
var textarea = `${label}//textarea`; //Textarea fields (Keyword(s), User Description, Meta Description)
var dropdown = `${label}//a`; //Dropdown using Un-ordered List (ul)
var dropdown2 = `${input}`;
var dropdownOption = '//li[string()="***"]' //Select an option (li) from dropdown using Un-ordered List (ul)
var selectDD = `${label}//select`; //Dropdown using Select
var checkbox = `${input}`.replace("***:", "***"); //For Checkbox and Radio button
var tab = '//uib-tab-heading[contains(.,"***")]'; //For Properties, Page Layout and Preview tabs
var legend = '//fieldset[legend[string()="***"]]';
var position = '[position()=*]';
var required = `${label}//span[@class="pb-field-required"]`;
var invalid = `${label}//span[@class="pb-field-invalid"]`;
var link = '//a[string()="***"]';
var locator = '';


var props = Object.create(page, {

    UntilExist: { value: () => { browser.waitForExist(locator, 30000); } },
    UntilVisible: { value: () => { browser.waitForVisible(locator, 30000); } },
    UntilEnabled: { value: () => { browser.waitForEnabled(locator, 30000); } },
    Scroll: { value: () => { browser.element(locator).scroll(); } },
    GetElement: { get: () => { return browser.element(locator); } },

    input: {
        value: {
            get: (labelName) => {
                switch (labelName) {
                    case 'WebMD Nickname': locator = input.replace('***:', labelName); props.UntilExist(); props.UntilVisible(); return props.GetElement; break;
                    default: locator = input.replace('***', labelName); props.UntilExist(); props.UntilVisible(); return props.GetElement; break;
                }
            }
        }
    },
    input2: {
        value: {
            get: (legendName, labelName, itemNumber) => {
                switch (labelName) {
                    case 'WebMD Nickname': '(' + legend.replace('***', legendName) + input.replace('***:', labelName) + ')[' + itemNumber + ']'; props.UntilExist(); props.UntilVisible(); return props.GetElement; break;
                    default: locator = '(' + legend.replace('***', legendName) + input.replace('***', labelName) + ')[' + itemNumber + ']'; props.UntilExist(); props.UntilVisible(); return props.GetElement; break;
                }
            }
        }
    },
    input3: {
        value: {
            get: (labelName, itemNumber) => {
                switch (labelName) {
                    case 'WebMD Nickname': '(' + input.replace('***:', labelName) + ')[' + itemNumber + ']'; props.UntilExist(); props.UntilVisible(); return props.GetElement; break;
                    default: locator = '(' + input.replace('***', labelName) + ')[' + itemNumber + ']'; props.UntilExist(); props.UntilVisible(); return props.GetElement; break;
                }
            }
        }
    },
    textarea: {
        value: {
            get: (labelName) => {
                locator = textarea.replace('***', labelName);
                props.UntilExist(); props.UntilVisible();
                return props.GetElement;
            }
        }
    },

    textarea2: {
        value: {
            get: (legendName, labelName, itemNumber) => {
                locator = '(' + legend.replace('***', legendName) + textarea.replace('***', labelName) + ')[' + itemNumber + ']';
                props.UntilExist(); props.UntilVisible();
                return props.GetElement;
            }
        }
    },

    checkbox: {
        value: {
            get: (labelName) => {
                locator = checkbox.replace('***', labelName);
                props.UntilExist(); props.UntilVisible();
                return props.GetElement;
            }
        }
    },

    checkbox2: {
        value: {
            get: (legendName, labelName, itemNumber) => {
                locator = '(' + legend.replace('***', legendName) + checkbox.replace('***', labelName) + ')[' + itemNumber + ']';
                props.UntilExist(); props.UntilVisible();
                return props.GetElement;
            }
        }
    },

    dropdown: {
        value: (labelName, option) => {
            switch (labelName) {
                case 'Module Type': locator = selectDD.replace('***:', labelName); props.UntilExist(); props.UntilEnabled(); locator = dropdown.replace('***:', labelName); props.GetElement.click(); break;
                case 'Layout CSS': selectDD.replace('***', labelName); props.UntilExist(); locator = dropdown.replace('***', labelName); props.GetElement.click(); break;
                case 'Content Filter': locator = selectDD.replace('***:', labelName); props.UntilExist(); props.UntilEnabled(); locator = dropdown2.replace('***:', labelName); props.GetElement.click(); break;
                default: locator = selectDD.replace('***', labelName); props.UntilExist(); props.UntilEnabled(); locator = dropdown.replace('***', labelName); props.GetElement.click(); break;
            }

            switch (labelName) {
                case 'Content Filter': locator = locator.split('//input')[0] + dropdownOption.replace('***', option); break;
                default: locator = locator.split('//a')[0] + dropdownOption.replace('***', option);
            }
            props.UntilExist();
            props.UntilVisible();
            props.GetElement.click();
        }
    },

    dropdown2: {
        value: (legendName, labelName, itemNumber, option) => {
            switch (labelName) {
                case 'Module Type': locator = selectDD.replace('***:', labelName); props.UntilExist(); props.UntilEnabled(); locator = dropdown.replace('***:', labelName); props.GetElement.click(); break;
                default: locator = '(' + legend.replace('***', legendName) + selectDD.replace('***', labelName) + ')[' + itemNumber + ']'; props.UntilExist(); props.UntilEnabled(); locator = dropdown.replace('***', labelName); props.GetElement.click(); break;
            }

            locator = legend.replace('***', legendName) + locator.split('//a')[0] + position.replace('*', itemNumber) + dropdownOption.replace('***', option);
            props.UntilExist();
            props.UntilVisible();
            props.GetElement.click();
        }
    },

    select: {
        value: (labelName, option) => {
            locator = selectDD.replace('***', labelName);
            browser.selectByVisibleText(locator, option);
        }
    },

    select2: {
        value: (legendName, labelName, itemNumber, option) => {
            locator = '(' + legend.replace('***', legendName) + selectDD.replace('***', labelName) + ')[' + itemNumber + ']';
            browser.selectByVisibleText(locator, option);
        }
    },

    tab: {
        value: {
            get: (tabName) => {
                locator = tab.replace('***', tabName);
                props.UntilExist();
                props.UntilVisible();
                return props.GetElement;
            }
        }
    },

    lookup: {
        value: (labelName, dctmIdOrUrl) => {
            locator = input.replace('***', labelName);
            props.UntilExist();
            props.UntilVisible();
            props.GetElement.setValue(dctmIdOrUrl);
            locator = locator + '//following-sibling::button//i[contains(@class, "fa-search")]';
            props.UntilExist();
            props.UntilVisible();
            props.GetElement.click();
            browser.pause(3000);
            let pointerYes = '//button[string()="Yes"]';
            if (browser.isVisible(pointerYes)) {
                browser.click(pointerYes);
            }
            locator = locator.replace('fa-search', 'fa-trash');
            browser.waitUntil(() => {
                return browser.isExisting(locator) == true;
            }, 30000, 'DCTM Id or Url is not added', 250);
            props.UntilVisible();

        }
    },

    lookup2: {
        value: (legendName, labelName, itemNumber, dctmIdOrUrl) => {
            locator = '(' + legend.replace('***', legendName) + input.replace('***', labelName) + ')[' + itemNumber + ']';
            props.UntilExist();
            props.UntilVisible();
            props.GetElement.setValue(dctmIdOrUrl);
            locator = locator + '//following-sibling::button//i[contains(@class, "fa-search")]';
            props.UntilExist();
            props.UntilVisible();
            try {
                //props.Scroll();
                props.GetElement.click();
            }
            catch (err) {
                browser.execute(() => {
                    $('i.fa.fa-search').get(0).scrollIntoView();
                });
                props.GetElement.click();
            }
            browser.pause(3000);
            let pointerYes = '//button[string()="Yes"]';
            if (browser.isVisible(pointerYes)) {
                browser.click(pointerYes);
            }
            locator = locator.replace('fa-search', 'fa-trash');
            browser.waitUntil(() => {
                return browser.isExisting(locator) == true;
            }, 30000, 'DCTM Id or Url is not added', 250);
            props.UntilVisible();

        }
    },
    element: {
        value: (eleLocator) => {
            locator = eleLocator;
            props.UntilExist();
            return props.GetElement;
        }
    },
    invalid: {
        value: {
            get: (labelName) => {
                switch (labelName) {
                    case 'WebMD Nickname': locator = invalid.replace('***:', labelName); break;
                    default: locator = invalid.replace('***', labelName); break;
                }
                try {
                    let element = props.GetElement;
                    return element;
                } catch (err) {
                    return browser.isExisting(locator);
                }
            }
        }
    },
    required: {
        value: {
            get: (labelName) => {
                switch (labelName) {
                    case 'WebMD Nickname': locator = required.replace('***:', labelName); break;
                    default: locator = required.replace('***', labelName); break;
                }
                props.UntilExist();
                props.UntilVisible();
                return props.GetElement;
            }
        }
    },
    link: {
        value: {
            get: (linkName) => {
                locator = link.replace('***', linkName);
                props.UntilExist();
                return props.GetElement;
            }
        }
    },
    addLinks: {
        value: function (legendName, labelName, itemNumber, numberOfLinks) {

            locator = '(' + legend.replace('***', legendName) + label.replace('***', labelName) + '//input' + ')[' + itemNumber + ']';
            props.UntilExist();
            props.UntilVisible();
            props.GetElement.setValue(numberOfLinks);
            locator = '(' + legend.replace('***', legendName) + label.replace('***', labelName) + '//button' + ')[' + itemNumber + ']';
            props.UntilExist();
            props.UntilVisible();
            try {
                props.GetElement.click();
            } catch (err) {
                var location = props.GetElement.getLocation('y');
                browser.scroll(0, location + 250);
                props.GetElement.click();
            }
        }
    }

});

module.exports = props;
