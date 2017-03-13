var page = require('./../../../common/page');

//Menus
var menu = Object.create(page, {
    createEdit : { value: { get: function (cemenu) { return browser.element('//li[text()="' +  cemenu + '"]'); } } },
    home: { get: () => { return browser.element('.pb-home'); } },
    hamburger: { get: () => { return browser.element('.fa-bars'); } },
    browser: { get: () => { return browser;} }
});
module.exports = menu;

/*
//Actions
var action = Object.create(page, {
    viewReadOnly: { get: () => { return browser.element('//span[string()="View Read-Only"]'); } },
    edit: {get: () => { return browser.element('button[data-ng-click="goToAsset()"]'); } }
});
module.exports = action;
*/
