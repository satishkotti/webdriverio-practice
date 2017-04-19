module.exports = {
    isFindWidgetInLeftContainerExists: function(){
         browser.waitForVisible("//div[@id='border-layout-container-1']//span[text()='Find']/parent::*");
        return browser.isExisting("//div[@id='border-layout-container-1']//span[text()='Find']/parent::*");
    }
}