var maxWaitTimeInMs = 50000;

var auditTabUIObj = {

    auditWidget: function () {
        var audit = browser.isExisting("//span[text()='Audit' and @aria-hidden=not('true')]");
        if (audit == false){
            browser.click("//div[@id='tab-container-2']//ul[@role='tablist']//span[@id='addTool-button']");
            browser.pause(10000);
            browser.click("//center[//table]//following-sibling::center//big[contains(.,'Audit')]");
        }


    }

}

module.exports = auditTabUIObj;