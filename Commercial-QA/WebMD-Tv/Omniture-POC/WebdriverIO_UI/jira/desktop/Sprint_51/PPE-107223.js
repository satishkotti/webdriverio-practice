var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;

var actn = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-107223.testdata')[argv.env];
var url = input.environment;
describe('Mediakit page', function ()
{
  this.timeout(60000);
  it(" Test case 1: Verify medscape link", function ()
  {
    //Commonlocators.open();
    browser.url(url);
    browser.windowHandleMaximize();
    //browser.click(Commonlocators.launchpoupclose.selector);
    browser.pause(5000);

    var linktext = browser.getText(Commonlocators.DownloadtheMediaKitLink.selector);
    console.log(linktext);
    var downloadlinkvisisble = browser.isVisible(Commonlocators.DownloadtheMediaKitLink.selector);
    console.log(downloadlinkvisisble);
    browser.click(Commonlocators.DownloadtheMediaKitLink.selector);

    var medscapetext = browser.getText(Commonlocators.MedscapeMediaKitLink.selector);
    console.log(medscapetext);
    browser.click(Commonlocators.MedscapeMediaKitLink.selector);
    browser.pause(10000);
    var handle = browser.newWindow('http://mediakit.staging.sea1.webmd.com/files/Medscape_Media_Kit.pdf')
    //console.log(handle);

    var windowurl = browser.getUrl();
    console.log(windowurl);
    browser.pause(10000);
    if(windowurl.should.equal("http://mediakit.staging.sea1.webmd.com/files/Medscape_Media_Kit.pdf"))
    {
      console.log("Medscape media kit link is working");
    }
   });
});