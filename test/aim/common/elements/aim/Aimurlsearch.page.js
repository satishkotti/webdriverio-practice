//AIM url search page
var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut = 9000;
var schDrpDn = '//li[@id="searchNav"]';// select  drop down
//var selUrlSrchDn='//li[@id="searchNav"]//a[text()="URL Search"]';// select url seardh form drop down
var selUrlSrchDn = '//li[@id="searchNav"]/ul/li[1]/a';// select url search from drop down
//var keySrch ='#KeywordSearch_Keywords'; // keyword to provide for search
var keySrch = '//input[@id="KeywordSearch_Keywords"]'; // keyword to provide for search
var keySrchbtn = '#btnKeywordSearch'; // search button after providing keyword
var keyResStrtDate = '#KeywordSearch_ReservationStartDate';
var keyresEndDate = '#KeywordSearch_ReservationEndDate';
var advSrchlnk = '#openAdvancedSearchModal';
var keySrchParm = '#KeywordSearch_Operator'; // parameter $ to select contains all, exact match in normal search
var keySrchParmSelect = '//select[contains(@id,"KeywordSearch_Operator")]//option[text()="Contains any"]'; //  to select contains any form list

var advSrchaddFltr = '#obtnAddFilter';

var advSrchaddFltrDrpDwn = '//select[contains(@id,"Column_Name")]'; // to select $ search apramter like url, title
var advSrchaddFltrDrpDwnSelect = '//select[contains(@id,"AdvancedSearch_Filters")]//option[text()="Full URL"]' // tp select the ful url form the drop dopwn
var advSrchaddFltrDrpDwnSelect2 = '//select[contains(@id,"AdvancedSearch_Filters")]//option[text()="***"]' // tp select the ful url form the drop dopwn
var advSrchaddFltrOpDrpDwn = '//select[contains(@id,"AdvancedSearch_Filters") and contains(@id,"Operator")]'; //to select  contains all, exact match in advanced search
var advSrchaddFltrOpDrpDwnSelect = '//select[contains(@id,"Operator")]//option[text()="Contains any"]'// to select the contains any  form the drop dopwn
//var advSrchaddFltrOpDrpDwnSelect = '//select[contains(@id,"AdvancedSearch_Filters")]//option[text()="Contains any"]'// to select the contains any  form the drop dopwn
var advSrchaddFltrValue = '//select[contains(@id,"Value")]';
var advSrchBtn = '#btnAdvancedSearch';//  after providing advanced search keyword click advanced search button.
var noRsltUrl = '//div[@id="grid"]/div/span[text()="No items to display"]';  // No records in resultset after search if false
var keySrchRslt = '//div[@id="grid"]/div/span[contains(text(),"of")]'; // cehcking records availability

let loadingIcon = '.k-loading-image';
let UrlsModal = '//div[@id="grid"]';  // metadata show after selecting URLs in resultset
let UrlsModalTR = `${UrlsModal}//tr[***]`;
let UrlsModalTD = `${UrlsModal}//td[##]`;

let UrlsModalHeaders = {
    details: 1,
    reservation: 2,
    runtime_system: 3,
    url_status: 4,
    full_url: 5,
    asset_id: 6,
    title: 7,
    channel: 12,
    primary_topicid: 13,
    product: 14,
    package_name: 15,

}

let ReturnElement = function (locator) {
    browser.waitForExist(locator);
  
    browser.waitForVisible(locator);
    return browser.element(locator);
}


var aimSearchPg = Object.create(page, {


    searchdrpdown: { get: function () { return browser.element(schDrpDn); } }, // drop down for product , url , reservation drop down selection
    keywordsrch: { get: function () { return ReturnElement(keySrch); } },
    selUrlSrchDn: { get: function () { return browser.element(selUrlSrchDn); } },
    keySrchbtn: { get: function () { return browser.element(keySrchbtn); } },
    keyResStrtDate: { get: function () { return browser.element(keyResStrtDate); } },
    keyresEndDate: { get: function () { return browser.element(keyresEndDate); } },
    advSrchlnk: { get: function () { return browser.element(advSrchlnk); } },
    keySrchRslt: { get: function () { return browser.element(keySrchRslt); } },
    keySrchParm: { get: function () { return ReturnElement(keySrchParm); } },
    keySrchParmSelect: { get: function () { return ReturnElement(keySrchParmSelect); } },
    advSrchaddFltr: { get: function () { return ReturnElement(advSrchaddFltr); } },
    advSrchaddFltrDrpDwn: { get: function () { return ReturnElement(advSrchaddFltrDrpDwn); } },
    advSrchaddFltrValue: { get: function () { return ReturnElement(advSrchaddFltrValue); } }, // filter to select contains all, exact match
    advSrchaddFltrOpDrpDwn: { get: function () { return ReturnElement(advSrchaddFltrOpDrpDwn); } },
    advSrchBtn: { get: function () { return browser.element(advSrchBtn); } },
    noRsltUrl: { get: function () { return browser.element(noRsltUrl); } },

    advSrchaddFltrDrpDwnSelect: { get: function () { return ReturnElement(advSrchaddFltrDrpDwnSelect); } },
    advSrchaddFltrOpDrpDwnSelect:
    {
        get:
        function (option) {
            return ReturnElement(advSrchaddFltrOpDrpDwnSelect);
        }
    },
    advSrchaddFltrDrpDwnSelect2:
    {
        value:
        function (option) {
            return ReturnElement(advSrchaddFltrDrpDwnSelect2.replace('***', option));
        }
    },

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

    GetUrlData: {
        value: function (row) {
            let UrlData = {};
            UrlsModalTR = UrlsModalTR.replace('***', row);
            let UrlsModalTD = `${UrlsModalTR}//td[##]`;
            UrlData = {
                details: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.details)),
                reservation: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.reservation)),
                runtime_system: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.runtime_system)),
                url_status: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.url_status)),
                full_url: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.full_url)),
                asset_id: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.asset_id)),
                title: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.title)),
                channel: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.channel)),
                primary_topicid: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.primary_topicid)),
                product: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.product)),
                package_name: ReturnElement(UrlsModalTD.replace('##', UrlsModalHeaders.package_name)),

            }

            return UrlData;
        }
    },



});


module.exports = aimSearchPg