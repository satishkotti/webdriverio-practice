/*
****************************************************
This test case to verify DFP Ad calls
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
//var urls1 = require("./../../../config/DFPRegression.TestData");
var urls1 = require("./../../../config/DFPAdcallstestdata");
//var urls2 = require("./../../../config/DFPAdcallstestdata.1");
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

// Describe Network calls function

function _Fn(val) {
    describe(' DFP Ad calls Regression ', function () {

        before(function (done) {
   var stagingurl = val.URL;
   var feedmapcall,postreleasecall;
            this.timeout(0);
        var x = browser.enableProxy({})
            
            .url(stagingurl)
                .end()
                .getNetworkCalls('http://www.staging.webmd.com/api/NativoApi/api/feedmapping?').then(function (result) {
                    feedmapcall = result;
                    console.log(feedmapcall.length);
                     x.getNetworkCalls('http://a.postrelease.com').then(function (result) {
                          postreleasecall = result;
                    console.log(postreleasecall.length);
                     });
                    done();
                    
                });
                             
        });

         it( "Feedmapping Call" , function () {
            feedmapcall.length.should.equal(0);
        });   
         it("Post Release Call", function () {
             postreleasecall.length.should.equal(0);
         });


    })
}
for (var i = 0; i < urls1.length; i++) {
    _Fn(urls1[i]);
}
