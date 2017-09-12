/*
****************************************************
This test case to verify DFP Ad calls
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var ada = require("./../../../common/functions/AdcallsActions");
var options = {
    desiredCapabilities: {
        browserName: "chrome",  // declare browser name here
        // pageLoadStrategy: "normal",
        // ensureCleanSession: "true"
        //applicationCacheEnabled: "false"
    },    
    mochaOpts: {
        ui: 'bdd',
        waitforTimeout: 9999999
    },
};
var webdriverio = require("webdriverio");
var browser = webdriverio.remote(options);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");
var Adcall;
// Describe Network calls function


describe(' DFP Ad calls Regression ', function () {

    before(function (done) {
        var stagingurl = "https://www.staging.webmd.com/diabetes";
        this.timeout(0);
        var x = browser.enableProxy({})

            .url(stagingurl)
            .end()
            .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                Adcall = result;
                console.log(Adcall.length);
                qs1 = Adcall[1].request.queryString;
                done();
            });

    });

    it("Ad Call Length Should be 2", function () {
        Adcall.length.should.be.equal(2);
    });

    it("Verify POS Value", function () {
    var expectedpos = ['5101'];
    var scplist = ada.splitScp(qs1);
    var poslist = ada.extractPOSValues(scplist);
    console.log(poslist);
    ada.verifyTwoLists(poslist,expectedpos);    
    })


})


