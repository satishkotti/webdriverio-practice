var Helper = require('./../functions/functions');

var maxWaitTimeInMs = 30000;
var ImageUIObj = {

    SwitchToImageFrame: function () {
        browser.frameParent();
    },
    setSearchtype: function (ImageType) {
        Helper.verfiyElementExists("select[ng-model='viewType']", maxWaitTimeInMs);
        browser.click("select[ng-model='viewType']");
        browser.click("//option[contains(.,'" + ImageType + "')]");
        browser.pause(1000);

    },
    setSearchValue: function (text) {
        Helper.verfiyElementExists("input[placeholder='Search by keyword']", maxWaitTimeInMs);
        browser.setValue("input[placeholder='Search by keyword']", text);
        browser.click("span[class='input-group-addon']");
        browser.pause(10000);
    },
    clickImageSearchResult: function () {
         browser.pause(20000);
        Helper.verfiyElementExists("//div[@class='modal-body']//tr[2]//td[2]", maxWaitTimeInMs);
        
        browser.click("//div[@class='modal-body']//tr[1]//td[2]");
        browser.pause(5000);
    },
    selectImage: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Select')]");
        browser.pause(1000);
    },
    cancelImage: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Cancel')]");
        browser.pause(1000);
    },

    DoubleClickImage: function() 
    {
      
        browser.doubleClick("//h2[span[contains(.,'Section Text')]]//following-sibling::div//div//P//img[1]");
       
        browser.pause(5000);

    },

   setAlternativeText: function (Alttxt) {
       
        browser.setValue("//div//input[@ng-model='selectedObject.alt']", Alttxt);
        
   },

    setHeight: function (height) {
       
        browser.setValue("//div//input[@ng-model='selectedObject.height']", height);
        
   },

   setWidth: function (width) {
       
        browser.setValue("//div//input[@ng-model='selectedObject.width']", width);
        
   },

    setHSpace: function (hspace) {
       
        browser.setValue("//div//input[@ng-model='selectedObject.hspace']", hspace);
        
   },

   setVSpace: function (vspace) {
       
        browser.setValue("//div//input[@ng-model='selectedObject.vspace']", vspace);
        
   },

   getimagurl: function()
   {
       var Imageurl=browser.getAttribute("//h2[span[contains(.,'Section Text')]]//following-sibling::div//div//P//img[1]","src");
           Imageurl= Imageurl.split('D2_WP_WEBMD', 2);
        return Imageurl[1];
   }
}

module.exports = ImageUIObj;