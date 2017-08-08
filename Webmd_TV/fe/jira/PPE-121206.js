var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../common/functions/functions');
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
var Input = require('./../../config/Webmd-tv')[argv.env];
//var homepage = Input.splashpageheader;
var articleurl = Input.splashpageheaderarticle;
var slideurl = Input.splashpageheaderslide;

 var Surveyclose=  splashelement.Surveyclose.selector;
 


describe('PPE-121206 Make Article Page Asset Grid Call out "Videos"', function () {
  
  it(' PPE-121644 Verify label of Asset grid with Video is labelled Video ', function () {
    

   browser.url(articleurl)
   browser.scroll(500,500);
   assetpage.close_Overlay();
   
   browser.pause(700);
 
   var Assetgridheader  = splashelement.Assetgridheader.selector;
   var Assetgridvideolabel = splashelement.Assetgridvideolabel.selector;
   var Assetgridsponsorlabel = splashelement.Assetgridsponsorlabel.selector;
   var Assetgridlabel = splashelement.Assetgridlabel.selector;
    
   browser.waitForVisible(Assetgridheader,4000);   
   
   browser.scroll(Assetgridheader,600,600);    
   
        browser.pause(1200); 

        var Assetgridelemelength = browser.elements(Assetgridvideolabel).value.length;  
        var Assetgridelemelength2 = browser.elements(Assetgridsponsorlabel).value.length;
        var Assetgridelemelength3 = browser.elements(Assetgridlabel).value.length;

         var Assetlength = Assetgridelemelength+Assetgridelemelength2;
         var Assetgridvideolabel = JSON.stringify(browser.elements(Assetgridvideolabel).value);  

       
        if(Assetgridelemelength3==Assetlength){console.log("Verifying label of Article in Asset grid with Video is labelled Video")}
        else{

          console.log("PPE-121645 Verifying label of Article in Asset grid with Video not labelled Video");
       
        }

  });

  it(' PPE-121644 Verify label of Slide show in Asset grid with Video is labelled Video', function () {              

 browser.url( slideurl);  
    browser.pause(700); 
 browser.scroll(100,100);
  var Assetgridheader  = splashelement. Assetgridslideshowlabel.selector;
   var Assetgridvideolabel = splashelement.Assetgridvideolabel.selector;
   var Assetgridsponsorlabel = splashelement.Assetgridsponsorlabel.selector;
   var Assetgridlabel = splashelement.Assetgridlabel.selector;
   browser.waitForVisible(Assetgridheader,4000);
   
  
     browser.scroll(Assetgridheader,100,100);
        browser.pause(1200); 

        var Assetgridelemelength = browser.elements(Assetgridvideolabel).value.length;  
        var Assetgridelemelength2 = browser.elements(Assetgridsponsorlabel).value.length;
        var Assetgridelemelength3 = browser.elements(Assetgridlabel).value.length;

         var Assetlength = Assetgridelemelength+Assetgridelemelength2;
       
        if(Assetgridelemelength3==Assetlength){console.log("Verifying label of Slide show in Asset grid with Video is labelled Video")}
        else{console.log("PPE-121645 Verifying label of  Slide show  in Asset grid with Video is  not labelled Video");
     
    }

 
 
   
 
  }); 
});