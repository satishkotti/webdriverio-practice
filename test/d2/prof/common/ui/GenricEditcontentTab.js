
var maxWaitTimeInMs = 20000;
var Helper = require('./../functions/functions');
var checkoutButtonSelector= "//button[contains(string(),'Check-out')]";
var checkInButonSelector= "//button[contains(string(),'Check-in')]";
var contentTabSelector= "//span[text()='Content']";
var contentPaneFrameSelector= "iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']";
var externalWidget3Selector= "iframe[id*='oam_id==ExternalWidget-3!!oam_target_type==ExternalWidget']";
var externalWidget4Selector= "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";
var contentHeader="//div[@class='container']//center[@class='ng-binding']";
var cancelButonSelector= "//button[contains(string(),'Cancel')]";

var contentTabUIObj = {
    
    switchToExternalWidgetFrame: function(){
       // browser.frame();
        var contentWidgetIFrameElement = browser.element(contentPaneFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    },    
    switchToExternalWidget3Frame: function(){
        var contentWidgetIFrameElement = browser.element(externalWidget3Selector);
        browser.frame(contentWidgetIFrameElement.value);
    },
    switchToExternalWidget4Frame: function(){
        //browser.frame();
        var contentWidgetIFrameElement;
        if(global.envSettings.d2prof.environment=="dev04")
            contentWidgetIFrameElement = browser.element(externalWidget4Selector);
        else if(global.envSettings.d2prof.environment=="qa01")
            contentWidgetIFrameElement = browser.element(externalWidget4Selector);
        else
            contentWidgetIFrameElement = browser.element(externalWidget4Selector);

        browser.frame(contentWidgetIFrameElement.value);
    },
    switchTomModuleMenuFrame: function(){
       var mModuleIF = browser.execute(function () {
            return document.getElementsByTagName('iframe').item(0).id;
        });
        browser.frame(mModuleIF.value);
        browser.pause(5000);
    },
    switchToX3PortalFrame: function(){
        var frameval = browser.execute(function () {
            return document.getElementById('x3_portal');
        });
        browser.frame(frameval.value);
    },
    
    TitleandTextSetValue:function(Inputmodule,textvalue){
        
        
        var TextSelector="//h2[span[contains(.,'"+Inputmodule+"')]]//following-sibling::div//div[text()='Enter text here']";
        browser.waitForVisible(TextSelector,maxWaitTimeInMs);
        browser.scroll(TextSelector);
        browser.setValue(TextSelector,textvalue);
    },

    
    InputTextSetValue:function(Inputmodule,textvalue){
        
       
        var InputTextSelector="//h2[span[contains(.,'"+Inputmodule+"')]]//following-sibling::div//input";
        browser.waitForVisible(InputTextSelector,maxWaitTimeInMs);
        browser.scroll(InputTextSelector);
        browser.setValue(InputTextSelector,textvalue);
    },

    ImageClick:function(Imagemodule){
        
         
        
        var ImageSelector= "//h2[span[contains(.,'"+Imagemodule+"')]]//following-sibling::div//div//div//div[@class='column']//button[@ng-click='repoImageSelector()']";
        browser.waitForVisible(ImageSelector,maxWaitTimeInMs);
        browser.moveToObject(ImageSelector);
        browser.leftClick(ImageSelector);
        browser.pause(10000);
    },

    setImageType: function (moduleType) {
        Helper.verfiyElementExists("select[ng-model='viewType']", maxWaitTimeInMs);
        browser.click("select[ng-model='viewType']");
        browser.click("//option[contains(.,'" + moduleType + "')]");
        browser.pause(1000);

    },
    setImageSearchValue: function (text) {
        Helper.verfiyElementExists("input[placeholder='Search by keyword']", maxWaitTimeInMs);

        browser.setValue("input[placeholder='Search by keyword']", text);
        browser.click("span[class='input-group-addon']");
        browser.pause(5000);
    },
    clickImageSearchResult: function () {
        Helper.verfiyElementExists("div.ng-scope > table >tbody > tr:nth-child(1) >td:nth-child(2) >img ", 90000);
        browser.click("div.ng-scope > table >tbody > tr:nth-child(1) >td:nth-child(2) >img ");
        browser.pause(5000);
    },
    selectImage: function () {
        browser.click("//div[@class='modal-footer']//button[contains(string(),'Select')]");
        browser.pause(1000);
        contentTabUIObj.switchToExternalWidget3Frame();
    }
}

module.exports = contentTabUIObj;