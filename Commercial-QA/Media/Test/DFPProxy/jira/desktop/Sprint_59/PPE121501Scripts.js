/*
****************************************************
These test cases to verify Lotame pid is passed in DFP ad call
****************************************************
 */

// Declare required variables
request = require("request");
var chai = require("chai");
var should = chai.should();
//var webdriverio = require("webdriverio");
var ada = require("./../../../common/functions/AdcallsActions");
//var browser = require("../../../utilities/wdioconfig");
//var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");
var urls1 = require("./../../../config/DFPRegression.TestData");

function _Fn(val) {
    describe('Pass Lotame pid to DFP call as LPID ' + i, function () {
        // var currenturl = val.urls1.qa01[i];
        var currentUrl = urls1.qa01[i];

        this.timeout(0);
        var Addata1, lotameresult, cookievalue1;
        var qs1, lotamedata;
        before(function (done) {
            try {
                console.log(currentUrl);
                var x = browser.enableProxy({})
                    .url(currentUrl)
                    .pause(3000)
                    .url(currentUrl)
                    //.click("//*[@id=\"ContentPane1\"]/nav/div[1]/div[1]/a/img")
                    // .pause(3000)

                    // .getCookie("lpid").then(function (result) {
                    //     cookievalue1 = result;
                    //     console.log("lpid cookie value=" + cookievalue1.value);
                    //     done()
                    // })
                    .end()
                    .getNetworkCalls("https://securepubads.g.doubleclick.net/gampad").then(function (result1) {
                        Addata1 = result1;
                        console.log("No. of Ad calls = " + Addata1.length);
                        qs1 = Addata1[1].request.queryString;
                        done();
                    })
                // .url("https://ad.crwdcntrl.net/5/c=932/pe=y/callback") // for Mobile filter with "ad.cc.webmd.com on emulator"


            } catch (error) {
                console.log(error);
            }
        });

        it('PPE-125877: Desktop - verify pid value from lotame passes in DFP call as lpid', function () {
            var custparams = ada.extractCustParams(qs1);
            console.log(custparams);
            var lpid1 = ada.extractParamsFromList(custparams, "lpid");
            console.log("lpid =" + lpid1);
            should.exist(lpid1);
           //  lpid1.should.equal(cookievalue1.value); // check cookie value and lpid value both are same

        });
    });
}

for (var i = 0; i < urls1.qa01.length; i++) {
    try {
        _Fn(urls1.qa01[i]);
    } catch (error) {
        console.log(error);
    }
}

