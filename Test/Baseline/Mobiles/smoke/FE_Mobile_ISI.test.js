var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var ISI_Elements_Page = require('../common/elements/FE_Mobile_ISI_Elements');
var common_Actions = require("../common/functions/Mobile_common.actions");
var input = require('../config/FE_Mobile.testdata')[argv.env];
var url = input.ISI_url;
browser.url(url);
describe('Validation of Icons on ISI page ', function() {
    it("Validation for ISI Text  visibile", function() {
        var elements_visible = {
            "elements": [
                { "locator": ISI_Elements_Page.Global_Header.selector, "scroll": ISI_Elements_Page.Global_Header.selector },
                { "locator": ISI_Elements_Page.Left_Rail.selector, "scroll": ISI_Elements_Page.Left_Rail.selector },
                { "locator": ISI_Elements_Page.Attribution.selector, "scroll": ISI_Elements_Page.Attribution.selector },
                { "locator": ISI_Elements_Page.ISI_module_Normal.selector, "scroll": ISI_Elements_Page.ISI_module_Normal.selector },
            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);
    });
    /* This method will validate if the ISI overlay opens up completely once we click on Show more button and closes on clikcing on Show Less button */
    it.skip("Validation for ISI in Full mode ", function() {
        browser.scroll(ISI_Elements_Page.ISI_button.selector);
        browser.click(ISI_Elements_Page.ISI_button.selector);
        browser.pause(3000);
        var ISI_Text = browser.getText(ISI_Elements_Page.ISI_module_Full.selector);
        browser.leftClick(ISI_Elements_Page.ISI_Show_Less.selector);
    });
    /* This method will validate if the ISI overlay has disappeared once the Page ISI has come into view */
    it("Validation for page ISI Hiding ISI overlay ", function() {
        browser.pause(2000);
        browser.scroll(0, 3000);
        browser.pause(5000);
        if (browser.isVisible(ISI_Elements_Page.ISI_Page_content.selector))
            browser.isExisting(ISI_Elements_Page.ISI_module_Hidden.selector);
    });
});