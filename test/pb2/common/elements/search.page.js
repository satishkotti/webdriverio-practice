var page = require('./../../../common/page');

var tabHeading = '//div[@type="pills"]//li[contains(.,"***")]'
var spinnerLoc = '//span[@data-ng-show="*Loading" and contains(@class, "ng-hide")]';
var resultsGrid = '#***';
var locator = '';

var search = Object.create(page, {
    globalSearch: { get: () => { return browser.element('.pb-search input'); } },
    magnifyingGlass: { get: () => { return browser.element('.fa.fa-search'); } },
    switchToCategory: {
        value: (category) => {
            switch (category) {
                case 'DPM': locator = tabHeading.replace('***', 'Dynamic Programmed Modules') + spinnerLoc.replace('*', 'm'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', 'Dynamic Programmed Modules')); break;
                case 'SM': locator = tabHeading.replace('***', 'Shared Modules') + spinnerLoc.replace('*', 'm'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', 'Shared Modules')); break;
                case 'XSL': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'x'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
                case 'Template': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 't'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
                case 'Page': locator = tabHeading.replace('***', category) + spinnerLoc.replace('*', 'p'); browser.waitForExist(locator); browser.click(tabHeading.replace('***', category)); break;
            }
        }
    },
    waitForAssetScreen: { value: () => { browser.waitForVisible('div.tab-pane.active'); browser.waitForVisible('a.pb-chron'); browser.waitForVisible('.pb-node-breadcrumb'); } },
    resultsGrid: {
        value: (grid) => {
            let element;
            switch (grid.toLowerCase()) {
                case 'redirects search':
                    locator = resultsGrid.replace('***', 'redirectListGrid');
                    browser.waitForExist(locator);
                    browser.waitForVisible(locator);
                    element = browser.element(locator);
                    break;
            };
            return element;
        }
    }
});

module.exports = search;