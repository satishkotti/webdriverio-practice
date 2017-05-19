var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert=require("assert");
var toc_Actions = require("d:/FE code/test/profile&revenue/prdemo/common/functions/FE_Smoke_Toc_Actions");
var tocElements = require('./../../../common/elements/FE_Smoke_Toc_Elements');
//var Article_Actions = require('./../../../common/functions/FE_Smoke_Article_Actions');
var Input = require('d:/FE code/test/profile&revenue/prdemo/config/FE_Smoke_SS_testdata')[argv.env];

//browser.url("http://www.preview.webmd.com/diet/ss/slideshow-healthy-eating-resolutions");
var URL = Input.environment;
browser.url(URL);

describe("TOC validations",function()
{
   it("Should get the title of the current page",function(){
       toc_Actions.get_toctitle();
        var title=browser.getTitle();
            console.log(title);
            title.should.containEql('FED2 Segment 1 TOC');
    });
   it("Should validate hero Image being visible on the page",function()
   { 
         toc_Actions.image_visibility(tocElements.image.selector);       
    });
    it("Should validate masonary grid being visible on the page",function(){
        toc_Actions.masonarygrid_visibility(tocElements.masonarygrid.selector);
    });
    it("Should validate whether seemore button is working on the page",function(){
        toc_Actions.seemore_working(tocElements.seemore.selector);
        browser.back();
    });
        it("Validation for elements visibile", function () {
  var elements_visible ={ "elements" : [{"locator":tocElements.loe.selector, "scroll":tocElements.loe.selector, "text":"loe" },
  {"locator":tocElements.logo.selector, "scroll":tocElements.logo.selector, "text":"logo" },
  {"locator":tocElements.headerad.selector, "scroll":tocElements.headerad.selector, "text":"headerad" },
  {"locator":tocElements.facebookicon.selector, "scroll":tocElements.facebookicon.selector, "text":"facebookicon" },
  {"locator":tocElements.twittericon.selector, "scroll":tocElements.twittericon.selector, "text":"twittericon" },
  {"locator":tocElements.pintresticon.selector, "scroll":tocElements.pintresticon.selector, "text":"pintresticon" },
  {"locator":tocElements.emailicon.selector, "scroll":tocElements.emailicon.selector, "text":"emailicon" },
   {"locator":tocElements.textelementforsearch.selector, "scroll":tocElements.textelementforsearch.selector, "text":"textelementforsearch" } 

   ]};
toc_Actions.Verify_ElementIsVisible(elements_visible);

  }); 
    it("Validation of menuitems", function () {
     toc_Actions.menuitem_working(tocElements.healthmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
            browser.back();
  });
  it("Validation of menuitems", function () {
     toc_Actions.menuitem_working(tocElements.drugmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
            browser.back();
  });
  it("Validation of menuitems", function () {
     toc_Actions.menuitem_working(tocElements.livingmi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
            browser.back();
  });
it("Validation of menuitems", function () {
     toc_Actions.menuitem_working(tocElements.familymi.selector);
     var title=browser.getTitle();
            console.log(title);
            title.should.containEql('Family & Pregnancy Center');
            browser.back();
  });
it("Validation of menuitems", function () {
     toc_Actions.menuitem_working(tocElements.newsmi.selector);
     var title=browser.getTitle();
            console.log(title);
           title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
            browser.back();
  });
});