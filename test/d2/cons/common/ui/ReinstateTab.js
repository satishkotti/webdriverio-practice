var maxWaitTimeInMs = 50000;

var ReinstateTabUIObj = {

    selectReinstate: function (assetName, assetVersion) {
        browser.waitForVisible("//span[string()='Versions']", maxWaitTimeInMs);
        browser.click("//span[string()='Versions']");
        console.log("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.waitForVisible("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.click("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.pause(1000);
        browser.rightClick("//td[contains(.,'" + assetName + "')]//following-sibling::td[contains(.,'" + assetVersion + "')]");
        browser.pause(2000);
        browser.click("//div[@aria-activedescendant='menuContextView']//div[@id='x-menu-el-menuContextLocate']//following-sibling::div//a[contains(.,'Re-Instate')]");
        browser.pause(5000);
         browser.click("//div[@class='modal-content']//div[@class='modal-footer']//button[@ ng-click='$confirm()']");
        browser.pause(10000);
        
    },

}

module.exports = ReinstateTabUIObj;