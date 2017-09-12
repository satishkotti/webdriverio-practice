/*
****************************************************
PPE-125633 Update A9 Multislot Implementation - Filter Sizes [Scripts]
****************************************************
 */

var chai = require('chai');
var should = chai.should();
var qs = require('querystring');
//var argv = require("yargs").argv;

var ada = require("./../../../common/functions/AdcallsActions");
var urls1 = require("./../../../config/DFPRegression.TestData");
var browser = require('../../../utilities/wdioconfig');
var webmd_proxy = require("wdio-browser-proxy")(browser);
var Addata, qs1;

function _Fn(val)
{
     var currenturl = val;
            console.log(currenturl);
    describe('PPE-125633 Update A9 Multislot Implementation - Filter Sizes [Scripts]', function ()
    {
        this.timeout(999999);
        console.log("before");
        before(function (done)
        {
            this.timeout(999999);
           
            var x = browser.enableProxy({})
            .url(currenturl)
            .end()
            .getNetworkCalls('https://aax.amazon-adsystem.com/e/dtb').then(function (result)
            {
                Addata1 = result;
                console.log(Addata1.length);
                qs1 = Addata1[0].request.queryString;
                //console.log(qs1);
                //done();
            })

            .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad/ads?').then(function (result)
            {
                Addata2 = result;
                console.log(Addata2.length);
                qs2 = Addata2[0].request.queryString;
                //console.log(qs1);
                done();
            });
        });

        it('PPE-126453 & PPE-126457 Desktop - Verify POS and size values in amazon network call', function ()
         {
            var slots = ada.extractParamsFromAdcall(qs2, "slots");
            var poslist = ada.splitStringwithDelimiter(slots, ",");
            console.log("POS list: "+poslist);
            ada.verifySlotsFromAAXCall(poslist);
        });

        it('PPE-126719 Desktop - Verify POS values in DFP ad call', function () {
            var slots = ada.extractParamsFromAdcall(qs2, "prev_scp");
            var poslist = ada.splitStringwithDelimiter(slots, "|");
            console.log("POS list: " + poslist);
            ada.verifyAmazonSlotsDFPcall(poslist);
        });
    });
}

for (var i = 0; i < urls1.staging.length; i++)
 {
    _Fn(urls1.staging[i]);
}