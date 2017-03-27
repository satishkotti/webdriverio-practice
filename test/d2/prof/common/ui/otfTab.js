var maxWaitTimeInMs = 30000;
var otfTabSelector="//li[@tag_id='OnTheFly-widgetTab']";
var otfWidget="//div[@tag_id='OnTheFly-widget']";

module.exports = {
    otfTabSelect: function(){
        if(!browser.isExisting(otfTabSelector))
        {
            browser.click("//div[@id='tab-container-2']//div[@unselectable='on']//div[@role='presentation']//ul[@role='tablist']//div[@qtip='Add widget']//span[@id='addTool-button']");
            browser.waitForVisible("//center[@title='OnTheFly']", maxWaitTimeInMs);
            browser.click("//center[@title='OnTheFly']");
        }else{
            browser.click(otfTabSelector);
            browser.waitForExist(otfWidget, maxWaitTimeInMs);
        }
    }   

}

