var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
var common_Actions = require("./../../common/functions/common.actions");
var See_All_common_Elements = require('./../../common/elements/FE_Smoke_Toc_Elements');
var sap_Actions = require("./../../common/functions/FE_Smoke_SeeAllpages_Actions");
var sapElements = require('./../../common/elements/FE_Smoke_SeeAllpages_Elements');
var Input = require('./../../config/FE.testdata')[argv.env];
//-- Url navigation ---    browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
var URL = Input.See_All_url;
browser.url(URL);

describe("sap validations", function () {
  it("Should get the title of the current page", function () {
    sap_Actions.get_saptitle();
    var title = browser.getTitle();
    console.log(title);
    title.should.containEql('See All Page');
  });
  it("Validation for elements visibile", function () {
    var elements_visible = {
      "elements": [{ "locator": sapElements.loe.selector, "scroll": See_All_common_Elements.loe.selector},
      { "locator": See_All_common_Elements.logo.selector, "scroll": See_All_common_Elements.logo.selector},
      { "locator": See_All_common_Elements.breadcrumb.selector, "scroll": See_All_common_Elements.breadcrumb.selector},
      { "locator": See_All_common_Elements.headerad.selector, "scroll": See_All_common_Elements.headerad.selector},
      { "locator": See_All_common_Elements.facebookicon.selector, "scroll": See_All_common_Elements.facebookicon.selector},
      { "locator": See_All_common_Elements.twittericon.selector, "scroll": See_All_common_Elements.twittericon.selector},
      { "locator": See_All_common_Elements.pintresticon.selector, "scroll": See_All_common_Elements.pintresticon.selector },
      { "locator": sapESee_All_common_Elementslements.emailicon.selector, "scroll": See_All_common_Elements.emailicon.selector},
      { "locator": See_All_common_Elements.textelementforsearch.selector, "scroll": See_All_common_Elements.textelementforsearch.selector}

      ]
    };
    common_Actions.Verify_ElementIsVisible(elements_visible);

  });
  it("Validation of Masthead Navigation related to Common Health topics A-Z ", function () {
    var title=sap_Actions.Menuitem_working(sapElements.healthmi.selector).Menu_Title;
    title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
    });
  it("Validation Masthead Navigation related to WebMd Drug and Medications", function () {
    var title=sap_Actions.Menuitem_working(sapElements.drugmi.selector).Menu_Title;
    title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
  });
  it("Validation of Masthead Navigation related to Healthy Living", function () {
   var title= sap_Actions.Menuitem_working(sapElements.livingmi.selector).Menu_Title;
    title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
   
  });
  it("Validation of Masthead Navigation related to Family Pregnancy Center", function () {
    var title=sap_Actions.Menuitem_working(sapElements.familymi.selector).Menu_Title;
   title.should.containEql('Family & Pregnancy Center');
    });
  it("Validation of Masthead Navigation related to WebMd Health News Center", function () {
    var title=sap_Actions.Menuitem_working(sapElements.newsmi.selector).Menu_Title;
    title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
  });
  it("Validation of pageheader", function () {
    sap_Actions.page_header(sapElements.pageheader.selector);
  });
  it("Validation of seeallgrid", function () {
    sap_Actions.see_all_grid(sapElements.seeallgrid.selector);
  });

});