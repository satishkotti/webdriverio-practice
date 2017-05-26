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
    }
}

module.exports = versionTabUIObj;