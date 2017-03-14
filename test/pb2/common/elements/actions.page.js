var page = require('./../../../common/page');

var button = '//button[string()="***"]'; // For More Actions, Cancel Checkout, Save Publish, Checkout & Edit, Expire, Cancel, Continue, Ok
var button2 = '//span[string()="***"]'; //For View Read-Only, Edit
<<<<<<< HEAD
var button3 = '//button[contains(.,"***")]' //Just in case if the button does not have standard text
=======
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f
var label = '.pb-lifecycle.***'; //WIP, Staging, Active
var locator;

var acts = Object.create(page, {

    UntilExist: { value: () => { browser.waitForExist(locator, 30000); } },
    UntilVisible: { value: () => { browser.waitForVisible(locator, 30000); } },
    Ele: { get: () => { return browser.element(locator); } },


    button: {
        value: {
            get: (buttonText) => {
                switch (buttonText) {
                    case 'View Read-Only': locator = button2.replace('***', 'View Read-Only'); acts.UntilExist; acts.UntilVisible; return acts.Ele; break;
                    case 'Edit': locator = button2.replace('***', 'Edit'); acts.UntilExist; acts.UntilVisible; return acts.Ele; break;
                    default: locator = button.replace('***', buttonText); acts.UntilExist(); acts.UntilVisible(); return acts.Ele; break;
                }
            }
        }
    },

<<<<<<< HEAD
    splbutton: {
        value: {
            get: (buttonText) => {
                switch (buttonText) {
                    case 'View Read-Only': locator = button2.replace('***', 'View Read-Only'); acts.UntilExist; acts.UntilVisible; return acts.Ele; break;
                    case 'Edit': locator = button2.replace('***', 'Edit'); acts.UntilExist; acts.UntilVisible; return acts.Ele; break;
                    default: locator = button3.replace('***', buttonText); acts.UntilExist(); acts.UntilVisible(); return acts.Ele; break;
                }
            }
        }
    },

=======
>>>>>>> 02aa792cb553da063878b037d5c1787c0272f85f
    label: {
        value: {
            get: (version) => {

                locator = label.replace('***', version);
                acts.UntilExist;
                acts.UntilVisible;
                return acts.Ele;

            }
        }
    }

});

module.exports = acts;