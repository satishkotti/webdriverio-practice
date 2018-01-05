//AIM search page
var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut = 3000;
var schDrpDn = '#searchNav';// select  drop down having url , product , reservation
var prodSrchDrpDn = '//li[@id="searchNav"]/ul/li[2]/a'// select product search formm the dropdown
var keySrch = '#KeywordSearch_Keywords';
var site = '//div[@id="runtime"]/div/div';
var keySrchbtn = '#btnKeywordSearch' // search button on product  search page

var keySrchRslt = '//div[@id="results"]/div[4]'; //result set show for the search
var urlSelLink = '//div[@id="grid"]//tr[1]//td[2]/a'; //selection of link urls


let loadingIcon = '.k-loading-image';


let prodUrlsModal = '//div[@id="ProductUrlsModal"]';  // metadata show after selecting URLs in resultset
let prodUrlsModalTR = `${prodUrlsModal}//tr[***]`;
let prodUrlsModalTD = `${prodUrlsModalTR}//td[##]`;

let prodUrlsModalHeaders = {
    runtime_or_system: 1,
    url_status: 2,
    full_url: 3,
    title: 4,
    channel_id:8,
    topic_id: 9,
    asset_id: 14,
}

let ReturnElement = function (locator) {
    browser.waitForExist(locator);
      browser.waitForVisible(locator);
    return browser.element(locator);
}

var aimProdSearchPg = Object.create(page, {

    searchdrpdown: { get: function () { return ReturnElement(schDrpDn); } },
    productsearchdrpdown: { get: function () { return ReturnElement(prodSrchDrpDn); } },
    keywordsrch: { get: function () { return ReturnElement(keySrch); } },
    site: { get: function () { return ReturnElement(site); } },
    keySrchbtn: { get: function () { return ReturnElement(keySrchbtn); } },
    keySrchRslt: { get: function () { return ReturnElement(keySrchRslt); } },
    urlSelLink: { get: function () { return ReturnElement(urlSelLink); } }, //selecting urls link 
    waitForSearchToComplete: {   //  waiting for loading icon to be visible and later to dissappear
        value:
        function () {
            browser.waitUntil(function () {
                return browser.isVisible(loadingIcon);
            }, 500000, 'Loading icon did not appear', 500);
            browser.waitUntil(function () {
                return !browser.isVisible(loadingIcon);
            }, 300000, 'Loading icon did not disappear', 1000);
        }

    },
    open: {
        value: function (url) {
            page.open(url);
        }
    },
    GetProductUrlData: {
        value: function (row) {
            let productUrlData = {};
                       prodUrlsModalTR = prodUrlsModalTR.replace('***', row);
            let prodUrlsModalTD = `${prodUrlsModalTR}//td[##]`;
            productUrlData = {
                runtime_or_system: ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.runtime_or_system)),
                url_status: ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.url_status)),
                full_url:ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.full_url)),
                title:ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.title)),
                topic_id: ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.topic_id)),
                channel_id: ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.channel_id)),
                asset_id: ReturnElement(prodUrlsModalTD.replace('##', prodUrlsModalHeaders.asset_id)),

            }

            return productUrlData;
        }
    },

});

module.exports = aimProdSearchPg