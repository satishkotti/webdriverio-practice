
//var argv = require("yargs").argv;
var webdriverio = require('webdriverio');
//var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var commonlocators = require('./../elements/Commonelements');
//var input = require('./../../config/ShareThrough.testdata');
var ca= require('./../functions/Commonactions'); 
var pgnumber,currentpage;
var url1;
var webdriverio = require("webdriverio");
// var url = input.environment;
var options = {
    desiredCapabilities: {
        browserName: "chrome" // declare browser name here
    }
};
var browser = webdriverio.remote(options);

module.exports = {

/*
This method is to verify ST Ad slots in Share Through 3 Stack Unit on all the pages of article.
Arguments: Need Total number of pages to be verified which is pages available in article
Return Type: NA
*/
verifySTUnitsOnAllPages: function (pgnumber,url1) {
 
  for (var i = 1; i <= pgnumber; i++) {
  currentpage = browser.getText(commonlocators.activepage.selector);
    console.log(currentpage);
   // var pos923visibilyty = commomact.verifyElementExist(commonlocators.ststackunitad1.selector);
  // this.verifyURL(currentpage,url1);
    //console.log(b);
    // var pos923visibilyty = browser.isVisible(commonlocators.ststackunitad1.selector);
    // pos923visibilyty.should.equal(true);  
    // // Verifying POS 924 Nativo Ad is visibile on the page or not
    // var pos924visibilyty = browser.isVisible(commonlocators.ststackunitad2.selector);
    // pos924visibilyty.should.equal(true);
    // // Verifying POS 925 Nativo Ad is visibile on the page or not
    // var pos925visibility = browser.isVisible(commonlocators.ststackunitad3.selector);
    // pos925visibility.should.equal(true);
    var pos925visibility = ca.verifyElementExist(commonlocators.ststackunitad3.selector);
    //Clicking on next page link
    browser.click(commonlocators.nextpage.selector);
    // Waiting for 15 sec
    browser.pause(15000);
    }
  },

   /* This Method is to verify URL of the current URL
  Arguments: Current Active page 
  Return Type:
  */
 verifyURL: function (currentpage,url1) {
  var currenturl=browser.getUrl();
  var currentpage = parseInt(currentpage);
  console.log(currentpage);
  currenturl.should.equal("http://www.webmd.com/lupus/guide/arthritis-lupus#1");
 // expect(currenturl).to.equal("http://www.webmd.com/lupus/arthritis-lupus#1");
  var url2 = url1+"#"+currentpage;
  //console.log(url2);
  url2.should.have.property(currenturl);
  url2.should.equal(currenturl);
  expect(currenturl).to.equal(url2);
 },

}


