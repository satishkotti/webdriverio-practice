var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert=require("assert");
var sap_Actions = require("d:/FE code/test/profile&revenue/prdemo/common/functions/FE_Smoke_SeeAllpages_Actions");
var sapElements = require('./../../../common/elements/FE_Smoke_SeeAllpages_Elements');
//var Article_Actions = require('./../../../common/functions/FE_Smoke_Article_Actions');
var Input = require('d:/FE code/test/profile&revenue/prdemo/config/FE_Smoke_SeeAllpages_testdata')[argv.env];

//browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
var URL = Input.environment;
browser.url(URL);

describe("sap validations",function()
{
   it("Should get the title of the current page",function(){
       sap_Actions.get_saptitle();
        var title=browser.getTitle();
            console.log(title);
            title.should.containEql('See All Page');
    });
        it("Validation for elements visibile", function () {
  var elements_visible ={ "elements" : [{"locator":sapElements.loe.selector, "scroll":sapElements.loe.selector, "text":"loe" },
  {"locator":sapElements.logo.selector, "scroll":sapElements.logo.selector, "text":"logo" },
  {"locator":sapElements.breadcrumb.selector, "scroll":sapElements.breadcrumb.selector, "text":"breadcrumb" },
  {"locator":sapElements.headerad.selector, "scroll":sapElements.headerad.selector, "text":"headerad" },
  {"locator":sapElements.facebookicon.selector, "scroll":sapElements.facebookicon.selector, "text":"facebookicon" },
  {"locator":sapElements.twittericon.selector, "scroll":sapElements.twittericon.selector, "text":"twittericon" },
  {"locator":sapElements.pintresticon.selector, "scroll":sapElements.pintresticon.selector, "text":"pintresticon" },
  {"locator":sapElements.emailicon.selector, "scroll":sapElements.emailicon.selector, "text":"emailicon" },
   {"locator":sapElements.textelementforsearch.selector, "scroll":sapElements.textelementforsearch.selector, "text":"textelementforsearch" } 

   ]};
sap_Actions.Verify_ElementIsVisible(elements_visible);

  }); 
    it("Validation of menuitems", function () {
     sap_Actions.menuitem_working(sapElements.healthmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
            browser.back();
  });
  it("Validation of menuitems", function () {
     sap_Actions.menuitem_working(sapElements.drugmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
            browser.back();
  });
  it("Validation of menuitems", function () {
     sap_Actions.menuitem_working(sapElements.livingmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
            browser.back();
  });
it("Validation of menuitems", function () {
     sap_Actions.menuitem_working(sapElements.familymi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('Family & Pregnancy Center');
            browser.back();
  });
it("Validation of menuitems", function () {
     sap_Actions.menuitem_working(sapElements.newsmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
            browser.back();
  });
  it("Validation of pageheader", function () {
     sap_Actions.page_header(sapElements.pageheader.selector);
  });
  it("Validation of seeallgrid", function () {
     sap_Actions.see_all_grid(sapElements.seeallgrid.selector);
  });

});