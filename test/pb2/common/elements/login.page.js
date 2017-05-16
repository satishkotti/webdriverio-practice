var page = require('./../../../common/page');
var wdioConf = require('./../../../../wdio.conf.js');

var selectDD = '//form[@id="pb-login"]/label[contains(.,"***:")]//select'; //Dropdown using Select

var testUrl = 'http://genesys.dev01.webmd.com';

var pbLoginPg = Object.create(page, {
    
    username: { get: function () { return browser.element('#username'); } },
    password: { get: function () { return browser.element('#password'); } },
    form:     { get: function () { return browser.element('#pb-login'); } },
    title:    { get: function () { return browser.getTitle(); } },
    failLoginText: { get: function () {
        return browser.getText("span=Username or password incorrect");
    } },
    maximize: { value: function (window) { browser.windowHandleMaximize(window); } },
    browser: { get: function()  { return browser }},

    open: { value: function(url) {
        page.open(url);
    } },

    submit: { value: function() {
        this.form.submitForm();
    } },
    select: {
        value: (labelName, option) => {
            
            locator = selectDD.replace('***', labelName);
            console.log(locator);
            browser.selectByVisibleText(locator, option);
            
        }
    },
});

module.exports = pbLoginPg