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
var articleurl = input.splashpageheaderarticle;
var splashgridpoll = {};



module.exports = {  

splashpollsubmit: function () {

    browser.url(articleurl);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 var Elementscroll = $('.form-wrap');
   Elementscroll.scroll(300,300);   
   var     Splashpolltotpoll = splashpage.Splashpolltotpoll.selector;    
   browser.waitForVisible(Splashpolltotpoll,4000);          
    var Splashpoll =  splashpage.Splashpollallelm.selector;
     var  Splashpollallelm =  browser.elements(Splashpoll);       
     var len = Splashpollallelm.value.length;
     var Polltext,polltextsplit, pollindtext,indtot=0, indele,value,intitialvalues ,flag;
    
  
for(var i = 1;i <= len; i++ ){
 //  browser.refresh();
 
 browser.url(url);
var Splashpollvotebef =   splashpage.Splashpollvotebef(i).selector; 
 browser.waitForVisible(Splashpollvotebef,10000);

  browser.pause(1000);
   functions.close_Overlay();   
   functions.close_Overlay();   
      
    browser.scroll(Splashpollvotebef,100,100);    
// getting the option text
  var intval = browser.getText(Splashpollvotebef);
var  Splashpollprovvote=  splashpage.Splashpollprovvote(i).selector; 
 // getting the already voted count for the option going to select
  var beforeincrementedvote  = browser.getAttribute(Splashpollprovvote,'data-votecount');
   console.log("before incrment  val :" + beforeincrementedvote);
   browser.click(Splashpollvotebef);
   browser.pause(3000);
 browser.waitForVisible(Splashpolltotpoll,4000);
var incrementedvote  = browser.getAttribute(Splashpollprovvote,'data-votecount');



console.log("Verifying vote1 : " + incrementedvote );
indtot = parseInt(indtot) + parseInt(incrementedvote) + 1 ;
console.log("Verifying sum total : " + indtot  );
  var     Splashpolltotvote = splashpage.Splashpolltotvote.selector; 
   var Splashpolltotvotecnt = browser.getText(Splashpolltotvote);    
   console.log("Verfying total vote count:" +  Splashpolltotvotecnt  );
if (i==len){
  
   if(parseInt(Splashpolltotvotecnt)==parseInt(indtot)){
     flag = true;
     flag.should.equal(true);
     console.log("Verifying after autosubmit User is only able to reselect the answers for the question , when browser is refreshed for Article: ");
   }
   else{
     flag = false;
     flag.should.equal(false);
     console.log("Verify after autosubmit User is not only able to reselect the answers for the question , when browser is refreshed for Article: ");
   }
}


}    
  },

  //
  splashpoll: function () {

    browser.url(url);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 var Elementscroll = $('.form-wrap');
   Elementscroll.scroll(300,300);   
   var     Splashpolltotpoll = splashpage.Splashpolltotpoll.selector;    
   browser.waitForVisible(Splashpolltotpoll,4000);          
    var Splashpoll =  splashpage.Splashpollallelm.selector;
     var  Splashpollallelm =  browser.elements(Splashpoll);       
     var len = Splashpollallelm.value.length;
     var Polltext,polltextsplit, pollindtext,indtot=0, indele,value,intitialvalues ,flag;
    
  
for(var i = 1;i <= len; i++ ){
 //  browser.refresh();
 
 browser.url(url);
var Splashpollvotebef =   splashpage.Splashpollvotebef(i).selector; 
 browser.waitForVisible(Splashpollvotebef,10000);

  browser.pause(1000);
   functions.close_Overlay();   
   functions.close_Overlay();   
      
    browser.scroll(Splashpollvotebef,100,100);    
// getting the option text
  var intval = browser.getText(Splashpollvotebef);
var  Splashpollprovvote=  splashpage.Splashpollprovvote(i).selector; 
 // getting the already voted count for the option going to select
  var beforeincrementedvote  = browser.getAttribute(Splashpollprovvote,'data-votecount');
   console.log("before incrment  val :" + beforeincrementedvote);
   browser.click(Splashpollvotebef);
   browser.pause(3000);
 browser.waitForVisible(Splashpolltotpoll,4000);
var incrementedvote  = browser.getAttribute(Splashpollprovvote,'data-votecount');



console.log("Verifying vote1 : " + incrementedvote );
indtot = parseInt(indtot) + parseInt(incrementedvote) + 1 ;
console.log("Verifying sum total : " + indtot  );
  var     Splashpolltotvote = splashpage.Splashpolltotvote.selector; 
   var Splashpolltotvotecnt = browser.getText(Splashpolltotvote);    
   console.log("Verfying total vote count:" +  Splashpolltotvotecnt  );
if (i==len){
  
   if(parseInt(Splashpolltotvotecnt)==parseInt(indtot)){
     flag = true;
     flag.should.equal(true);
     console.log("Verifying total count is matching after auto submit for Splash page: ");
   }
   else{
     flag = false;
     flag.should.equal(false);
     console.log("Verifying total count is not matching after auto submit for Splash page: ");
   }
}


}    
  },
    
     splashpollexist: function () {
       browser.url(url);      
    browser.pause(700);       
       
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    
 var Elementscroll = $('.form-wrap');
   Elementscroll.scroll(300,300);
      splashgridpoll.exist= functions.is_Existing(splashpage.Splashpollpresence);
      return  splashgridpoll;
    },

}