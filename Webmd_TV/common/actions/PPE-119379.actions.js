var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../elements/webmdtvpage');
var functions = require('./../functions/functions');
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.splashpage;

var readmore = {};



module.exports = {  

 readmoretext: function () {
  var readmore = {};

    browser.url(url);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(500);
 var readmeugcshare = splashpage.readmeugcshare.selector;
browser.scroll(readmeugcshare,100,100);  

    browser.pause(1500);
   
   var   readmesel  = splashpage.readmore.selector;
     browser.waitForVisible(readmesel,4000); 
      browser.pause(500);
     readmore.exist= functions.is_Existing(splashpage.readmore);
     browser.click(readmesel);
     readmore.discclaimerexist= functions.is_Existing(splashpage.readmoretext);
      return  readmore;
  },

 readmoreexist: function () {

    browser.url(url);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(500);
 var readmeugcshare = splashpage.readmeugcshare.selector;
browser.scroll(readmeugcshare,100,100);  
  
       browser.pause(700);   
 
   var   readmesel  = splashpage.readmore.selector;
     browser.waitForVisible(readmesel,4000); 
         browser.pause(700);  
     readmore.exist= functions.is_Existing(splashpage.readmore);
      return  readmore;
  },

  

}