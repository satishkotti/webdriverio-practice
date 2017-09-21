var maxWaitTimeInMs = 50000;

var removeCloseUIObj = {

    removeclosebutton: function () {
        browser.waitForVisible("//div//a[@ng-click='closeClicked()'']", maxWaitTimeInMs);
        var verifyclose = browser.isExisting("//div//a[@ng-click='closeClicked()'']");
        expect(verifyclose).to.be.false;
    },
 
}

module.exports = removeCloseUIObj;