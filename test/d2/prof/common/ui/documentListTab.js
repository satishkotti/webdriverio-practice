var maxWaitTimeInMs = 30000;

var ppModalLabel = "Power Promote Confirmation Message";
var ppModalMsg = " Are you sure you want to power promote this document?"
var activeStateLbl = "Active";
var successPublishSysMsg = "Object has been made Active. Publish has been called.";
var vertionTabSelector = "//span[text()='Versions']";


var documentListUIObj = {

    selectDocumentListTab: function () {
        browser.click("//span[text()='Document list']")
        browser.waitForExist("div.x-grid3-hd-inner.x-grid3-hd-object_name.x-component");
    },
    selectItemByName: function (assetName) {
        browser.click("//span[@title='" + assetName + "']");
        browser.pause(1000);
    },
    selectVersionTab: function(version){
        browser.click(vertionTabSelector);
        browser.pause(1000);
        var verfityVersionSelector = "//div[@widget_type='DetailsVersionsWidget']//span[@title='"+version+"']";
        var IsVersionVerified = browser.isExisting(verfityVersionSelector);
        return IsVersionVerified;
    },

    verifyLock: function(objName){
        var LockSelector = "//div[starts-with(@id,'DoclistWidget')]//span[@title="+objName+"]//preceding-sibling::span[starts-with(@class,'DocListLockByYou')]";
        var IsLocked = browser.isExisting(LockSelector);
        return IsLocked;
    }



}

module.exports = documentListUIObj;