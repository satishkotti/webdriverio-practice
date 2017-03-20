var maxWaitTimeInMs = 20000;

var mModulePullQuoteUIObj = {

    getQuoteLabel: function () {
        return browser.getText("div[data-test='pullquote-quotetextlabel']");
    },
    getQuoteAttrLabel: function () {
        return browser.getText("div[data-test='pullquote-quoteattributionlabel']");
    },
    getAlignValue: function () {
        var codeTypeSelect = browser.element("select[data-test='pullquote-align']");
        return codeTypeSelect.getValue();
    },
    quoteTextAttributeAlignSetValue: function (quoteText, quoteAttr, quoteAlign) {
        mModulePullQuoteUIObj.verfiyElementExists("input[data-test='pullquote-quotetext']");
        browser.setValue("input[data-test='pullquote-quotetext']", quoteText);
        browser.setValue("input[data-test='pullquote-quoteattribution']", quoteAttr);
        var codeTypeSelect = browser.element("select[data-test='pullquote-align']");
        codeTypeSelect.selectByVisibleText(quoteAlign);
    },
    insertQuote: function () {
        mModulePullQuoteUIObj.verfiyElementExists("button[data-test='pullquote-insertbutton']");
        browser.click("button[data-test='pullquote-insertbutton']");
        browser.pause(1000);
    },
    updateQuote: function () {
        mModulePullQuoteUIObj.verfiyElementExists("button[data-test='pullquote-updatebutton']");
        browser.click("button[data-test='pullquote-updatebutton']");
        browser.pause(1000);
    },
    cancelQuote: function () {
        mModulePullQuoteUIObj.verfiyElementExists("button[data-test='pullquote-cancelbutton']");
        browser.click("button[data-test='pullquote-cancelbutton']");
        browser.pause(1000);
    },
    verfiyElementExists: function (selectorVal) {
        if (!browser.isExisting(selectorVal)) {
            browser.frame();
            browser.waitForExist(selectorVal, maxWaitTimeInMs);
        }
    }
}

module.exports = mModulePullQuoteUIObj;