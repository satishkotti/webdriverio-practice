var maxWaitTimeInMs = 50000;
var sectionTextSelector = "//h2[span[contains(.,'Section Text')]]//following-sibling::div//div[text()='Enter text here']";
var highlightsSelector = "//h2[span[contains(.,'Highlights')]]//following-sibling::div//div[text()='Enter text here']";
var pullQuotesSelector = "//h2[span[contains(.,'Pull Quotes')]]//following-sibling::div//div[text()='Enter text here']";
var citationsSelector = "//h2[span[contains(.,'Citations')]]//following-sibling::div//div[text()='Enter text here']";
var relatedLinksTextSelector = "//h2[span[contains(.,'Related Links Text')]]//following-sibling::div//div[text()='Enter text here']";
var QuestionTextSelector = "//h2[span[contains(.,'Question Text')]]//following-sibling::div//div[text()='Enter text here']";
var ResultsSelector = "//h2[span[contains(.,'Results Text')]]//following-sibling::div//div[text()='Enter text here']";
var checkoutButtonSelector = "//button[contains(string(),'Check-out')]";
var checkInButonSelector = "//button[contains(string(),'Check-in')]";
var contentTabSelector = "//span[text()='Content']";
var contentPaneFrameSelector = "//div[@tag_id='Content-widget']//iframe[contains(@id,'ExternalWidget')]";
var Helper = require('./../functions/functions');
var contentHeader="//div[@class='container']//center[@class='ng-binding']";
var SectionHeader="//h2[span[contains(.,'Section Header')]]//following-sibling::div//input";
var RelatedLinksHeader="//h2[span[contains(.,'Related Links Header')]]//following-sibling::div//input";
var Titleinput="//h2[span[contains(.,'Title')]]//following-sibling::div//input";
var selectBox = "//h2[span[contains(.,'Question Type')]]//following-sibling::div//div[@ng-if='configitem.selectOptions']//select[@ng-model='itemnode[configitem.nodeName]']";

