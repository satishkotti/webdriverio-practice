var page = require('./../../common/page')
var data = require('./../data/testRunConfig');

var testUrl = data.testData.url;

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
        page.open.call(this, testUrl);
    } },

    submit: { value: function() {
        this.form.submitForm();
    } }

});

module.exports = pbLoginPg