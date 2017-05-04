var maxWaitTimeInMs = 20000;
var Helper = require('./../functions/functions');
var aboveTitleSelector = "//h2[span[contains(.,'Above Title')]]//following-sibling::div//div[@role='textbox']";
var abovetitle="//h2[span[contains(.,'Above Title')]]//following-sibling::div//div[text()='Enter text here']";
var sectionTextSelector= "//h2[span[contains(.,'Section Text')]]//following-sibling::div//div";
var highlightsSelector = "//h2[span[contains(.,'Highlights')]]//following-sibling::div//div";
var pullQuotesSelector= "//h2[span[contains(.,'Pull Quotes')]]//following-sibling::div//div";
var citationsSelector= "//h2[span[contains(.,'Citations')]]//following-sibling::div//div";
var relatedLinksTextSelector= "//h2[span[contains(.,'Related Links Text')]]//following-sibling::div//div";
var checkoutButtonSelector= "//button[contains(string(),'Check-out')]";
var checkInButonSelector= "//button[contains(string(),'Check-in')]";
var contentTabSelector= "//span[text()='Content']";
var contentPaneFrameSelector= "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";
var externalWidget3Selector= "iframe[id*='oam_id==ExternalWidget-3!!oam_target_type==ExternalWidget']";
var externalWidget4Selector= "iframe[id*='oam_id==ExternalWidget-4!!oam_target_type==ExternalWidget']";
var cancelButonSelector= "//button[contains(string(),'Cancel')]";
var titleSelector = "//h2[span[contains(.,'Title')]]//following-sibling::div//div[@role='textbox']";
var introductionTextSelector = "//h2[span[contains(.,'Introduction Text')]]//following-sibling::div//div[@role='textbox']";
var PubSectionTitleSelector = "//h2[span[contains(.,'Title')]]//following-sibling::div//div[@role='textbox']";
var PubSectionIntroductionTextSelector = "//h2[span[contains(.,'Introduction Text')]]//following-sibling::div//div[@role='textbox']";
var SetImageButtonSelector = "//button[contains(string(),'Set Image')]";
var contentHeader="//div[@class='container']//center[@class='ng-binding']";
var contentUpdate = require('./GenricEditcontentTab');


