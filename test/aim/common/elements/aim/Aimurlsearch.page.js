//AIM url search page
var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut= 3000;
var schDrpDn='//li[@id="searchNav"]';// search drop down
var keySrch ='#KeywordSearch_Keywords'; // keyword to provide for search
var keySrchbtn = '#btnKeywordSearch'; // search button after providing keyword
var keyResStrtDate = '#KeywordSearch_ReservationStartDate';
var keyresEndDate = '#KeywordSearch_ReservationEndDate';
var advSrchlnk = '#openAdvancedSearchModal';
//var keySrchParm = $('#KeywordSearch_Operator'); // parameter to select contains all, exact match in normal search
var advSrchaddFltr = '#obtnAddFilter';    

//var advSrchaddFltrDrpDwn = $('#AdvancedSearch_Filters_2fa52b1d-5a78-441a-9bf8-b0ffbc41d56e__Column_Name');
//var advSrchaddFltrOpDrpDwn = $('#AdvancedSearch_Filters_2fa52b1d-5a78-441a-9bf8-b0ffbc41d56e__Operator'); //to select contains all, exact match in advanced search
var advSrchaddFltrOpDrpDwn ='#AdvancedSearch_Filters_2fa52b1d-5a78-441a-9bf8-b0ffbc41d56e__Value';
var advSrchBtn = '#btnAdvancedSearch';//  after providing advanced search keyword click advanced search button.

var keySrchRslt = '//div[@id="results"]/div[4]';

let loadingIcon = '.k-loading-image';
let UrlsModal = '//div[@id="grid"]';  // metadata show after selecting URLs in resultset
let UrlsModalTR = `${UrlsModal}//tr[***]`;
let UrlsModalTD = `${UrlsModal}//td[##]`;

let UrlsModalHeaders = {
    details: 1,
    reservation: 2,
    runtime_system: 3,
    url_status: 4,
    full_url:5,    
    asset_id: 6,
    title: 7,
     channel: 12,
     primary_topicid:13 ,
       product: 14,
       package_name:15 , 

}

let ReturnElement = function (locator) {
    browser.waitForExist(locator);
    return browser.element(locator);
}


var aimSearchPg = Object.create(page, {

    searchdrpdown: { get: function () { return browser.element(schdrp); } }, // drop down for product , url , reservation drop down selection
    keywordsrch: { get: function () { return browser.element(keysrch); } },
        keywordsrch: { get: function () { return browser.element(keysrch); } },
         keySrchbtn: { get: function () { return browser.element(keySrchbtn); } },
         keyResStrtDate: { get: function () { return browser.element(keyResStrtDate); } },
         keyresEndDate: { get: function () { return browser.element(keyresEndDate); } },
      advSrchlnk: { get: function () { return browser.element(advSrchlnk); } },
      keySrchRslt: { get: function () { return browser.element(keySrchRslt); } },
        keySrchParm: { get: function () { return browser.element(keySrchParm); } },
          advSrchaddFltr: { get: function () { return browser.element(advSrchaddFltr); } },

  advSrchaddFltrDrpDwn: { get: function () { return browser.element(advSrchaddFltrDrpDwn); } },
   advSrchaddFltrOpDrpDw: { get: function () { return browser.element(advSrchaddFltrOpDrpDw); } }, // filter to select contains all, exact match
   advSrchaddFltrOpDrpDwn: { get: function () { return browser.element(advSrchaddFltrOpDrpDwn); } },
     advSrchBtn: { get: function () { return browser.element(advSrchBtn); } },
 
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
                details: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.details)),
               reservation: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.reservation)),
                runtime_system:ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.runtime_system)),
                url_status:ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.url_status)),
                full_url: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.full_url)),
                asset_id: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.asset_id)),
                title: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.title)),
                  channel: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.channel)),
                    primary_topicid: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.primary_topicid)),
                      product: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.product)),
                package_name: ReturnElement(prodUrlsModalTD.replace('##', UrlsModalHeaders.package_name)),
     
            }

            return UrlData;
        }
    },



});


module.exports = aimSearchPg