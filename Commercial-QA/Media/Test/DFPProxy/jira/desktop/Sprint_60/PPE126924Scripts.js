/*
*****************************************************************************************
These test cases to verify Lotame pid is not passed in DFP ad call when user is logged in
*****************************************************************************************
 */

// Declare required variables
request = require("request");
var chai = require("chai");
var should = chai.should();
//var webdriverio = require("webdriverio");
var ada = require("./../../../common/functions/AdcallsActions");
//var celements = require("./../../../common/pageobjects/Commonelements");
var browser = require("../../../utilities/wdioconfig"); // comment later
var webmd_proxy = require("wdio-browser-proxy")(browser); // comment later
var qs = require("querystring");
var urls1 = require("./../../../config/DFPRegression.TestData");

function _Fn(val) {
    describe('Do not Pass Lotame call when user logged in ' + i, function () {
        // var currenturl = val.urls1.qa01[i];
        var currentUrl = urls1.qa01[i];

        this.timeout(0);
        var Addata1, lotameresult, cookievalue1;
        var qs1, lotamedata;
        before(function (done) {
            try {
                console.log(currentUrl);
                var x = browser.enableProxy({})
                    .url('https://member.qa01.webmd.com/')
                    .setValue('//*[@id="signinForm"]/div/div/div/div/form/fieldset/div[2]/div[1]/input', 'perfsatish@perf.com')
                    .setValue('//*[@id="signinForm"]/div/div/div/div/form/fieldset/div[3]/div[1]/input', 'pass1234')
                    .click('//*[@id="signinForm"]/div/div/div/div/form/fieldset/div[6]/span[1]/input')
                    .url(currentUrl)
                    .end()

                    //PPE-126924 - Lotame: Do not fire when user is logged in

                    .getNetworkCalls('http://ad.crwdcntrl.net/').then(function (result) {
                        lotamecall = result;
                        console.log("No. of ad.crwdcntrl calls = " + lotamecall.length);
                        done();
                    })
                    .getNetworkCalls('http://bcp.crwdcntrl.net/').then(function (result) {
                        lotamecall2 = result;
                        console.log("No. of bcp.crwdcntrl calls = " + lotamecall2.length);
                        done();
                    })

                    .getNetworkCalls('http://tags.crwdcntrl.net/').then(function (result) {
                        lotamecall3 = result;
                        console.log("No. of tags.crwdcntrl calls = " + lotamecall.length);
                        done();
                    })

                    .getNetworkCalls("https://securepubads.g.doubleclick.net/gampad").then(function (result1) {
                        Addata1 = result1;
                        console.log("No. of Ad calls = " + Addata1.length);
                        qs1 = Addata1[1].request.queryString;
                        done();
                    });

            } catch (error) {
                console.log(error);
            }
        });

        it('PPE-127532: Verify lotame call is not fired when user is logged in', function () {
            lotamecall.length.should.equal(0);
            lotamecall2.length.should.equal(0);
            lotamecall3.length.should.equal(0);

            var custparams = ada.extractCustParams(qs1);
            console.log(custparams);
            var lpid1 = ada.extractParamsFromList(custparams, "lpid");
            console.log("lpid =" + lpid1);
            should.not.exist(lpid1);
        });

    });
}

// for (var i = 0; i < urls1.qa01.length; i++) {
//     try {
//         _Fn(urls1.qa01[i]);
//     } catch (error) {
//         console.log(error);
//     }
// }

// comment below later and uncomment above one

for (var i = 0; i < 2; i++) {
    try {
        _Fn(urls1.qa01[i]);
    } catch (error) {
        console.log(error);
    }
}

