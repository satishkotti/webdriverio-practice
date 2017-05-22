var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
var toc_Actions = require("./../../common/functions/FE_Smoke_Toc_Actions");
var common_Actions = require("./../../common/functions/common.actions");
var tocElements = require('./../../common/elements/FE_Smoke_Toc_Elements');
var toc_common_Elements = require('./../../common/elements/FE_Smoke_Toc_Elements');
var Input = require('./../../config/FE.testdata')[argv.env];
var URL = Input.TOC_url;
browser.url(URL);

describe("TOC validations", function () {
    it("Should get the title of the current page", function () {
        toc_Actions.get_toctitle();
        var title = browser.getTitle();
        console.log(title);
        title.should.containEql('FED2 Segment 1 TOC');
    });
    it("Should validate hero Image being visible on the page", function () {
        toc_Actions.Heroimage_visibility(tocElements.image.selector);
    });
    it("Should validate masonary grid being visible on the page", function () {
        toc_Actions.Masonarygrid_visibility(tocElements.masonarygrid.selector);
    });
    it("Should validate whether seemore button is working on the page", function () {
        toc_Actions.Seemore_working(tocElements.seemore.selector);
        
    });
    it("Validation for elements visibile", function () {
        var elements_visible = {
            "elements": [{ "locator": toc_common_Elements.LOE.selector, "scroll": tocElements.loe.selector},
            { "locator": toc_common_Elements.logo.selector, "scroll": tocElements.logo.selector},
            { "locator": tocElements.headerad.selector, "scroll": tocElements.headerad.selector},
            { "locator": toc_common_Elements.facebookicon.selector, "scroll": tocElements.facebookicon.selector},
            { "locator": toc_common_Elements.twittericon.selector, "scroll": tocElements.twittericon.selector},
            { "locator": toc_common_Elements.pintresticon.selector, "scroll": tocElements.pintresticon.selector},
            { "locator": toc_common_Elements.emailicon.selector, "scroll": tocElements.emailicon.selector},
            { "locator": toc_common_Elements.textelementforsearch.selector, "scroll": tocElements.textelementforsearch.selector}

            ]
        };
        toc_Actions.Verify_ElementIsVisible(elements_visible);

    });
    it("Validation of menuitems", function () {
        var title= common_Actions.Menuitem_working(tocElements.healthmi.selector).Menu_Title;
        title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');   
    });
    it("Validation of menuitems", function () {
        var title=common_Actions.Menuitem_working(tocElements.drugmi.selector).Menu_Title;
        title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines'); 
    });
    it("Validation of MastHead for WebMd : Living Healthy Link", function () {
        var title = common_Actions.Menuitem_working(tocElements.livingmi.selector).Menu_Title;
        title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
     });
    it("Validation of MastHead for Family and Pregnancy Center Link Center Link", function () {
        var title=common_Actions.Menuitem_working(tocElements.familymi.selector).Menu_Title;
        title.should.containEql('Family & Pregnancy Center');
    });
    it("Validation of MastHead for WebMd Health News Center Link", function () {
        var title=common_Actions.Menuitem_working(tocElements.newsmi.selector).Menu_Title;
        title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
        
    });
});