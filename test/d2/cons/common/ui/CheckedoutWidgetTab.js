var maxWaitTimeInMs = 50000;

var CheckedoutWidgetTabUIObj = {

    CheckedoutWidget: function () {
        
        var ChkoutWidgt = browser.isExisting("//li[@tag_id='Checked Out Documents-widgetTab']//span[text()='Checked Out Documents']");
        if (ChkoutWidgt == false) 
        {
            browser.click("//div[@id='tab-container-3']//div//ul//span[@id='addTool-button']");
            browser.pause(3000);
            browser.click("//img[@id='Displays a list of checked-out content with user name and time of checkout.-widgetItem']");
            browser.pause(3000);
          
        }
        browser.click("//li[@tag_id='Checked Out Documents-widgetTab']//span[text()='Checked Out Documents']");
        browser.pause(5000);

    },
   
    verifyCheckedAsset: function (AssetTitle) {
        var locator = "//div[@widget_type='CheckoutDocumentWidget']//span [@title='" + AssetTitle + "']";
        browser.waitUntil( () => {
            return browser.isExisting(locator) == true
        });
        
       expect(browser.isVisible(locator)).to.be.true;
    },

}

module.exports = CheckedoutWidgetTabUIObj;