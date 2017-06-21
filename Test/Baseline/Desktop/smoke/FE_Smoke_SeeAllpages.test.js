var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
var common_Actions = require("../common/functions/common.actions");
var sapElements = require('../common/elements/FE_Smoke_SeeAllpages_Elements');
var Input = require('../config/FE.testdata')[argv.env];
var URL = Input.See_all_url;
browser.url(URL);
describe("sap validations", function() {
    it("Should get the title of the current page", function() {
        common_Actions.get_title();
        var title = browser.getTitle();
        title.should.containEql('See All Page');
    });
    it("Validation for elements visibile", function() {
        browser.pause(3000);
        var elements_visible = {
            "elements": [{ "locator": sapElements.loe.selector, "scroll": sapElements.loe.selector, "text": "loe" },
                { "locator": sapElements.logo.selector, "scroll": sapElements.logo.selector, "text": "logo" },
                { "locator": sapElements.breadcrumb.selector, "scroll": sapElements.breadcrumb.selector, "text": "breadcrumb" },
                { "locator": sapElements.headerad.selector, "scroll": sapElements.headerad.selector, "text": "headerad" },
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
    it("Validation of MastHead for WebMd : WebMD Common Health Topics A-Z Link", function() {
        var title = common_Actions.Click_MastHead(sapElements.healthmi.selector).page_title;
        title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
    });
    it("Validation of MastHead for WebMd : WebMD Drugs & Medications Link", function() {
        var title = common_Actions.Click_MastHead(sapElements.drugmi.selector).page_title;
        title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
    });
    it("Validation of MastHead for WebMd : Living Healthy Link", function() {
        var title = common_Actions.Click_MastHead(sapElements.livingmi.selector).page_title;
        title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
    });
    it("Validation of MastHead for Family and Pregnancy Center Link Center Link", function() {
        var title = common_Actions.Click_MastHead(sapElements.familymi.selector).page_title;
        title.should.containEql('Family & Pregnancy Center');
    });
    it("Validation of MastHead for WebMd Health News Center Link", function() {
        var title = common_Actions.Click_MastHead(sapElements.newsmi.selector).page_title;
        title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
    });
});