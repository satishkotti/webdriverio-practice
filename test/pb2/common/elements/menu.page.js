var page = require('./../../../common/page');

//Menus
var menu = Object.create(page, {
    createEdit : { value: { get: function (cemenu) { return browser.element('//li[text()="' +  cemenu + '"]'); } } },
    home: { get: () => { return browser.element('.pb-home'); } },
    hamburger: { get: () => { return browser.element('.fa-bars'); } },
});
module.exports = menu;
