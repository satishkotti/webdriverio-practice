var page = require('./../../../common/page');
var wdioConf = require('./../../../../wdio.conf.js');

var testUrl = 'http://genesys.dev01.webmd.com';

var pbLoginPg = Object.create(page, {
    
    username: { get: function () { return browser.element('#username'); } },
    password: { get: function () { return browser.element('#password'); } },
    site:     { get: function () { return browser.element('#site'); } },
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
});

module.exports = pbLoginPg