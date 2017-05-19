var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
describe(' Verify if The attribution displays above the right-rail', function () {
  this.timeout(60000);
  it(" Verify if The attribution displays above the right-rail", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();
   // browser.elementIdDisplayed(Commonlocators.Right_attribution.selector);
   browser.isExisting(Commonlocators.Right_attribution.selector);
    console.log("attribution is available");
   
  });
  });