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


var reactionnotexist = {};
var ractionnotexist = {};



module.exports = {  

reactionoptional: function () {

    browser.url(url);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var ugcreaction = splashpage.ugcreactionbtn.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
     reactionnotexist.exist= functions.is_Existing(splashpage.ugcreactionbtn);
      return  reactionnotexist;
  },

  reactionarticleoptional: function () {

    browser.url(arturl);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 
 browser.scroll(100,100);
 browser.pause(1500);
 var ugcmodule  = splashpage.ugcmodule.selector;
 var ugcreaction = splashpage.ugcreactionbtn.selector;
var Elementscroll = $('#ugc-widget');
   Elementscroll.scroll(300,300);   

    browser.waitForVisible(ugcmodule,4000); 
     ractionnotexist.exist= functions.is_Existing(splashpage.ugcreactionbtn);
      return  ractionnotexist;
  },

}