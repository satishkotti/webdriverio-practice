var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var splashpage = require('./../elements/webmdtvpage');
var functions = require('./../functions/functions');
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.splashpagevideourl;
var arturl = input.spagearticlenoreactionurl;
var videornurl = input.spagevideoreactionurl;
var articlernurl = input.spagearticlereactionurl;


var reactionvotecntexist = {};
var  ractionvotecntexist = {};
var reactionvotecntnotexist= {};
var  ractionvotecntnotexist = {};



module.exports = {  

reactionvotecntoptional: function () {

    browser.url(url);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var ugcreactioncnt = splashpage.ugcreactioncnt.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
     reactionvotecntnotexist.exist= functions.is_Existing(splashpage.ugcreactioncnt);
      return  reactionvotecntnotexist;
  },

  reactionarticlevotecntoptional: function () {

    browser.url(arturl);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var uugcreactioncnt = splashpage.ugcreactioncnt.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
    ractionvotecntnotexist.exist= functions.is_Existing(splashpage.ugcreactioncnt);
      return  ractionvotecntnotexist;
  },

  reactionvotecntexist: function () {

    browser.url(videornurl);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var ugcreactioncnt = splashpage.ugcreactioncnt.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
    reactionvotecntexist.exist= functions.is_Existing(splashpage.ugcreactioncnt);
      return  reactionvotecntexist;
  },

  reactionarticlevotecntexist: function () {

    browser.url(articlernurl);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var uugcreactioncnt = splashpage.ugcreactioncnt.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
     ractionvotecntnotexist.exist= functions.is_Existing(splashpage.ugcreactioncnt);
      return  ractionvotecntnotexist;
  },
  
   reactionvotecntclick: function () {

    browser.url(videornurl);    
      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var ugcreactioncnt = splashpage.ugcreactioncnt.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
    browser.click(ugcreactioncnt);
    browser.pause(500);
    browser.reload();
    browser.url(videornurl); 
     Elementscroll.scroll(300,300);
browser.waitForVisible(ugcmodule,4000)
   var ugcreactioncntclicable =  browser.isEnabled(ugcreactioncnt);
if(ugcreactioncntclicable==true) {
  flag=true
  flag.should.equal(true);  
}
else{
  flag=false;
  flag.should.equal(false); 
}
   
  },

  reactionarticlevotecntclick: function () {

    browser.url(articlernurl);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var uugcreactioncnt = splashpage.ugcreactioncnt.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
      browser.click(ugcreactioncnt);
    browser.pause(500);
    browser.reload();
     browser.url(articlernurl); 
     Elementscroll.scroll(300,300);
browser.waitForVisible(ugcmodule,4000)
   var ugcreactioncntclicable =  browser.isEnabled(ugcreactioncnt);
if(ugcreactioncntclicable==true) {
  flag=true
  flag.should.equal(true);  
}
else{
  flag=false;
  flag.should.equal(false); 
}
  },


}