var contentTabUIObj = {
    switchToMainFrame: function(){
        browser.frame();
    },
    switchToExternalWidgetFrame: function () {
        browser.frame();
        var contentWidgetIFrameElement = browser.element(contentPaneFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    },
    switchTomModuleMenuFrame: function () {
        //var contentWidgetIFrameElement = browser.element("iframe[id*='cke_279_frame']");
        //browser.frame(contentWidgetIFrameElement.value);
        var mModuleIF = browser.execute(function () {
            return document.getElementsByTagName('iframe').item(0).id;
        });
        browser.frame(mModuleIF.value);
        browser.pause(5000);
    },
    switchToX3PortalFrame: function () {
        var frameval = browser.execute(function () {
            return document.getElementById('x3_portal');
        });
        browser.frame(frameval.value);
    },
    selectContenTab: function () {
        browser.click(contentTabSelector);
        browser.pause(1000);
    },
    checkOut: function () {
        browser.waitForVisible(checkoutButtonSelector);
        browser.scroll(checkoutButtonSelector);
        browser.click(checkoutButtonSelector);
        browser.pause(5000);
        browser.frameParent();
        browser.pause(5000);
    },
    checkIn: function () {
        browser.waitForVisible(checkInButonSelector);
        browser.scroll(0, 0);
        browser.click(checkInButonSelector);
        browser.pause(5000);
        browser.frameParent();
        browser.pause(5000);
    },
    cancelCheckoutConfirmYes: function(){
        browser.click("//button[contains(string(),'Cancel')]");
        contentTabUIObj.cancelCheckoutPopupYes();
    },
    cancelCheckoutConfirmNo: function(){
        browser.click("//button[contains(string(),'Cancel')]");
        contentTabUIObj.cancelCheckoutPopupNo();
    },
    cancelCheckoutPopupYes:function(){
        browser.frameParent();
        browser.waitForVisible("//div[@class='modal-content']//button[contains(.,'Yes')]", maxWaitTimeInMs);
        browser.click("//div[@class='modal-content']//button[contains(.,'Yes')]");
    },
    cancelCheckoutPopupNo:function(){
        browser.frameParent();
        browser.waitForVisible("//div[@class='modal-content']//button[contains(.,'No')]", maxWaitTimeInMs);
        browser.click("//div[@class='modal-content']//button[contains(.,'No')]");
    },
    clearSectionTextValue: function () {
        try 
        {
            browser.clearElement(sectionTextSelector);
        } catch (err) {
            console.log('Fail to clear Section Text' + err)
        }
    },
    Titleinputsetvalue:function (Titleinputvalue) {
        browser.setValue(Titleinput, Titleinputvalue);
    },
    sectionHeaderSetValue: function (sectionHeaderVal) {
        browser.scroll(SectionHeader);
        browser.setValue(SectionHeader, sectionHeaderVal);

    },
    sectionTextSetValue: function (sectionTextVal) {
        browser.setValue(sectionTextSelector, sectionTextVal);
    },
    highlightsSetValue: function (highlightsValue) {
        
        browser.setValue(highlightsSelector, highlightsValue);
    },
    pullQuotesSetValue: function (pullQuotesValue) {
        
        browser.setValue(pullQuotesSelector, pullQuotesValue);
    },
    citationsSetValue: function (citationValue) {
        browser.scroll(citationsSelector);
        browser.setValue(citationsSelector, citationValue);
    },
    relatedLinksSetValue: function (relatedLinksValue) {
        browser.scroll(relatedLinksTextSelector);
        browser.setValue(relatedLinksTextSelector, relatedLinksValue);
    },

    RelatedLinkHeaderSetValue: function (RelatedLinksHeaderVal) {
        
        browser.setValue(RelatedLinksHeader, RelatedLinksHeaderVal);

    },

    QuestionTextSetValue:function(Data)
    {
       browser.scroll(QuestionTextSelector);
       browser.setValue(QuestionTextSelector, Data);
    },
     QuestiontypeSelectText:function(Value)
    {
       
        browser.selectByValue(selectBox,Value);
        
    },

     ResultTextSetValue:function(Data)
    {
       browser.scroll(ResultsSelector);
       browser.setValue(ResultsSelector, Data);
    },
    
    
    mModuleckEditorMenuClick: function (sectionIndex) {
        browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])[" + sectionIndex + "]");
        browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])[" + sectionIndex + "]");
        browser.pause(2000);
    },
    mModuleSubMenuOptionClick: function (optionToSelectName, sectionIndex) {
        browser.waitForVisible("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]", maxWaitTimeInMs);
        browser.moveToObject("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]");
        browser.leftClick("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]");
        browser.pause(5000);
        return browser.getText("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]")
    },
    mModuleSubMenuOptionClick: function (optionToSelectName, sectionIndex) {
        browser.waitForVisible("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]", maxWaitTimeInMs);
        browser.moveToObject("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]");
        browser.leftClick("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]");
        browser.pause(2000);
        return browser.getText("(//span[text()='" + optionToSelectName + "'])[" + sectionIndex + "]")
    },
    mModuleCodeMenuClick: function (sectionIndex) {
        browser.waitForVisible("(//span[text()='Code'])[" + sectionIndex + "]", maxWaitTimeInMs);
        browser.moveToObject("(//span[text()='Code'])[" + sectionIndex + "]");
        browser.leftClick("(//span[text()='Code'])[" + sectionIndex + "]");
        browser.pause(5000);
        return browser.getText("(//span[text()='Code'])[" + sectionIndex + "]")
    },
    ModuleckEditorMenuClick: function (sectionIndex) {
        browser.moveToObject("(//a[@title='Insert Module'])[" + sectionIndex + "]");
        browser.click("(//a[@title='Insert Module'])[" + sectionIndex + "]");
        browser.pause(5000);
    },
    ExpandContentTab: function () {
        browser.waitForVisible('//span[contains(.,"Content")]//*[@id="menuDownArrow-button"]');
        browser.click('//span[contains(.,"Content")]//*[@id="menuDownArrow-button"]');

        if (browser.isExisting("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Expand']")) {
            browser.click("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Expand']");
            browser.pause(5000);
        }
    },
    CollapseContentTab: function () {
        browser.waitForVisible('//span[contains(.,"Content")]//*[@id="menuDownArrow-button"]');
        browser.click('//span[contains(.,"Content")]//*[@id="menuDownArrow-button"]');

        if (browser.isExisting("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Collapse']")) {
            browser.click("//div[@id='x-menu-el-toggleViewWidget-menuItem']//span[text()='Collapse']");
            browser.pause(5000);
        }
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
        Helper.verfiyElementExists("div.ng-scope > table >tbody > tr:nth-child(1) >td:nth-child(1) >img ", 90000);
        browser.click("div.ng-scope > table >tbody > tr:nth-child(1) >td:nth-child(1) >img ");
        browser.pause(5000);
    },
    selectImage: function () {
        browser.click("//div[@class='modal-footer']//button[contains(string(),'Select')]");
        browser.pause(1000);
       
    },
    ImagelinkVal:function (Imagemodule) {
        var ImageSelector= "//h2[span[contains(.,'"+Imagemodule+"')]]//following-sibling::div//div//div//div[@class='ng-binding']";
        browser.waitForVisible(ImageSelector,maxWaitTimeInMs);
        var imagelinkval = browser.getText(ImageSelector);
        return imagelinkval;
    },

     cancelCheckout: function(){
        browser.click("//button[contains(string(),'Cancel')]");
        browser.frameParent();
    },

    contentHeaderGet:function()
    {
        contentTabUIObj.switchToExternalWidgetFrame();
        browser.waitForVisible(contentHeader,maxWaitTimeInMs);
        var result=browser.getText(contentHeader);
        browser.frameParent();
        return result;

    },

     switchToExternalWidgetFrame: function(){
        var contentWidgetIFrameElement = browser.element(contentPaneFrameSelector);
        browser.frame(contentWidgetIFrameElement.value);
    }


}

module.exports = contentTabUIObj;