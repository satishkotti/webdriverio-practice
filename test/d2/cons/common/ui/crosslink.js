var locator;

var isExisting = function () {
    return browser.isExisting(locator);
};
var UntilVisible = function (loator) {
    isExisting(locator);
    browser.waitForVisible(locator);
};
var UntilExist = function () {
    browser.waitForExist(locator);
};

var Element = function () {
    UntilExist();
    UntilVisible();
    return browser.element(locator);
};

module.exports = {

    crosslinker_bottom_iframe: function () {
        return browser.getAttribute('(//div[@widget_type="ExternalWidget"]//iframe)[1]', 'id');
    },

    openCrosslinker: function () {
        locator = '//button[contains(.,"Open CrossLinker")]';
        return Element();
    },

    crosslinkerSummary: function () {
        locator = '#sideBarContents';
        return Element();

    },

    saveCrosslink: function () {
        locator = '#btnSave';
        return Element();
    },

    successMessage: function () {
        locator = '#divSuccess';
        return Element();
    },

    close: function () {
        locator = '//button[contains(.,"Close")]';
        return Element();

    }

}