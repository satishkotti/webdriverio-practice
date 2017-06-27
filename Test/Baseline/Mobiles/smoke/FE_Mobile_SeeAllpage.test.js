var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var assert = require("assert");
var common_Actions = require("../common/functions/Mobile_common.actions");
var sapElements = require('../common/elements/FE_Mobile_SeeAllpage_Elements');
var input = require('../config/FE_Mobile.testdata')[argv.env];
var URL = input.See_all_url;
browser.url(URL);
describe("validation of title,elements,MastHead present on Sap page", function() {
    it("Should get the title of the current page", function() {
        common_Actions.get_title();
        var title = browser.getTitle();
        title.should.containEql('See All Page');
    });
    it("Validation for elements visibile", function() {
        var elements_visible = {
            "elements": [{ "locator": sapElements.loe.selector, "scroll": sapElements.loe.selector, "text": "loe" },
                { "locator": sapElements.logo.selector, "scroll": sapElements.logo.selector, "text": "logo" },
                { "locator": sapElements.breadcrumb.selector, "scroll": sapElements.breadcrumb.selector, "text": "breadcrumb" },
                { "locator": sapElements.facebookicon.selector, "scroll": sapElements.facebookicon.selector, "text": "facebookicon" },
                { "locator": sapElements.twittericon.selector, "scroll": sapElements.twittericon.selector, "text": "twittericon" },
                { "locator": sapElements.pintresticon.selector, "scroll": sapElements.pintresticon.selector, "text": "pintresticon" },
                { "locator": sapElements.pageheader.selector, "scroll": sapElements.pageheader.selector, "text": "pageheader" },
                { "locator": sapElements.seeallgrid.selector, "scroll": sapElements.seeallgrid.selector, "text": "seeallgrid" },
                { "locator": sapElements.emailicon.selector, "scroll": sapElements.emailicon.selector, "text": "emailicon" },
                { "locator": sapElements.textelementforsearch.selector, "scroll": sapElements.textelementforsearch.selector, "text": "textelementforsearch" }
            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);
    });
    it.skip("Validation of MastHead for WebMd : WebMD Common Health Topics A-Z Link", function() {
        browser.click(sapElements.masthead_burger.selector);
        browser.scroll(sapElements.healthmi.selector);
        var title = common_Actions.Click_MastHead(sapElements.healthmi.selector).page_title;
        title.should.containEql('Common Health conditions A-Z');
    });
    it("Validation of MastHead for WebMd : WebMD Drugs & Medications Link", function() {
        browser.click(sapElements.masthead_burger.selector);
        browser.scroll(sapElements.drugmi.selector);
        var title = common_Actions.Click_MastHead(sapElements.drugmi.selector).page_title;
        title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
    });
    it("Validation of MastHead for WebMd : Living Healthy Link", function() {
        browser.click(sapElements.masthead_burger.selector);
        browser.scroll(sapElements.livingmi.selector);
        var title = common_Actions.Click_MastHead(sapElements.livingmi.selector).page_title;
        title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
    });
    it("Validation of MastHead for Family and Pregnancy Center Link Center Link", function() {
        browser.click(sapElements.masthead_burger.selector);
        browser.scroll(sapElements.familymi.selector);
        var title = common_Actions.Click_MastHead(sapElements.familymi.selector).page_title;
        title.should.containEql('Family & Pregnancy Center');
    });
    it("Validation of MastHead for WebMd Health News Center Link", function() {
        browser.click(sapElements.masthead_burger.selector);
        browser.scroll(sapElements.newsmi.selector);
        var title = common_Actions.Click_MastHead(sapElements.newsmi.selector).page_title;
        title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
    });
});