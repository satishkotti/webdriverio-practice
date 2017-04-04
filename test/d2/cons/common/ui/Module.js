var Helper = require('./../functions/functions');

var maxWaitTimeInMs = 20000;
var ModuleUIObj = {

    SwitchToModuleFrame: function () {
        browser.frame();
    },
    setModuleType: function (moduleType) {
        Helper.verfiyElementExists("select[ng-model='moduleConfig.moduleType']", maxWaitTimeInMs);
        browser.click("select[ng-model='moduleConfig.moduleType']");
        browser.click("//option[contains(.,'" + moduleType + "')]");
        browser.pause(1000);

    },
    setModuleSearchValue: function (text) {
        Helper.verfiyElementExists("input[placeholder='Search by keyword']", maxWaitTimeInMs);
        browser.setValue("input[placeholder='Search by keyword']", text);
        browser.click("span[class='input-group-addon']");
        browser.pause(5000);
    },
    clickModuleSearchResult: function (moduleSearch) {
        browser.click("//div[@class='modal-body']//tr[2]//td[2]");
        browser.pause(5000);
    },
    selectModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Select')]");
        browser.pause(1000);
    },
    cancelModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Cancel')]");
        browser.pause(1000);
    },
    insertModule: function () {
        browser.click("//div[@class='modal-footer']//button[contains(.,'Insert')]");
        browser.pause(1000);
    },
    getModulesizelabel: function () {
        var sizelabel = browser.isExisting("//div[@class='row']//div[contains(.,'Size')]");
        return sizelabel;
    },
    getModulesizefield: function () {
        var sizefield = browser.isExisting("//select[@ng-model='module.size']");
        return sizefield;
    },
    setModuleTitle: function (moduleTitle) {
        browser.setValue('#moduletitle', moduleTitle);
        browser.pause(2000);
    },
    moduleSocialShare: function () {
        var socialshare = browser.isExisting("//input[@id='editmodule-suppressShare']/following-sibling::label[contains(.,'Suppress Social Share')]");
        return socialshare;
    }
}

module.exports = ModuleUIObj;