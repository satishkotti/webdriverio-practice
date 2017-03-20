var page = require('./../../../common/page')

var testUrl = 'http://genesys.dev01.webmd.com';

var pbLoginPg = Object.create(page, {
    
    username: { get: function () { return browser.element('#username'); } },
    password: { get: function () { return browser.element('#password'); } },
    form:     { get: function () { return browser.element('#pb-login'); } },
    title:    { get: function () { return browser.getTitle(); } },
    failLoginText: { get: function () {
        return browser.getText("span=Username or password incorrect");
    } },
    browser: { get: function()  { return browser }},

    open: { value: function() {
        page.open(testUrl);
    } },

    submit: { value: function() {
        this.form.submitForm();
    } },
});

module.exports = pbLoginPg