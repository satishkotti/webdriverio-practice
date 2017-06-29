var maxWaitTimeInMs = 50000;

var versionTabUIObj = {

    selectversions: function (assetName, assetVersion1, assetVersion2) {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.waitForVisible("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion1 + "')]");
        browser.leftClick("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion1 + "')]");
        browser.pause(1000);
        browser.leftClick("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion2 + "')]");
        browser.pause(1000);
    },
    versionValidation: function () {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.pause(2000);
        var version = browser.isExisting("//span[contains(.,'1.0, CURRENT, WIP')]");
        expect(version).to.be.true;
        browser.pause(1000);
    },
    approvedversionValidation: function () {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.pause(2000);
        var version = browser.isExisting("//span[contains(.,'Approved')]");
        expect(version).to.be.true;
        browser.pause(1000);
    },
     activeversionValidation: function () {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.pause(2000);
        var version = browser.isExisting("//span[contains(.,'Active')]");
        expect(version).to.be.true;
        browser.pause(1000);
    },
    expireversionValidation: function () {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.pause(2000);
        var version = browser.isExisting("//span[contains(.,'Expired')]");
        expect(version).to.be.true;
        browser.pause(1000);
    },
      WipversionValidation: function () {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.pause(2000);
        var version = browser.isExisting("//span[contains(.,'CURRENT, WIP')]");
        expect(version).to.be.true;
        browser.pause(1000);
    },
     WipStagingversionValidation: function () {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.pause(2000);
        var version = browser.isExisting("//span[contains(.,'CURRENT, WIP, Staging')]");
        expect(version).to.be.true;
        browser.pause(1000);
    },

}

module.exports = versionTabUIObj;