var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
describe('Validation of masthhead elemenmts functionality', function () {
  this.timeout(60000);
  it("click on health A-Z and verify the user is takem to new page", function () {
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
});
