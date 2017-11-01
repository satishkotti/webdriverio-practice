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

var Elements = function () {
    UntilExist();
    UntilVisible();
    return browser.elements(locator);
};

module.exports = {
    getRelation: function(relation){
        locator = '//tr[contains(.,"' + relation + '")]';
        return {
            locator: locator,
            elements: Elements()
        }
    }
}