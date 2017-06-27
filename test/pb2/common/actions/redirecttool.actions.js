const menus = require('./menus.actions');
const props = require('./../elements/assetprops.page');
const action = require('./../elements/actions.page');
const search = require('./../elements/search.page');
const fs = require('fs');

var searchBtn = 'button.floatright';
var createBtn = '[name="redirectForm"] > div:nth-of-type(2) > div.floatright > button';

var searchFromUrl = '[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input';
var searchToUrl = '[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input';
var createFromUrl = '[name="redirectForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input';
var createToUrl = '[name="redirectForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input';

var chooseFile = '#bulkRedirect';
module.exports.GoToRedirectToolPage = function (option) {
    menus.GoToRedirectTool()
}

module.exports.GetPageTitle = function (option) {
    if (option.target == 'Search') {
        return browser.getText("div.row > div:nth-of-type(1) > section.pb-module > header > h3");
    } else if (option.target == 'Create') {
        return browser.getText("div.row > div:nth-of-type(2) > section.pb-module > header > h3");
    } else if (option.target == "Bulk") {
        return browser.getText("h3");
    } else {
        return browser.getTitle();
    }
}

module.exports.GetRedirectElement = function (option) {
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
                if (browser.isVisible(searchBtn))
                    return browser.getHTML(searchBtn);
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

module.exports.BulkImport = function (option) {
    action.button.get('Bulk Import').click();
}

module.exports.CreateRedirects = function(props){
    action.button.get('Create Reditrect').click();
}

module.exports.SearchFromUrl = function(option) {
    if (browser.element("//a[text()='Show Criteria']").isVisible())
        browser.click("//a[text()='Show Criteria']");
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input', "");
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input', "");
    var url = option;
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input', url);
    browser.click('button.floatright');
}

module.exports.SearchFromUrlNoClick = function(option) {
    if (browser.element("//a[text()='Show Criteria']").isVisible())
        browser.click("//a[text()='Show Criteria']");
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input', "");
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input', "");
    var url = option;
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input', url);
}

module.exports.Search = function (searchParams) {
    let from = searchParams.from;
    let to = searchParams.to;
    
    if(from != null) { props.input.get('From URL').setValue(from) };
    if(to != null) { props.input.get('To URL').setValue(to) };
    action.button.get('Search').click();
    search.resultsGrid('Redirects Search').waitForVisible();
}

module.exports.ExportRedirects = function (site) {

    let selectBulkExportSite = function(siteId){
        browser.selectByValue('select[title="Select Site for Bulk Export"]', siteId);
    }
    switch(site.toLowerCase()){
        case 'webmd desktop': selectBulkExportSite('3'); break;
        case 'webmd mobile': selectBulkExportSite('8'); break;
        case 'boots desktop': selectBulkExportSite('7'); break;
        case 'boots mobile': selectBulkExportSite('9'); break;
        case 'search results':
        action.button.get('Export to Excel').click();
        break;
    }
}

module.exports.VerifyFile = function (filepath) {
    let isPresent = null;
    return new Promise(function(resolve, reject){
        fs.stat(filepath, function (err, stat) {
        if (err == null) {
            isPresent = true;
            return resolve(isPresent);
        } else if (err.code == 'ENOENT') {
            isPresent = false;
            return resolve(isPresent);
        } else {
            isPresent = 'error: ' + err.code + ' - ' + err.message;
            return reject(isPresent);
        }
    });
        
    });
}

module.exports.IsFile = function(filepath) {
    return fs.statSync(filepath).isFile();

}

module.exports.DeleteFile = function(filepath){
    fs.unlinkSync(filepath);
}

module.exports.SearchToUrlNoClick = function(option) {
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(1) > label.pb-label > input', "");
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input', "");
    var url = option;
    browser.setValue('[name="redirectSearchForm"] > div:nth-of-type(1) > div:nth-of-type(2) > label.pb-label > input', url);
}

module.exports.createRedirect = function(fromUrl, toUrl) {
    if (!(browser.isVisible("//form[@name='redirectForm']")))
        browser.element("span.pb-buttongroup.floatright > button:nth-of-type(1)").click();
    browser.waitForVisible("//form[@name='redirectForm']");
    browser.setValue('[name="redirectForm"] > div.row > div:nth-of-type(1) > label.pb-label > input', fromUrl);
    browser.setValue('[name="redirectForm"] > div.row > div:nth-of-type(2) > label.pb-label > input', toUrl);
    browser.element('[name="redirectForm"] > button.floatright').click();
    browser.waitForVisible("section.pb-notification-container.success");
}

module.exports.createRedirectNoClick = function(fromUrl, toUrl) {
    if (!(browser.isVisible("//form[@name='redirectForm']")))
        browser.element("span.pb-buttongroup.floatright > button:nth-of-type(1)").click();
    browser.waitForVisible("//form[@name='redirectForm']");
    browser.setValue('[name="redirectForm"] > div.row > div:nth-of-type(1) > label.pb-label > input', fromUrl);
    browser.setValue('[name="redirectForm"] > div.row > div:nth-of-type(2) > label.pb-label > input', toUrl);
}

module.exports.ReadDirectory = function(filepath){
    return fs.readdirSync(filepath);
}