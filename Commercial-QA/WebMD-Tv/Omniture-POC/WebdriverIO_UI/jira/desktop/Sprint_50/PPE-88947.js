var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;

var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-88947.testdata')[argv.env];
var url = input.environment;
describe('Brandcastpage', function ()
{
  this.timeout(60000);
  it(" Test case 1: Verify line of attribution", function ()
  {
    browser.url(url);
    browser.windowHandleMaximize();
    browser.click(Commonlocators.launchpoupclose.selector);
    var LOAtext = browser.getText(Commonlocators.Attributiontext.selector);
    if(LOAtext.should.equal("This content is from our sponsor. The sponsor has sole editorial control."))
    {
      console.log("Line of attribution text is matching with updated LOA: "+LOAtext);
    }
   });

  
  it(" Test case 2: Verify sponsor link", function ()
  {
    var Sponsorlinktext = browser.getText(Commonlocators.Sponsorlink.selector);
    browser.click(Commonlocators.Sponsorlink.selector);
    browser.pause(1000);
    browser.isVisible(Commonlocators.Sponsorlinkpopup.selector);
    if(browser.isVisible(Commonlocators.Sponsorlinkpopup.selector))
    {
      console.log(Sponsorlinktext+" link is clickable");
    }
   });

  it(" Test case 3: Verify sponsor popup close", function ()
  {
    browser.url(url);
    browser.windowHandleMaximize();
    var Sponsorlinktext = browser.getText(Commonlocators.Sponsorlink.selector);
    browser.click(Commonlocators.Sponsorlink.selector);
    browser.pause(10000);
    browser.isVisible(Commonlocators.Sponsorlinkpopupclose.selector);
    if(browser.click(Commonlocators.Sponsorlinkpopupclose.selector))
    {
      console.log(Sponsorlinktext+" link popup is closed");
    }
   });

  it(" Test case 4: Verify by link", function ()
  {
    var Bylinktext = browser.getText(Commonlocators.Bylink.selector);
    Bylinktext.should.equal("by");
   });
  
  it(" Test case 5: Verify by link popup", function ()
  {
    var Bylinktext = browser.getText(Commonlocators.Bylink.selector);
    browser.click(Commonlocators.Bylink.selector);
    browser.pause(10000);
    browser.isVisible(Commonlocators.Bylinkpopup.selector);
    if(browser.click(Commonlocators.Bylinkpopup.selector))
    {
      console.log(Bylinktext+" link is clickable");
    }
   });

  it(" Test case 6: Verify by popup close", function ()
  {
    var Bylinktext = browser.getText(Commonlocators.Bylink.selector);
    browser.pause(10000);
    browser.isVisible(Commonlocators.Bylinkpopupclose.selector);
    if(browser.click(Commonlocators.Bylinkpopupclose.selector))
    {
      console.log(Bylinktext+" link popup is closed");
    }
   });
});