var maxWaitTimeInMs = 20000;
var sectionTextSelector= "//h2[span[contains(.,'Section Text')]]//following-sibling::div//div[text()='Enter text here']";
var highlightsSelector = "//h2[span[contains(.,'Highlights')]]//following-sibling::div//div[text()='Enter text here']";
var pullQuotesSelector= "//h2[span[contains(.,'Pull Quotes')]]//following-sibling::div//div[text()='Enter text here']";
var citationsSelector= "//h2[span[contains(.,'Citations')]]//following-sibling::div//div[text()='Enter text here']";
var relatedLinksTextSelector= "//h2[span[contains(.,'Related Links Text')]]//following-sibling::div//div[text()='Enter text here']";

var ContentTabObj = module.exports = {
    
    switchToExternalWidgetFrame: function(){
        var contentWidgetIFrameElement = browser.element("iframe[id*='oam_id==ExternalWidget-2!!oam_target_type==ExternalWidget']");
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
        browser.click("//span[text()='Content']");
        browser.pause(1000);
    },
    checkOut: function(){
        browser.waitForVisible("//button[contains(string(),'Check-out')]");
        browser.click("//button[contains(string(),'Check-out')]");
        browser.pause(5000);
        browser.frameParent(); // set focus to parent frame
        browser.pause(5000);
    },
    checkIn: function(){
        browser.click("//button[contains(string(),'Check-in')]");
        browser.pause(5000);
        browser.frameParent(); // set focus to parent frame
        browser.pause(5000);
    },
    sectionTextSetValue: function(sectionTextVal){
        browser.scroll(sectionTextSelector);
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
    mModuleckEditorMenuClick: function(sectionIndex){
        browser.moveToObject("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+sectionIndex+"]");
        browser.click("(//span[contains(.,'Module')]/following-sibling::span[@class='cke_button_arrow'])["+sectionIndex+"]");
        browser.pause(4000);
    },
    mModuleCodeMenuClick: function(sectionIndex){
        browser.waitForVisible("(//span[text()='Code'])["+sectionIndex+"]", maxWaitTimeInMs);
        browser.moveToObject("(//span[text()='Code'])["+sectionIndex+"]");
        browser.leftClick("(//span[text()='Code'])["+sectionIndex+"]");
        browser.pause(5000);
        return browser.getText("(//span[text()='Code'])["+sectionIndex+"]")
    }
}