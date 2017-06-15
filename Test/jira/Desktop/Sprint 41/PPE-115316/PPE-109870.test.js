var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var input = require('./../../../config/Jira.testdata')[argv.env];
var Elements = require('./../../../common/elements/Cold_Flu_Elements');
var image="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cold_and_flu_map_tool_other/650x350_cold_and_flu_map_tool_other.jpg";
var URL = input.cold_and_flu_URL;
describe('PPE-109870:Update image referenced in pages OG tag for social sharing', function () {
 
  it.only("PPE-114273:Verify image referenced in page's OG tag for social sharing is validated using WebDriver IO", function () {
     browser.url(URL);
     browser.pause(1000);
    var contents=browser.getAttribute(Elements.og_image.selector,"content");
    contents.should.value.equal(image);
     });
  
  });