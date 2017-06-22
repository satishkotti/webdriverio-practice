var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var assert = require("assert");
var ss_Actions = require('../common/functions/FE_Smoke_SS_Action');
var ssElements = require('../common/elements/FE_Smoke_SS_Elements');
var common_Actions = require("../common/functions/common.actions");
var common_Elements = require('../common/elements/FE_Smoke_Toc_Elements');
var Input = require('../config/FE.testdata')[argv.env];
var URL = Input.SS_url;
browser.url(URL);
browser.refresh();
describe("SlideShow validations", function () {
    it("Should validate Slide Image and Slide title being visible for all slides", function () {
        //browser.leftClick('//div[@id="colorbox"]//div[@id="webmdHoverWrapper"]//div[@id="webmdHoverContent"]//div[@id="webmdHoverClose"]');
        ss_Actions.Imageandtitle_visibility();
    });
    it("Should validate Disclaimer for first slide and Source for all slides", function () {
        ss_Actions.Disclaimer_visibility();
    });
    it("Should validate Working of the Source for all slides", function () {
        ss_Actions.Source_working();
    });
    it("Should validate Working of the background color of Primary navigation buttons", function () {
        ss_Actions.Background_color_primary();
    });
    it("Should validate Working of the background color of Secondary navigation buttons", function () {
        ss_Actions.Background_color_secondary();
    });

    it("Should check for working of next and previous Primary navigation buttons validation", function () {
        ss_Actions.Check_primary_next_previous_button();
    });
    it("Should check for working of next and previous Secondary navigation buttons validation", function () {
        ss_Actions.Check_secondary_next_previous_button();
    });
    it("Validation for Breadcrumb Text", function () {
        var name1 = 'Diet & Weight Management';
        actions = ss_Actions.Search(ssElements.Breadcrumb.selector, ssElements.Breadcrumb.selector).breadcrumb_text;
        actions.should.equal(name1);
    });
    it("Validation for elements visibile", function () {
        var elements_visible = {
            "elements": [{ "locator": ssElements.Breadcrumb.selector, "scroll": ssElements.Breadcrumb.selector },
            { "locator": ssElements.logo.selector, "scroll": ssElements.logo.selector },
            { "locator": ssElements.headerad.selector, "scroll": ssElements.headerad.selector },
            { "locator": ssElements.rightasidead.selector, "scroll": ssElements.rightasidead.selector },
            { "locator": common_Elements.facebookicon.selector, "scroll": common_Elements.facebookicon.selector },
            { "locator": common_Elements.twittericon.selector, "scroll": common_Elements.twittericon.selector },
            { "locator": common_Elements.pintresticon.selector, "scroll": common_Elements.pintresticon.selector },
            { "locator": common_Elements.emailicon.selector, "scroll": common_Elements.emailicon.selector },
            { "locator": ssElements.textelementforsearch.selector, "scroll": ssElements.textelementforsearch.selector }
            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);
    });
});