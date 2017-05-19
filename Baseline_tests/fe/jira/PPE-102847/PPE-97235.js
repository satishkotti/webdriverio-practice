var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/BrandedDestination.elements');
describe('Verify all the program names, subsections and headlines in the hierarchical structure are individually clickable and navigates to TOC page', function () {
  this.timeout(60000);
  it("Verify all the program names TOC page", function () {
    // console.log(search.twitter);
   // actn.open();
   Commonlocators.open();
    var actions = actn.click_GetPage_Title(Commonlocators.Program_Name.selector,Commonlocators.Program_Name.selector);
    actions.current_page.should.not.equal(actions.navigated_title);

  });

    it("Verify subsections and headlines in the hierarchical structure are individually clickable and navigates to TOC page", function () {
    // console.log(search.twitter);
   // actn.open();
   Commonlocators.open();
    var actions = actn.click_GetPage_Title(Commonlocators.Subsec1.selector,Commonlocators.Subsec1.selector);
    actions.current_page.should.not.equal(actions.navigated_title);
    Commonlocators.open();
    var actions = actn.click_GetPage_Title(Commonlocators.Subsec2.selector,Commonlocators.Subsec2.selector);
    actions.current_page.should.equal(actions.navigated_title);
    Commonlocators.open();
    var actions = actn.click_GetPage_Title(Commonlocators.Subsec3.selector,Commonlocators.Subsec3.selector);
    actions.current_page.should.not.equal(actions.navigated_title);
     Commonlocators.open();
    var actions = actn.click_GetPage_Title(Commonlocators.Subsec4.selector,Commonlocators.Subsec4.selector);
    actions.current_page.should.not.equal(actions.navigated_title);



  });

     it("Verify the name of the page should be underlined on mouse over in the left rail", function () {
    // console.log(search.twitter);
   // actn.open();
//Commonlocators.open();
browser.url(url);
       browser.moveToObject(BrandedCommonlocators.Subsec1.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_text_decoration(BrandedCommonlocators.Subsec1.selector);
    actions.text_decoration_line.value.should.equal('underline');

    browser.moveToObject(BrandedCommonlocators.Subsec2.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_text_decoration(BrandedCommonlocators.Subsec2.selector);
    actions.text_decoration_line.value.should.equal('underline');

    browser.moveToObject(BrandedCommonlocators.Subsec3.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_text_decoration(BrandedCommonlocators.Subsec3.selector);
    actions.text_decoration_line.value.should.equal('underline');

    browser.moveToObject(BrandedCommonlocators.Subsec4.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_text_decoration(BrandedCommonlocators.Subsec4.selector);
    actions.text_decoration_line.value.should.equal('underline'); 

    browser.moveToObject(BrandedCommonlocators.Program_Name.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_text_decoration(BrandedCommonlocators.Program_Name.selector);
    actions.text_decoration_line.value.should.equal('underline');       
  });

it("Verify the name of the page being viewed is highlighted in the left rail", function () {
    // console.log(search.twitter);
   // actn.open();
//Commonlocators.open();
//browser.url(url);
       browser.click(BrandedCommonlocators.Subsec1.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_background_color(BrandedCommonlocators.page_viewd.selector);
           var text= eval(actions);
           console.log(text.hex);
              //actions.background_color.value.should.equal('underline');

  /*  browser.moveToObject(BrandedCommonlocators.Subsec2.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
          var actions = search.verify_background_color(BrandedCommonlocators.page_viewd.selector);
    actions.background_color.value.should.equal('underline');

    browser.moveToObject(BrandedCommonlocators.Subsec3.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
          var actions = search.verify_background_color(BrandedCommonlocators.page_viewd.selector);
    actions.background_color.value.should.equal('underline');

    browser.moveToObject(BrandedCommonlocators.Subsec4.selector);
           //var icon = $(Commonlocators.Subsec1.selector);
           var actions = search.verify_background_color(BrandedCommonlocators.page_viewd.selector);
    actions.background_color.value.should.equal('underline'); */      

       
  });
  it(" PPE-99923:click on health A-Z and verify the user is takem to new page", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
    var text = browser.getText(Commonlocators.HealthA_Z.selector);
   // console.log(text);
   text.should.equal("HEALTH\nA-Z");
   browser.click(Commonlocators.HealthA_Z.selector);
   var url= browser.getUrl();
   url.should.equal("http://www.staging.webmd.com/a-to-z-guides/common-topics/default.htm");
    //actions.height.should.

Commonlocators.open();
  });
  it("click onDrugs and supplements and verify the user is takem to new page", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
    var text = browser.getText(Commonlocators.Drugs_Supplements.selector);
   // console.log(text);
   text.should.equal("DRUGS &\nSupplements");
   browser.click(Commonlocators.Drugs_Supplements.selector);
   var url= browser.getUrl();
   url.should.equal("http://www.staging.webmd.com/drugs/index-drugs.aspx");
    //actions.height.should.

Commonlocators.open();
  });
  it("click on living healthy and verify the user is takem to new page", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
    var text = browser.getText(Commonlocators.Living_healthy.selector);
   // console.log(text);
   text.should.equal("LIVING\nHEALTHY");
   browser.click(Commonlocators.Living_healthy.selector);
   var url= browser.getUrl();
   url.should.equal("http://www.staging.webmd.com/living-healthy");
    //actions.height.should.

Commonlocators.open();
  });
   it("click on family and pregnancy and verify the user is takem to new page", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
    var text = browser.getText(Commonlocators.Family_Pregnancy.selector);
   // console.log(text);
   text.should.equal("FAMILY &\nPREGNANCY");
   browser.click(Commonlocators.Family_Pregnancy.selector);
   var url= browser.getUrl();
   url.should.equal("http://www.staging.webmd.com/family-pregnancy");
    //actions.height.should.

Commonlocators.open();
  });
  it("click on news and experts and verify the user is takem to new page", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
    var text = browser.getText(Commonlocators.News_Experts.selector);
   // console.log(text);
   text.should.equal("NEWS &\nEXPERTS");
   browser.click(Commonlocators.News_Experts.selector);
   var url= browser.getUrl();
   url.should.equal("http://www.staging.webmd.com/news/default.htm");
    //actions.height.should.

//Commonlocators.open();
  });
   
it("PPE-100096:Verify if line of entitlement displays below the breadcrumb", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
    var text = browser.getText(Commonlocators.Breadcrumb.selector);
    console.log(text);
   text.should.equal("zz test sp");
   var LOE = browser.getText(Commonlocators.LOE.selector);
    console.log(LOE);
   LOE.should.equal("This content is from our sponsor. The sponsor has sole editorial control.");
   
  });
  });