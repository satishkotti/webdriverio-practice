var maxWaitTimeInMs = 30000;

var ppModalLabel = "Power Promote Confirmation Message";
var ppModalMsg = " Are you sure you want to power promote this document?"
var activeStateLbl = "Active";
var successPublishSysMsg = "Object has been made Active. Publish has been called.";

var documentListUIObj = {

    selectDocumentListTab: function () {
        browser.click("//span[text()='Document list']")
        browser.waitForExist("div.x-grid3-hd-inner.x-grid3-hd-object_name.x-component");
    },
    selectItemByName: function (assetName) {
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    }
}

module.exports = documentListUIObj;