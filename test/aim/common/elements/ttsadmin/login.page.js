var page = require('./../../../../../page');
let input_field_locator = '//input[@id="***"]';
var username = input_field_locator.replace("***", "UserName");// tts admin user
var pwd = input_field_locator.replace("***", "Password");;  // tts admin pasword
var loginbutton = 'input[value="Log In"]';  // tts admin login button
var header = '#sitenavigation';
var logout = '//a[text()="Sign Off "]';

let ReturnElement = function(locator) {
    browser.waitForExist(locator);
    return browser.element(locator);
}

var ttsLoginPg = Object.create(page, {

    username: { get: function () { browser.refresh(); return ReturnElement(username); } },
    password: { get: function () { return ReturnElement(pwd); } },
    login: { get: function () { return browser.element(loginbutton); } },
    logout: { get: function () { return browser.element(logout); } },
    open: {
        value: function (url) {
            page.open(url);
        }
    },


});

module.exports = ttsLoginPg