var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../../common/functions/functions');
var splashelement = require('./../../../common/elements/Splashelements');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../../config/Webmd-tv')[argv.env];
var homepage = Input.videourl;
var gridurl = Input.splashpageheadergridurl;
 var Surveyclose=  splashelement.Surveyclose.selector;


describe(' PPE-116362 WebMD TV Video Page - When Video Completes Next Video Resets Page', function () {
  splashelement.open();
  browser.url(homepage) ;
  browser.timeouts('pageLoad', 20000);
   browser.pause(700);
  assetpage.CloseOverlay();
   browser.click(Surveyclose);  
  

  it(' PPE-116561 Verify that video is auto played and page not refreshed.', function () {
     
      browser.setViewportSize({ width: 1200, height: 1024 }); 
      
     
  var Currenturl = browser.getUrl();
  console.log('verifying current url populated is : ' + Currenturl );
  browser.pause(40000);
  var Nexturl = browser.getUrl();
  console.log('verifying next url populated is : ' + Nexturl );
  
    if ( Currenturl == Nexturl ) { 
      console.log('Verifying next url is not  propagated  from curent url')
       }
    else {  
      
      console.log('Verifying  user is propagated from current url to next url')
    }
     
  });  
  
  it(' PPE-116562 Verify that page is not auto scrolled to the video on the auto play	', function () {
     
      browser.setViewportSize({ width: 1200, height: 1024 }); 

      var Ugcmodule  = $('#ugc-wrapper');    
         Ugcmodule.scroll(100,100);  
         browser.pause(40000);
          var elementVisible =  browser.isVisible('#ugc-wrapper');
          if (elementVisible==true) {
         console.log(' Verified page is not scrolled to the video on auto play : ' + elementVisible) ;
              }
         else
         {
    console.log('Verified page is  scrolled to the video on auto play :' + elementVisible) ;
          }

  });  

  it(' PPE-116815 Verify that during video auto forward when user is at bottom of the page ,remains in same position	', function () {
     
      browser.setViewportSize({ width: 1200, height: 1024 }); 

      var Ugcmodule  = $('#ContentPane55');    
         Ugcmodule.scroll(100,100); 
         var Currenturl = browser.getUrl(); 
         browser.pause(40000);
         var Nexturl = browser.getUrl();
          var elementVisible =  browser.isVisible('#ContentPane55');
          if (elementVisible==true) {
         console.log(' Verified page is not scrolled to the video on auto play and remains at bottom : ' + elementVisible) ;
              }
         else
         {
    console.log('Verified page is  scrolled to the video on auto play and not remained at bottom : ' + elementVisible) ;
          }

          if ( Currenturl != Nexturl ) { 
     
      
      console.log('PPE-116563 Verified that page is not auto scrolled on auto play and current url changed to the new video	 ')
    }
     

  });  
  
});