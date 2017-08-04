var maxWaitTimeInMs = 50000;

var ReinstateTabUIObj = {

    selectReinstate: function (assetName, assetVersion) {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        browser.waitForVisible("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.click("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.pause(1000);
        browser.rightClick("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.pause(1000);
    },

}

module.exports = ReinstateTabUIObj;