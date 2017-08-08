var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assetpage = require('./../../common/functions/functions');
var splashelement = require('./../../common/elements/webmdtvpage');
var rootPath = path.normalize(__dirname)
console.log(__dirname);
//var Input = require('./../../config/Webmd-tv')[argv.env];
//var homepage = Input.splashpageheader;
var env = require('./../../gulpfile.js').TestEnv;
var Input = require('./../../config/Webmd-tv')[env];
var articleurl = Input.article;
var slideurl = Input.splashpageheaderslide;
var Surveyclose=  splashelement.Surveyclose.selector;
 


describe('PPE-121206 Make Article Page Asset Grid Call out "Videos"', function () {
  
  it(' PPE-121644 Verify label of Asset grid with Video is labelled Video ', function () {
    

   browser.url(articleurl)
   browser.scroll("//div[@class='pane art-list-grid']/div[@class='list-container']/div[@class='list-header']",100,100);
   
   //browser.scroll("//div[@class='pane art-list-grid']/div[@class='list-container']/div[@class='list-header']",100,100);
   //assetpage.close_Overlay();
   if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');

    }
    browser.pause(2000);
 
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
		 console.log("grid length"+Assetgridelemelength3);
		 console.log("video and sponsor"+Assetlength);
         var Assetgridvideolabel = JSON.stringify(browser.elements(Assetgridvideolabel).value);  

       
        if(Assetgridelemelength3==Assetlength){
		result=true;
		result.should.equal(true);
		console.log("Verifying label of Article in Asset grid with Video is labelled Video")}
        else{
result=true;
          console.log("PPE-121645 Verifying label of Article in Asset grid with Video not labelled Video");
		  result.should.equal(false);
       
        }

  });

  it(' PPE-121644 Verify label of Slide show in Asset grid with Video is labelled Video', function () {              

 browser.url(slideurl);  
    browser.pause(700); 
	var Assetgridsponsorlabel = splashelement.Assetgridsponsorlabel.selector;
 browser.scroll(100,100);
  var Assetgridheader  = splashelement. Assetgridslideshowlabel.selector;
   var Assetgridvideolabel = splashelement.Assetgridvideolabel.selector;
//   var Assetgridsponsorlabel = splashelement.Assetgridsponsorlabel.selector;
   var Assetgridlabel = splashelement.Assetgridlabel.selector;
   browser.waitForVisible(Assetgridheader,4000);
   
  
     browser.scroll(Assetgridheader,100,100);
        browser.pause(1200); 

        var Assetgridelemelength = browser.elements(Assetgridvideolabel).value.length;  
        var Assetgridelemelength2 = browser.elements(Assetgridsponsorlabel).value.length;
        var Assetgridelemelength3 = browser.elements(Assetgridlabel).value.length;

         var Assetlength = Assetgridelemelength+Assetgridelemelength2;
       
        if(Assetgridelemelength3==Assetlength){
		result=true;
		result.should.equal(true);
		console.log("Verifying label of Slide show in Asset grid with Video is labelled Video")}
        else{
		result=true;
		
		console.log("PPE-121645 Verifying label of  Slide show  in Asset grid with Video is  not labelled Video");
		result.should.equal(false);
     
    }

 
 
   
 
  }); 
});