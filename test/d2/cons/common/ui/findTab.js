var propertiesTabUI = require('./propertiesTab');
var propertiesTab = require('./../actions/propertiesTab.actions');
var externalWidget0Selector= "iframe[id*='oam_id==ExternalWidget-0!!oam_target_type==ExternalWidget']";

module.exports = {
    isFindWidgetInLeftContainerExists: function(){
         browser.waitForVisible("//div[@id='border-layout-container-1']//span[text()='Find']/parent::*");
        return browser.isExisting("//div[@id='border-layout-container-1']//span[text()='Find']/parent::*");
    },
     switchToExternalWidget0Frame: function(){
        var contentWidgetIFrameElement = browser.element(externalWidget0Selector);
        browser.frame(contentWidgetIFrameElement.value);
    },
    findByChronicleId: function(objChronicleId){
        browser.pause(4000);
        browser.waitForVisible("//input[@placeholder='Enter text']");
        browser.setValue("//input[@placeholder='Enter text']",objChronicleId);
        browser.click("//span[contains(@class,'search')]");
        browser.pause(6000);
    },
    findByText: function(objChronicleId){
        browser.waitForVisible("//input[@placeholder='Enter text']");
        browser.setValue("//input[@placeholder='Enter text']","ObjectName");
        browser.click("//span[contains(@class,'search')]");
    },
    verifyNoMatchingMessage: function () {
        var locator = "//div[@class='toast-message' and contains(.,'Unable to find a matching document!')]";
        browser.waitUntil( () => {
            return browser.isExisting(locator) == true
        });
        console.log("locator visible:"+browser.isVisible(locator));
       expect(browser.isVisible(locator)).to.be.true;
    },
    verifyFindByIdResult: function(chronicleId) {
        propertiesTab.getChronicleIdAndName();
        var cid=propertiesTabUI.chronicleIdGet();
        console.log("cid"+cid+" chronicleId:"+chronicleId);
        expect(cid).to.equal(chronicleId);
    },
       Searchtext: function(objName){
        browser.waitForVisible("//input[@placeholder='Enter text']");
        browser.setValue("//input[@placeholder='Enter text']",objName);
        browser.click("//span[contains(@class,'search')]");
    },
    DeleteValidation: function () {
        var locator = "//div[@class='toast-message' and contains(.,'Unable to find a matching document!')]";
        browser.waitUntil( () => {
            return browser.isExisting(locator) == true
        });
       expect(browser.isVisible(locator)).to.be.true;
       browser.pause(2000);
    },
}