var locator;

var UntilVisible = function () {
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
    switchToWidget: function (widget) {
        locator = '//li[@tag_id="' + widget + '-widgetTab"]//span[contains(@class,"label") and string()="' + widget + '"]';
        return Element();
    }

}