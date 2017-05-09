var page = require('./../../../common/page');

var tableColumn = '//section[contains(.,"***")]//th[string()="###"]//a';
var sort = '//div[contains(@style, "overflow: visible")]//li[contains(.,"***")]'
var locator = '';

//Menus
var menu = Object.create(page, {
    createEdit : { value: { get: function (cemenu) { return browser.element('//li[text()="' +  cemenu + '"]'); } } },
    home: { get: () => { return browser.element('.pb-home'); } },
    queue: { get: () => { return browser.element('//li[text()="Queue"]'); } },
    hamburger: { get: () => { return browser.element('.fa-bars'); } },
    checkedOutDB: { get: () => { return browser.element('#grid-checkedOut');}},
    favoritesDB: {get: () => {return browser.element('#grid-favorites');}},
    tableColumnSort: { value: {get: (table, column, sortType) => {
switch(table){
default: 
        locator = tableColumn.replace('***', table);
        locator = locator.replace('###', column);
        browser.waitForVisible(locator);
        browser.moveToObject(locator).click(locator);
        locator = sort.replace('***', sortType);
        browser.waitForVisible(locator);
        browser.click(locator);
        break;
    case null:
        var arr = tableColumn.split('//section[contains(.,"***")]');
        locator = arr[1];
        locator = locator.replace('###', column);
        browser.waitForVisible(locator);
        browser.moveToObject(locator).click(locator);
        locator = sort.replace('***', sortType);
        browser.waitForVisible(locator);
        browser.click(locator);
        break;
}


    }}}
});
module.exports = menu;
