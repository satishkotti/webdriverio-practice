var maxWaitTimeInMs = 20000;
propertiesTabSelector="//span[text()='Properties']";
mediaTabSelector="//span[text()='Media']";
saveTabSelector="//button[contains(.,'Save')]";

var mediaObj = module.exports = {
    propertiesMediaTabSelect: function(){
        browser.waitForVisible(propertiesTabSelector, maxWaitTimeInMs);
        browser.click(propertiesTabSelector);
        browser.waitForVisible(mediaTabSelector, maxWaitTimeInMs);
        browser.click(mediaTabSelector);
        browser.waitForVisible("#title-input", maxWaitTimeInMs);
    },

    mediaMandatoryProperties: function(mediaFormat){
        browser.waitForVisible("//div[@id='wbmd_media_type']//img");
        browser.leftClick("//div[@id='wbmd_media_type']//img");
        browser.pause(2000);
        browser.leftClick("//div[@title='"+mediaFormat+"']")
        browser.click(saveTabSelector);
        browser.pause(2000);
          }
    
}
