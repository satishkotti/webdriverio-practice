var page = require('./../../../common/page');
var data = require('./../data/testRunConfig');
var testUrl = data.testData.url;


var d2LoginPg = Object.create(page, {
    
    username: { get: function () { return browser.element('#login_username-input'); } },
    password: { get: function () { return browser.element('#login_password-input'); } },
    loginDiv: { get: function (){ return '.x-panel-body'; } },
    
    title:    { get: function () { return browser.getTitle(); } },
    failLoginText: { get: function () {
        return browser.getText("span=Username or password incorrect");
    } },
    browser: { get: function()  { return browser }},

    open: { value: function() {
        page.open.call(this, testUrl);
        browser.waitForVisible('.x-panel-body');

    } },

    login: { value: function() {


        browser.click('#Login-button button.x-btn-text');
        browser.waitForVisible(".x-panel-bwrap", 20000);

    } }
});

module.exports = d2LoginPg