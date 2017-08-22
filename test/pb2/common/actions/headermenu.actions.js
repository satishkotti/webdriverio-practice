var LoginPage = require('./../elements/login.page');

var logout = "//header//div/ul/li[text() = 'Logout']";
var headerMenu = "//header//div";

module.exports.Logout = () => {
        browser.element(headerMenu).click();
        browser.element(logout).click();
        LoginPage.username.waitForVisible();
}
