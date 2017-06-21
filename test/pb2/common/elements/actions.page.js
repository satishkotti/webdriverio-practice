var page = require('./../../../common/page');

var button = '//button[string()="***"]'; // For More Actions, Cancel Checkout, Save Publish, Checkout & Edit, Expire, Cancel, Continue, Ok
var button2 = '//span[string()="***"]'; //For View Read-Only, Edit
var button3 = '//button[contains(.,"***")]' //Just in case if the button does not have standard text
const button4 = '//a[string()="***"]';

var label = '.pb-lifecycle.***'; //WIP, Staging, Active
var locator;

var acts = Object.create(page, {

    UntilExist: { value: () => { browser.waitForExist(locator, 30000); } },
    UntilVisible: { value: () => { browser.waitForVisible(locator, 30000); } },
    GetElement: { get: () => { return browser.element(locator); } },


    button: {
        value: {
            get: (buttonText) => {
                switch (buttonText) {
                    case 'View Read-Only': locator = button2.replace('***', 'View Read-Only'); acts.UntilExist; acts.UntilVisible; return acts.GetElement; break;
                    case 'Edit': locator = button2.replace('***', 'Edit'); acts.UntilExist; acts.UntilVisible; return acts.GetElement; break;
                    case 'Export to Excel': locator = button4.replace('***', 'Export to Excel'); acts.UntilExist; acts.UntilVisible; return acts.GetElement; break;
                    case 'Update Redirect': locator = button3.replace('***', 'Edit'); acts.UntilExist; acts.UntilVisible; return acts.GetElement; break;
                    default: locator = button.replace('***', buttonText); acts.UntilExist(); acts.UntilVisible(); return acts.GetElement; break;
                }
            }
        }
    },
    splbutton: {
        value: {
            get: (buttonText) => {
                switch (buttonText) {
                    case 'View Read-Only': locator = button2.replace('***', 'View Read-Only'); acts.UntilExist; acts.UntilVisible; return acts.GetElement; break;
                    case 'Edit': locator = button2.replace('***', 'Edit'); acts.UntilExist; acts.UntilVisible; return acts.GetElement; break;
                    default: locator = button3.replace('***', buttonText); acts.UntilExist(); acts.UntilVisible(); return acts.GetElement; break;
                }
            }
        }
    },
    label: {
        value: {
            get: (version) => {

                locator = label.replace('***', version);
                acts.UntilExist;
                acts.UntilVisible;
                return acts.GetElemente;

            }
        }
    },

    buttonMenu:
    {
        value:
        {
            get:
                (buttonText, menuItem) =>
                {
                    acts.button.get(buttonText).click();
                    locator = '//li[string()="' + menuItem + '"]';
                    acts.GetElement.waitForVisible();
                    acts.GetElement.click();
                }
        }
    },
   element: { value: (eleLocator) => 
        { 
            locator = eleLocator;
            props.UntilExist();
            return props.GetElement;
        }},

});

module.exports = acts;