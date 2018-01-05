//AIM search page
var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut = 3000;

var homeLnk = '#sn_home';// select home link 
var entGrpName = '#IdOrName-input';// enter the group name to search 
var findBtn = '#find';// click find button for the provided group
var showallBtn = '#showAll';// click show all  button for the provided group
var clrSrchRsltBtn = '#clear'; // click clear search results  button after result set shown
var confSrchRsltLnk = '//div[@id="GroupSearchResults"]//tr/td[1]/a'; // click configure after search results set shown

// TTS configuration
var EditCnfgLnk = '//a[text()="Edit Configuration"]';// select edit confuguration link in TTS configuration
var vwTugLnk = '//a[@id="viewtug"]';//select view tug in TTS config


let loadingIcon = '//div[@id="ConfigUrlsGrid"]/div[7]/h1'; //  wait procesing bar


let groupUrlsModal = '//div[@id="ConfigUrlsGrid"]';  //  resultset shown after configure is selected.
let groupUrlsModalTR = `${groupUrlsModal}//tr[***]`;
let groupUrlsModalTD = `${groupUrlsModalTR}//td[##]`;

let groupUrlsModalHeaders = {
    status: 1,
    full_url: 6,
    page_name: 7,
    restriction_collision: 19,
    restriction_group: 20,
    
}

let ReturnElement = function (locator) {
    browser.waitForExist(locator);
    browser.waitForVisible(locator);
    return browser.element(locator);
}

var ttsGroupSearchPg = Object.create(page, {

    homeLnk: { get: function () { return ReturnElement(homeLnk); } },
    enterGrpName: { get: function () { return ReturnElement(entGrpName); } },
    findButton: { get: function () { return ReturnElement(findBtn); } },
    showallBtn: { get: function () { return ReturnElement(showallBtn); } },
    clearSearchResultBtn: { get: function () { return ReturnElement(clrSrchRsltBtn); } },
   configureSrchRsltLnk: { get: function () { return ReturnElement(confSrchRsltLnk); } },

    
    
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
    GetGroupUrlData: {
        value: function (row) {
            let groupUrlData = {};
                       groupUrlsModalTR = groupUrlsModalTR.replace('***', row);
            let groupUrlsModalTD = `${groupUrlsModalTR}//td[##]`;
            groupUrlData = {
               status: ReturnElement(groupUrlsModalTD.replace('##', groupUrlsModalHeaders.status)),
                full_url: ReturnElement(groupUrlsModalTD.replace('##', groupUrlsModalHeaders.full_url)),
                page_name:ReturnElement(groupUrlsModalTD.replace('##', groupUrlsModalHeaders.page_name)),
                 restriction_collision:ReturnElement(groupUrlsModalTD.replace('##', groupUrlsModalHeaders.restriction_collision)),
                restriction_group:ReturnElement(groupUrlsModalTD.replace('##', groupUrlsModalHeaders.restriction_group)),

        }

            return groupUrlData;
        }
    },

});

module.exports = ttsGroupSearchPg