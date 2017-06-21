var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var assert = require("assert");
var common_Actions = require('../common/functions/Common.actions');
var tocElements = require('../common/elements/FE_Smoke_Toc_Elements');
var input = require('../config/FE.testdata')[argv.env];
var URL = input.TOC_url;
browser.url(URL);
describe("Validation of title,hero Image,masonary grid,seemore button,elements,MastHead present on Toc page", function() {
    it("Should get the title of the current page", function() {
        common_Actions.get_toctitle();
        var title = browser.getTitle();
        title.should.containEql('FED2 Segment 1 TOC');
    });
    it("Should validate hero Image being visible on the page", function() {
        common_Actions.check_Heroimage_visibility(tocElements.image.selector);
    });
    it("Should validate masonary grid being visible on the page", function() {
        common_Actions.check_masonarygrid_visibility(tocElements.masonarygrid.selector);
    });
    it("Should validate whether seemore button is working on the page", function() {
        common_Actions.seemore_working(tocElements.seemore.selector);
        browser.back();
    });
    it("Validation for elements visibile", function() {
        browser.waitForVisible(tocElements.loe.selector);
        var elements_visible = {
            "elements": [{ "locator": tocElements.loe.selector, "scroll": tocElements.loe.selector, "text": "loe" },
                { "locator": tocElements.logo.selector, "scroll": tocElements.logo.selector, "text": "logo" },
                { "locator": tocElements.headerad.selector, "scroll": tocElements.headerad.selector, "text": "headerad" },
                { "locator": tocElements.facebookicon.selector, "scroll": tocElements.facebookicon.selector, "text": "facebookicon" },
                { "locator": tocElements.twittericon.selector, "scroll": tocElements.twittericon.selector, "text": "twittericon" },
                { "locator": tocElements.pintresticon.selector, "scroll": tocElements.pintresticon.selector, "text": "pintresticon" },
                { "locator": tocElements.emailicon.selector, "scroll": tocElements.emailicon.selector, "text": "emailicon" },
                { "locator": tocElements.textelementforsearch.selector, "scroll": tocElements.textelementforsearch.selector, "text": "textelementforsearch" }
            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);
    });
    it("Validation of MastHead for WebMd : WebMD Common Health Topics A-Z Link", function() {
        var title = common_Actions.Click_MastHead(tocElements.healthmi.selector).page_title;
        title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
    });
    it("Validation of MastHead for WebMd : WebMD Drugs & Medications Link", function() {
        var title = common_Actions.Click_MastHead(tocElements.drugmi.selector).page_title;
        title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
    });
    it("Validation of MastHead for WebMd : Living Healthy Link", function() {
        var title = common_Actions.Click_MastHead(tocElements.livingmi.selector).page_title;
        title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
    });
    it("Validation of MastHead for Family and Pregnancy Center Link Center Link", function() {
        var title = common_Actions.Click_MastHead(tocElements.familymi.selector).page_title;
        title.should.containEql('Family & Pregnancy Center');
    });
    it("Validation of MastHead for WebMd Health News Center Link", function() {
        var title = common_Actions.Click_MastHead(tocElements.newsmi.selector).page_title;
        title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
    });
});