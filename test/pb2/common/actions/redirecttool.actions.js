var menus = require('./menus.actions');

var searchBtn = '[name="redirectSearchForm"] > div:nth-of-type(2) > div.floatright > button';
var createBtn = '[name="redirectForm"] > div:nth-of-type(2) > div.floatright > button';

var searchFromUrl = '[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input';
var searchToUrl = '[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input';
var createFromUrl = '[name="redirectForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input';
var createToUrl = '[name="redirectForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input';

var chooseFile = '#bulkRedirect';
module.exports.GoToRedirectToolPage = function(option) {
    menus.GoToRedirectTool()
}

module.exports.GetPageTitle = function(option) {
    if (option.target == 'Search') {
        return browser.getText("div.row > div:nth-of-type(1) > section.pb-module > header > h3");
    } else if (option.target == 'Create') {
        return browser.getText("div.row > div:nth-of-type(2) > section.pb-module > header > h3");
    } else if (option.target = "Bulk") {
        return browser.getText("h3");
    } else return ""
}

module.exports.GetRedirectElement = function(option) {
    switch (option.element) {
        case "searchFromUrl":
            {
                if (browser.isVisible(searchFromUrl))
                    return browser.getHTML(searchFromUrl);
                else return null
            }
        case "searchToUrl":
            {
                if (browser.isVisible(searchToUrl))
                    return browser.getHTML(searchToUrl);
                else return null
            }
        case "createFromUrl":
            {
                if (browser.isVisible(createFromUrl))
                    return browser.getHTML(createFromUrl);
                else return null
            }
        case "createToUrl":
            {
                if (browser.isVisible(createToUrl))
                    return browser.getHTML(createToUrl);
                else return null
            }
        case "searchBtn":
            {
                if (browser.isVisible(createToUrl))
                    return browser.getHTML(createToUrl);
                else return null
            }
        case "createBtn":
            {
                if (browser.isVisible(createToUrl))
                    return browser.getHTML(createToUrl);
                else return null
            }
        case "chooseFile":
            {
                if (browser.isVisible(chooseFile))
                    return browser.getHTML(chooseFile);
                else return null
            }
    }
}

module.exports.GoToBulkImport = function(option) {
    browser.click("a.pb-redirect-nav-link.floatright");
}

module.exports.GoToBulkImport = function(option) {
    browser.click("a.pb-redirect-nav-link.floatright");
}

module.exports.SearchFromUrl = function(option) {
    var url = option.url;

}

module.exports.SearchToUrl = function(option) {

}