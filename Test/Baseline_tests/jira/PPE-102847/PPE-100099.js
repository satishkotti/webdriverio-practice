var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
describe(' Verify the Attribution is not a link by itself', function () {
  this.timeout(60000);
  it(" Verify the Attribution is not a link by itself", function () {
    // console.log(search.twitter);
   // actn.open();
Commonlocators.open();

var tagtext = browser.getTagName(Commonlocators.Right_attribution_imag.selector);
   
console.log(tagtext);

if(tagtext === 'a')
{
    console.log("element is clickable");
}
else{
console.log("element is not clickable");

}



  });
  });