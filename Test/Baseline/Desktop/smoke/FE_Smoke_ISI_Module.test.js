var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var common_Actions = require("./../common/functions/Common.actions");
var ISI_Elements_Page = require('../common/elements/FE_Smoke_Articles_ISI_Elements');
var input = require('../config/FE.testdata')[argv.env];
var url = input.ISI_url;
browser.url(url);

describe('Validation of Icons on ISI page ', function() {
    this.timeout(90000);
    if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');
        browser.pause(1000);
    }

    it("Validation for ISI Text  visibile", function() {
        var elements_visible = {
            "elements": [
                { "locator": ISI_Elements_Page.Global_Header.selector, "scroll": ISI_Elements_Page.Global_Header.selector },
                { "locator": ISI_Elements_Page.Top_Ad.selector, "scroll": ISI_Elements_Page.Top_Ad.selector },
                { "locator": ISI_Elements_Page.Right_Ad.selector, "scroll": ISI_Elements_Page.Right_Ad.selector },
                { "locator": ISI_Elements_Page.Left_Ad.selector, "scroll": ISI_Elements_Page.Left_Ad.selector },
                { "locator": ISI_Elements_Page.Left_Rail.selector, "scroll": ISI_Elements_Page.Left_Rail.selector },
                { "locator": ISI_Elements_Page.Attribution.selector, "scroll": ISI_Elements_Page.Attribution.selector },
                { "locator": ISI_Elements_Page.ISI_module_Normal.selector, "scroll": ISI_Elements_Page.ISI_module_Normal.selector },

            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);
    });

    /* This method will validate if the ISI overlay opens up completely once we click on Show more button and closes on clikcing on Show Less button */

    it("Validation for ISI in Full mode ", function() {
        browser.click(ISI_Elements_Page.ISI_button.selector);
        browser.pause(3000);
        var ISI_Text = browser.getText(ISI_Elements_Page.ISI_module_Full.selector);
        // - Comapring ISI text content --if(ISI_Text.context.)
        // ISI_Text.should.

        browser.click(ISI_Elements_Page.ISI_Show_Less.selector);
    });
    /* This method will validate if the ISI overlay has disappeared once the Page ISI has come into view */

    it("Validation for page ISI Hiding ISI overlay ", function() {

        browser.pause(2000);
        browser.scroll(ISI_Elements_Page.ISI_Page_content.selector);
        browser.pause(5000);
        if (browser.isVisible(ISI_Elements_Page.ISI_Page_content.selector))
            browser.isExisting(ISI_Elements_Page.ISI_module_Hidden.selector);

    });
});