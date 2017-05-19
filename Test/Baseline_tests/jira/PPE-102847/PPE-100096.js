var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-102847.testdata')[argv.env];
//var input = require('./../../config/PPE-101748.testdata')[argv.env];

var url = input.environment;
describe('Verify if line of entitlement displays below the breadcrumb', function () {
  this.timeout(60000);
  it("Verify if line of entitlement displays below the breadcrumb", function () {
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
  
  it("json object: verify element visible", function () {
    // console.log(search.twitter);
   // actn.open();
//Commonlocators.open();
browser.url('http://www.preview.webmd.com/zztest/revenue-products/fed2/seg1/art-2');
  var elements_visible ={ "elements_visible" : [{"element_value":Commonlocators.twitter.selector, "element_scroll":Commonlocators.twitter.selector, "text":"twitter" }, 
    {"element_value":Commonlocators.pintrest.selector, "element_scroll":Commonlocators.pintrest.selector, "text":"pintrestr"}, 
    {"element_value":Commonlocators.facebook.selector, "element_scroll":Commonlocators.facebook.selector, "text":"facebook"},
    {"element_value":Commonlocators.email.selector, "element_scroll":Commonlocators.email.selector, "text":"email"}

   ]};
  // var obj = JSON.parse(JSON.stringify(elements_visible));
  var count =  elements_visible.elements_visible.length;
    for( i=0; i<count;i++)
  {
   if(browser.isVisible(elements_visible.elements_visible[i].element_value))
   {
console.log(elements_visible.elements_visible[i].text,"element is visible");
   }
   else
   {
     console.log(elements_visible.elements_visible[i].text,"element is not visible");
   }
  }

   
  });


  });