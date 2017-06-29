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
    menus.GoToRedirectTool();
}

// B U L K  R E D I R E C T  A C T I O N S

module.exports.DeleteImportRow = function(rowNumber) {
    let location = browser.element("//section/ul/li["+rowNumber+"]/button").getLocation('y');
    browser.element("//section/ul/li["+rowNumber+"]/button").scroll(0, parseInt(location) - 200);
    browser.element("//section/ul/li["+rowNumber+"]/button").click();
}

module.exports.CheckImportError = function(error, rowNumber) {
    let location = browser.element("//section/ul/li["+rowNumber+"]/button").getLocation('y');
    browser.element("//section/ul/li["+rowNumber+"]/button").scroll(0, parseInt(location) - 200);
    switch(error){
        case "unique":
            {
                let ele = browser.element("//section/ul/li["+rowNumber+"]/div/div[3]/span/span");
                if (!(ele.isExisting() && ele.isVisible()))
                    return false;
                let eletext = ele.getText();
                if(eletext === 'All from values must be unique')
                    return true;
                else
                    return false;
            }
            case "multihop":
            {
                let ele = browser.element("//section/ul/li["+rowNumber+"]/div/div[3]/span/span");
                if (!(ele.isExisting() && ele.isVisible()))
                    return false;
                let eletext = ele.getText();
                if(eletext === 'Multi-hop redirects are not allowed')
                    return true;
                else
                    return false;
            }
            case "invalid":
            {
                let ele = browser.element("//section/ul/li["+rowNumber+"]/div/div[3]/span/span");
                if (!(ele.isExisting() && ele.isVisible()))
                    return false;
                let eletext = ele.getText();
                if(eletext === 'To and from fields must be valid URLs')
                    return true;
                else
                    return false;
            }
    }
}

module.exports.CheckCreateButtonEnabled = function(){
    return browser.element("//button[contains(text(),'Create')]").isEnabled();
}

module.exports.ModifyImportRow = function(rowNumber, data) {
    let location = browser.element("//section/ul/li["+rowNumber+"]/button").getLocation('y');
    browser.element("//section/ul/li["+rowNumber+"]/button").scroll(0, parseInt(location) - 200);

    if(data.from != null)
        browser.element("//section/ul/li[" + rowNumber +"]/div/div[1]/label/input").setValue(data.from);
    if(data.to != null)
        browser.element("//section/ul/li[" + rowNumber +"]/div/div[2]/label/input").setValue(data.to);

}

module.exports.GetImportRow = function(rowNumber) {
    if(!(browser.element("//section/ul/li["+rowNumber+"]")).isExisting())
        return false;
    let location = browser.element("//section/ul/li["+rowNumber+"]").getLocation('y');
    browser.element("//section/ul/li["+rowNumber+"]").scroll(0, parseInt(location) - 200);

    var data = {};
    data.from = browser.element("//section/ul/li[" + rowNumber +"]/div/div[1]/label/input").getValue();
    data.to = browser.element("//section/ul/li[" + rowNumber +"]/div/div[2]/label/input").getValue();
    return data;
}

module.exports.SubmitBulkRedirect = function() {
    browser.element("//button[contains(text(),'Create')]").click();
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

module.exports.GetRowFromResultGrid = function (rowNumber) {
    data={}
    data.fromUrl = browser.getText("//tbody[@role='rowgroup']/tr["+rowNumber+"]/td[3]/a");
    data.fromId = browser.getText("//tbody[@role='rowgroup']/tr["+rowNumber+"]/td[4]/span/a");
    data.toUrl = browser.getText("//tbody[@role='rowgroup']/tr["+rowNumber+"]/td[6]/a");
    data.toId = browser.getText("//tbody[@role='rowgroup']/tr["+rowNumber+"]/td[7]/span/a");
    return data;
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

module.exports.UploadRedirects = function (filePath){
     browser.chooseFile(chooseFile, filePath);
     action.button.get('Upload files').waitForVisible();
     action.button.get('Upload files').click();
}

module.exports.CreateRedirects = function(props){
    action.button.get('Create Redirect').click();
}

module.exports.ShowCriteria = function() {
    if(browser.element("=Search Criteria").isVisible())
        browser.element("=Search Criteria").click();
}

module.exports.SearchNoClick = function(searchParams) {
    let from = searchParams.from;
    let to = searchParams.to;
    if (browser.element("//a[text()='Show Criteria']").isVisible())
            browser.click("//a[text()='Show Criteria']");
    if(from != null) { props.input.get('From URL').setValue(from) };
    if(to != null) { props.input.get('To URL').setValue(to) };
}

module.exports.Search = function (searchParams) {
    let from = searchParams.from;
    let to = searchParams.to;
    if (browser.element("//a[text()='Show Criteria']").isVisible())
            browser.click("//a[text()='Show Criteria']");
    if(from != null) { props.input.get('From URL').setValue(from) };
    if(to != null) { props.input.get('To URL').setValue(to) };
    action.button.get('Search').click();
    search.resultsGrid('Redirects Search').waitForVisible();
    browser.pause(3000);
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