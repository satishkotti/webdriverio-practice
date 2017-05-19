var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var input = require('./../../../config/PPE-109347.testdata')[argv.env];
//var input = require('./../../config/PPE-101748.testdata')[argv.env];

var url = input.environment;
//var functions = require(rootPath + '\\Helper\\PPE-104331-functions.js');
//var search.actions = require(rootPath + '\\Objectrepository\\objectrepository.js');
var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
describe('Verify that supported by Text launches tooltip when clicked', function () {
  this.timeout(60000);
  it("Verify that supported by Text launches tooltip when clicked", function () {
    // console.log(search.twitter);
   // actn.open();
//Commonlocators.open();
browser.url(url);
       var LOEtext= browser.getText(Commonlocators.LOE_link.selector);
 LOEtext.should.equal("From Our Sponsor");
 browser.leftClick(Commonlocators.LOE_link.selector);
 browser.pause(5000);
 browser.isExisting(Commonlocators.tooltip_imag.selector);
 var tooltip_disclaimer =browser.getText(Commonlocators.tooltip_disclaimer.selector);
 tooltip_disclaimer.should.equal("From Our Sponsor, Sponsored by, Promoted by, or By (Sponsor's Name)");
 var tooltip_text = browser.getText(Commonlocators.tooltip_text.selector);
 tooltip_text.should.equal("Content under this heading is from or created on behalf of the named sponsor. This content is not subject to the WebMD Editorial Policy and is not reviewed by the WebMD Editorial department for accuracy, objectivity or balance.");
if( browser.isExisting(Commonlocators.tooltip_close.selector))
{
    browser.click(Commonlocators.tooltip_close.selector);
    console.log("tool tip is closed");

}
   
  });
  });