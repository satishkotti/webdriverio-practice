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
    Searchtext: function(objName){
        browser.waitForVisible("//input[@placeholder='Enter text']");
        browser.setValue("//input[@placeholder='Enter text']",objName);
        browser.click("//span[contains(@class,'search')]");
    },
     pointerDeleteValidation: function () {
        var locator = "//div[@class='toast-message' and contains(.,'Unable to find a matching document!')]";
        browser.waitUntil( () => {
            return browser.isExisting(locator) == true
        });
       expect(browser.isVisible(locator)).to.be.true;
    },
     pubSubSecDeleteValidation: function () {
        var locator = "//div[@class='toast-message' and contains(.,'Unable to find a matching document!')]";
        browser.waitUntil( () => {
            return browser.isExisting(locator) == true
        });
       expect(browser.isVisible(locator)).to.be.true;
    }
}