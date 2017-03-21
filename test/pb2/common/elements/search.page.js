var page = require('./../../../common/page');

var tabHeading = '//div[@type="pills"]//li[contains(.,"***")]'
var spinnerLoc = '//span[@data-ng-show="*Loading" and contains(@class, "ng-hide")]';
var locator = '';

var search = Object.create(page, {
    globalSearch: { get: () => { return browser.element('.pb-search input');} },
    magnifyingGlass: { get: () => { return browser.element('.fa.fa-search'); } },
    switchToCategory: { value : (category) => {
        switch(category)
        {
            case 'DPM': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'm'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
            case 'SM': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'm'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
            case 'XSL': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'x'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
            case 'Template': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 't'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
            case 'Page': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'p'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
        }
    }},
    waitForAssetScreen: { value: () => { browser.waitForVisible('div[ui-view="properties"]'); } }
});

module.exports = search;