var maxWaitTimeInMs = 50000;
var functions = require('./../../common/functions/functions');

var auditTabUIObj = {

    auditWidget: function () {
        var audit = browser.isExisting("//span[text()='Audit' and @aria-hidden=not('true')]");
        if (audit == false) {
            browser.click("//div[@id='tab-container-2']//ul[@role='tablist']//span[@id='addTool-button']");
            browser.pause(5000);
            browser.click("//center[//table]//following-sibling::center//big[contains(.,'Audit')]");
            browser.waitForVisible("//span[text()='Audit' and @aria-hidden=not('true')]", maxWaitTimeInMs);
        }
    },
    categories: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var event = browser.isExisting("//span[contains(.,'Event')]");
        expect(event).to.be.true;
        var user = browser.isExisting("//span[contains(.,'User')]");
        expect(user).to.be.true;
        var date = browser.isExisting("//span[contains(.,'Date')]");
        expect(date).to.be.true;
        var version = browser.isExisting("//span[string()='Version']");
        expect(version).to.be.true;
    },
    creationEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var addVersionLabel = browser.isExisting("//tr[contains(.,'Add Version Label') and contains(.,'" + functions.getQAPublicationUser().username + "')]");
        expect(addVersionLabel).to.be.true;
        var attachlifecycle = browser.isExisting("//tr[contains(.,'Attach Lifecycle') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'WIP')]");
        expect(attachlifecycle).to.be.true;
        var link = browser.isExisting("//tr[contains(.,'Link To') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'other')]");
        expect(link).to.be.true;
        var save = browser.isExisting("//tr[contains(.,'Save Object') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'Save') and contains(.,'1.0')][1]");
        expect(save).to.be.true;
        var setcontent = browser.isExisting("//tr[contains(.,'Set Content') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'setfile') and contains(.,'1.0')][1]");
        expect(setcontent).to.be.true;
        var unlink = browser.isExisting("//tr[contains(.,'Unlink From') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'Temp')]");
        expect(unlink).to.be.true;
    },
    mandatoryFieldsEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
    },
    checkoutEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var lock = browser.isExisting("//tr[contains(.,'Lock Object') and contains(.,'" + functions.getQAPublicationUser().username + "')]");
        expect(lock).to.be.true;
        var checkout = browser.isExisting("//tr[contains(.,'Checkout Object') and contains(.,'" + functions.getQAPublicationUser().username + "')]");
        expect(checkout).to.be.true;
    },
    checkinEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }

        var setcontent = browser.isExisting("//tr[contains(.,'Set Content') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'setcontent')]");
        expect(setcontent).to.be.true;
        var cancelcheckout = browser.isExisting("//tr[contains(.,'Cancel Checkout') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'Internal Unlock')]");
        expect(cancelcheckout).to.be.true;
        var checkin = browser.isExisting("//tr[contains(.,'Checkin Object') and contains(.,'" + functions.getQAPublicationUser().username + "')]");
        expect(checkin).to.be.true;
    },
    promoteEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        browser.pause(5000);
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var promote = browser.isExisting("//tr[contains(.,'Promote to Lifecycle State') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'WIP') and contains(.,'Staging')]");
        expect(promote).to.be.true;
    },
    demoteEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        browser.pause(5000);
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var demote = browser.isExisting("//tr[contains(.,'Demote from Lifecycle State') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'WIP') and contains(.,'Staging')]");
        expect(demote).to.be.true;
    },
    powerpromoteEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        browser.pause(5000);
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var powerpromote = browser.isExisting("//tr[contains(.,'Promote to Lifecycle State') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'Staging') and contains(.,'Approved')]");
        expect(powerpromote).to.be.true;
    },
    expireEvent: function () {
        browser.click("//span[text()='Audit' and @aria-hidden=not('true')]");
        browser.pause(5000);
        var loading = true;
        while (loading) {
            loading = auditTabUIObj.widgetloading();
        }
        var expire = browser.isExisting("//tr[contains(.,'Add Version Label') and contains(.,'Expired')]");
        expect(expire).to.be.true;
    },
    saveEvent: function (ver) {
        var save = browser.isExisting("//tr[contains(.,'Save Object') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'Save') and contains(.,'" + ver + "')]");
        expect(save).to.be.true;
    },
    save: function () {
        var save = browser.isExisting("//tr[contains(.,'Save Object') and contains(.,'" + functions.getQAPublicationUser().username + "') and contains(.,'Save')]");
        expect(save).to.be.true;
    },
    widgetloading: function () {
        return browser.isVisible('//div[@class="ext-el-mask-msg x3-loading-medium"]');
    },





}

module.exports = auditTabUIObj;