var contentTabUIObj = {
    
    switchToExternalWidgetFrame: function(){
       // browser.frame();
        var contentWidgetIFrameElement = browser.element(contentPaneFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    },    
    switchToExternalWidget3Frame: function(){
        var contentWidgetIFrameElement = browser.element(externalWidget3Selector);
        if(contentWidgetIFrameElement.value==null)
            contentWidgetIFrameElement = browser.element(externalWidget4Selector);
        browser.frame(contentWidgetIFrameElement.value);
    },
    switchToExternalWidget4Frame: function(){
        var contentWidgetIFrameElement = browser.element(externalWidget4Selector);
        if(contentWidgetIFrameElement.value==null)
            contentWidgetIFrameElement = browser.element(externalWidget3Selector);
        browser.frame(contentWidgetIFrameElement.value);
    },
    switchTomModuleMenuFrame: function(){
        //var contentWidgetIFrameElement = browser.element("iframe[id*='cke_279_frame']");
        //browser.frame(contentWidgetIFrameElement.value);
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
    selectContenTab: function(){
        browser.click(contentTabSelector);
        browser.pause(1000);
    },
    checkOut: function(){
        browser.waitForVisible(checkoutButtonSelector);
        browser.scroll(checkoutButtonSelector);
        browser.click(checkoutButtonSelector);
        browser.pause(5000);
        browser.frameParent();
        browser.pause(5000);
    },
    cancelCheckOut: function(){
        browser.waitForVisible(cancelButonSelector);

        //browser.scroll(cancelButonSelector);

        browser.click(cancelButonSelector);
        browser.pause(5000);
        browser.frameParent();
        browser.pause(5000);
    },
    checkIn: function(){
        browser.waitForVisible(checkInButonSelector);
        browser.scroll(0,0);
        browser.click(checkInButonSelector);
        browser.pause(5000);
        browser.frameParent();
        browser.pause(5000);
    },

    aboveTitleSetValue: function(aboveTitleVal){
        browser.scroll(aboveTitleSelector);
        browser.setValue(aboveTitleSelector, aboveTitleVal);
    },

    contentHeaderGet:function()
    {
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.waitForVisible(contentHeader,maxWaitTimeInMs);
        var result=browser.getText(contentHeader);
        browser.frameParent();
        return result;

    },

    cancelCheckOut: function(){
        browser.waitForVisible(cancelButonSelector);
        browser.moveToObject(cancelButonSelector);
        browser.click(cancelButonSelector);
        browser.pause(2000);
        browser.frameParent();
        browser.pause(2000);
    },
    sectionTextSetValue: function(sectionTextVal){
        //browser.scroll(sectionTextSelector);
        browser.setValue(sectionTextSelector, sectionTextVal);
    },
    highlightsSetValue: function(highlightsValue){
        browser.scroll(highlightsSelector);
        browser.setValue(highlightsSelector, highlightsValue);
    },
    pullQuotesSetValue: function(pullQuotesValue){
        browser.scroll(pullQuotesSelector);
        browser.setValue(pullQuotesSelector, pullQuotesValue);
    },
    citationsSetValue: function(citationValue){
        browser.scroll(citationsSelector);
        browser.setValue(citationsSelector, pullQuotesValue);
    },
    relatedLinksSetValue: function(relatedLinksValue){
        browser.scroll(relatedLinksTextSelector);
        browser.setValue(relatedLinksTextSelector, pullQuotesValue);
    },
    abovetitleSetValue:function(abovetitlevalue){
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.waitForVisible(aboveTitleSelector,maxWaitTimeInMs);
        browser.setValue(aboveTitleSelector,abovetitlevalue);
    },
    contentHeaderGet:function()
    {
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.waitForVisible(contentHeader,maxWaitTimeInMs);
        var result=browser.getText(contentHeader);
        browser.frameParent();
        return result;

    },
    mModuleckEditorMenuClick: function(sectionIndex){
        browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+sectionIndex+"]");
        browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+sectionIndex+"]");
        browser.pause(5000);
    },
    mModuleSubMenuOptionClick: function(optionToSelectName, sectionIndex){
        browser.waitForVisible("(//span[text()='"+optionToSelectName+"'])["+sectionIndex+"]", maxWaitTimeInMs);
        browser.moveToObject("(//span[text()='"+optionToSelectName+"'])["+sectionIndex+"]");
        browser.leftClick("(//span[text()='"+optionToSelectName+"'])["+sectionIndex+"]");
        browser.pause(5000);
        return browser.getText("(//span[text()='"+optionToSelectName+"'])["+sectionIndex+"]")
    },
    mModuleCodeMenuClick: function(sectionIndex){
        browser.waitForVisible("(//span[text()='Code'])["+sectionIndex+"]", maxWaitTimeInMs);
        browser.moveToObject("(//span[text()='Code'])["+sectionIndex+"]");
        browser.leftClick("(//span[text()='Code'])["+sectionIndex+"]");
        browser.pause(5000);
        return browser.getText("(//span[text()='Code'])["+sectionIndex+"]")
    },
     ModuleckEditorMenuClick: function(sectionIndex){
        browser.moveToObject("(//a[@title='Insert Module'])["+sectionIndex+"]");
        browser.click("(//a[@title='Insert Module'])["+sectionIndex+"]");
        browser.pause(5000);
    },
    titleSetValue:function(titlevalue){
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.waitForVisible(titleSelector,maxWaitTimeInMs);
        browser.setValue(titleSelector,titlevalue);
    },
        pubSectionImageSetValue:function(titlevalue){
       browser.leftClick("//button[contains(.,'Set Image')]");
       browser.frameParent();
       browser.waitForVisible("//input[@placeholder='Search by keyword']",maxWaitTimeInMs);
       browser.setValue("//input[@placeholder='Search by keyword']",titlevalue);
       browser.click("//span[@class='glyphicon glyphicon-search']");
       browser.waitForVisible("//table[@class='repo-table table-hover-dialog']/tbody/tr[1]/td[2]/a");
       browser.click("//table[@class='repo-table table-hover-dialog']/tbody/tr[1]/td[2]/a");
       browser.click("//button[contains(.,'Select')]");
       browser.pause(2000);
    },
     introductionText:function(introductionText){
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.scroll(introductionTextSelector);
        browser.waitForVisible(introductionTextSelector,maxWaitTimeInMs);
        browser.setValue(introductionTextSelector,introductionText);
    },

    AllFieldsSetValueForPubSection: function(data){
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.waitForVisible(PubSectionTitleSelector, maxWaitTimeInMs);
        browser.setValue(PubSectionTitleSelector,'Sample Text');
        contentTabUIObj.SetImageButtonClick("Pub Section Image");
        contentTabUIObj.selectImageSearchForPubSection(data);
        browser.setValue(PubSectionIntroductionTextSelector,'Sample Text');
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
        Helper.verfiyElementExists("div.ng-scope > table >tbody > tr:nth-child(1) >td:nth-child(1) >img", 90000);
        browser.click("div.ng-scope > table >tbody > tr:nth-child(1) >td:nth-child(1) >img");
        browser.pause(5000);
    },
    selectImage: function () {
        browser.click("//div[@class='modal-footer']//button[contains(string(),'Select')]");
        browser.pause(1000);
        contentTabUIObj.switchToExternalWidget4Frame();
    },
    SetImageButtonClick:function(Imagemodule){
        var ImageSelector= "//h2[span[contains(.,'"+Imagemodule+"')]]//following-sibling::div//div//div//div[@class='column']//button[@ng-click='repoImageSelector()']";
        browser.waitForVisible(ImageSelector,maxWaitTimeInMs);
        browser.moveToObject(ImageSelector);
        browser.leftClick(ImageSelector);
        browser.pause(10000);
    },
    selectImageSearchForPubSection: function (searchimagetype) {
        contentTabUIObj.setImageType("Image");
        contentTabUIObj.setImageSearchValue(searchimagetype);
        contentTabUIObj.clickImageSearchResult();
        contentTabUIObj.selectImage();
    },

    abovetitleSetValue:function(abovetitlevalue){
        contentTabUIObj.switchToExternalWidget4Frame();
        browser.waitForVisible(aboveTitleSelector,maxWaitTimeInMs);
        browser.scroll(aboveTitleSelector);
        browser.setValue(aboveTitleSelector,abovetitlevalue);
    },
    updateProfpublicationContent:function(data)    {
       contentTabUIObj.switchToExternalWidget4Frame();
       browser.waitForVisible("//h2[span[contains(.,'Publication Name')]]//following-sibling::div//div[@role='textbox']",maxWaitTimeInMs);
       browser.setValue("//h2[span[contains(.,'Publication Name')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       contentUpdate.ImageClick("Primary Publ Image");
       contentTabUIObj.selectProfPublicationImageSearch(data);
    //    contentUpdate.ImageClick("Secondary Publ Image");
    //    contentTabUIObj.selectProfPublicationImageSearch("heart");
    //    contentUpdate.ImageClick("Article Level Publ Image");
    //    contentTabUIObj.selectProfPublicationImageSearch("heart");
    browser.moveToObject("//h2[span[contains(.,'Introduction Text')]]//following-sibling::div//div[@role='textbox']");
       browser.setValue("//h2[span[contains(.,'Introduction Text')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       browser.setValue("//h2[span[contains(.,'TOC Element Label')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       browser.setValue("//h2[span[contains(.,'TOC Element Footnotes')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       browser.setValue("//h2[span[contains(.,'Section Header')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       browser.setValue("//h2[span[contains(.,'SubSection Header')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       browser.setValue("//h2[span[contains(.,'SubSection Content')]]//following-sibling::div//div[@role='textbox']","Sample Text");
       browser.pause(2000);
},
 selectProfPublicationImageSearch: function (searchimagetype) {
        contentUpdate.setImageType("Image");
        contentUpdate.setImageSearchValue(searchimagetype);
        contentUpdate.clickImageSearchResult();
        contentUpdate.profPublicationSelectImage();
    }
}

module.exports = contentTabUIObj;