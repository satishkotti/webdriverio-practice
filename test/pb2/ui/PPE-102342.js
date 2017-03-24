var test = require('./../common/functions/functions');

describe('PPE-77199: Verify the ability to sort the Activity Queue Page results by Action Name', () => {
    var assetDetails = {};
    before(() => {

        test.LaunchAppAndLogin();
        test.EnterActivityQueueStatusPage();
        browser.pause(3000);
        test.EnableDisableAutoRefresh('Disable');
        //browser.waitForVisible('//tbody/tr/td[3]/span');
        var actionNames = browser.getText('//tbody/tr/td[3]/span');
        actionNames.sort();
        browser.waitForVisible('//th[string()="Action"]//a[contains(@class,"border-down")]');
        browser.moveToObject('//th[string()="Action"]//a[contains(@class,"border-down")]').click('//th[string()="Action"]//a[contains(@class,"border-down")]');
        browser.waitForVisible('//div[contains(@style, "overflow: visible")]//li[contains(.,"Ascending")]');
        browser.click('//div[contains(@style, "overflow: visible")]//li[contains(.,"Ascending")]');
        browser.pause(2000);
        //assertions
    });
            it('Should display Results in Ascending order', () => {
var afterSortactionNames = browser.getText('//tbody/tr/td[3]/span');
expect(actionNames).to.equal(afterSortactionNames);
});
});