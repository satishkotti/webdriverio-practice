var page = require('./../../../common/page');

var tabHeading = '//li[contains(.,"***")]'
var spinnerLoc = '//span[@data-ng-show="*Loading" and contains(@class, "ng-hide")]';
var locator = '';

var search = Object.create(page, {
    globalSearch: { get: () => { return browser.element('.pb-search input');} },
    magnifyingGlass: { get: () => { return browser.element('.fa.fa-search'); } },
    switchToCategory: { value : (category) => {
        switch(category)
        {
            case 'DPM': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'm'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category));
            case 'SM': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'm'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category));
            case 'XSL': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'x'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category));
            case 'Template': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 't'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category));
            case 'Page': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'p'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category));
        }
    }},
    waitForAssetScreen: { value: () => { browser.waitForVisible('a.pb-chron'); } }
});

module.exports = search;