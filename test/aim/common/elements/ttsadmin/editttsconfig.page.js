//Edit TTS Configuration Page
var page = require('./../../../../../page');
var wdioConf = require('./../../../../../wdio.conf.js');
var maxTimeOut = 3000;

// TTS configuration
var bkToTtsLnk = '//a[@id="backtotts"]';// select edit configuration link in TTS configuration
var vwTugLnk = '//a[@id="viewtug"]';//select view tug link in Edit TTS config
var fndUrlLnk = '//a[@id="findUrl]';//select find url link in Edit TTS config
var vldteUrlLnk = '//a[@id="validate"]';//select Validate link  url in Edit TTS config
var clrCngLnk = '//a[@id="clear"]';//select clear configuration link  in Edit TTS config
var uploadGrpLnk = '//a[@id="uploadGroup"]';//select uplaod group link in Edit TTS config`
var exportGrpLnk = '//a[@id="exportGroup"]';//select export  group link in Edit TTS config`
var cancelLnk = '//a[@id="cancel"]';//select cancel link in Edit TTS config`
var setAllUrlDrpDwn = '//select[@id="setUrlStatusTo"]';//Set all urls status dropdown Edit TTS config`
var setAllUrlDrpDwnReserved = '//select[contains(@id, "setUrlStatusTo")]//option[text()="Reserved"]';//Set all urls status dropdown  to Reserved Edit TTS config`
var setAllUrlDrpDwnApproved = '//select[contains(@id, "setUrlStatusTo")]//option[text()="Approved"]';//Set all urls status dropdown  to Reserved Edit TTS config`
var goUrlStatusBtn = '//button[@id="setUrlStatusBtn"]';//select cancel link in Edit TTS config`

let loadingIcon = '//div[@id="ConfigUrlsGrid"]/div[7]/h1'; //  wait procesing bar


let editTtsConfigModal = '//div[@id="ConfigUrlsGrid"]';  //  resultset shown after configure is selected.
let editTtsConfigModalTR = `${editTtsConfigModal}//tr[***]`;
let editTtsConfigModalTD = `${editTtsConfigModalTR}//td[##]`;

let editTtsConfigModalHeaders = {
    status: 2,
    full_url: 7,
    page_name: 8,
    restriction: 20,
    
}

let ReturnElement = function (locator) {
    browser.waitForExist(locator);
    browser.waitForVisible(locator);
    return browser.element(locator);
}

var editTTSConfigPg = Object.create(page, {

    bkToTtsLnk: { get: function () { return ReturnElement(bkToTtsLnk); } },
    vwTugLnk: { get: function () { return ReturnElement(vwTugLnk); } },
    fndUrlLnk: { get: function () { return ReturnElement(fndUrlLnk); } },
    vldteUrlLnk: { get: function () { return ReturnElement(vldteUrlLnk); } },
    clrCngLnk: { get: function () { return ReturnElement(clrCngLnk); } },
   uploadGrpLnk: { get: function () { return ReturnElement(uploadGrpLnk); } },
   exportGrpLnk: { get: function () { return ReturnElement(exportGrpLnk); } },
    cancelLnk : { get: function () { return ReturnElement(cancelLnk); } },
    setAllUrlDrpDwn: { get: function () { return ReturnElement(setAllUrlDrpDwn); } },
    setAllUrlDrpDwnReserved: { get: function () { return ReturnElement(setAllUrlDrpDwnReserved); } },
    setAllUrlDrpDwnApproved: { get: function () { return ReturnElement(setAllUrlDrpDwnApproved); } },
   goUrlStatusBtn: { get: function () { return ReturnElement(goUrlStatusBtn); } },

    

    
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
    GeteditTtsConfigData: {
        value: function (row) {
            let editTtsConfigData = {};
                       editTtsConfigModalTR = editTtsConfigModalTR.replace('***', row);
            let editTtsConfigModalTD = `${ editTtsConfigModalTR}//td[##]`;
            editTtsConfigData = {
               status: ReturnElement(editTtsConfigModalTD.replace('##', groupUrlsModalHeaders.status)),
                full_url: ReturnElement(editTtsConfigModalTD.replace('##', groupUrlsModalHeaders.full_url)),
                page_name:ReturnElement(editTtsConfigModalTD.replace('##', groupUrlsModalHeaders.page_name)),
                restriction:ReturnElement(editTtsConfigModalTD.replace('##', groupUrlsModalHeaders.restriction)),
                         
            }

            return groupUrlData;
        }
    },

});



module.exports = editTTSConfigPg