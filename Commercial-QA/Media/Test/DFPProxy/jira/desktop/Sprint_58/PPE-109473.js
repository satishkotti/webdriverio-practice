/*
****************************************************
PPE-109473 Remove Nativo Components
****************************************************
 */

// Declare required variables

var chai = require("chai");
var should = chai.should();
var urls1 = require("./../../../config/DFPRegression.TestData");
//var urls1 = require("./../../../config/DFPAdcallstestdata");
//var urls2 = require("./../../../config/DFPAdcallstestdata.1");
var ada = require("./../../../common/functions/AdcallsActions");
var temp = 0;
var options = {
    desiredCapabilities: {
        browserName: "internet explorer",  // declare browser name here
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
//var qs = require("querystring");

// Describe Network calls function

function _Fn(val) {
    describe(' DFP Ad calls Regression ', function () {
    var nativocall,postrelease;  
    this.timeout(1000000);
        before(function (done) {
            
        

              //var stagingurl = urls1.staging[val];
              var stagingurl = val;
              
        var x = browser.enableProxy({})
            .url(stagingurl)
                .end()
                .getNetworkCalls('http://www.staging.webmd.com/api/NativoApi/api/feedmapping?').then(function (result) {
                    nativocall = result;
                    console.log("nativo",nativocall.length);
                    //qs1 = Addata1[0].request.queryString;
                    x.getNetworkCalls('http://a.postrelease.com').then(function (result) {
                          postreleasecall = result;
                    console.log("postrelease",postreleasecall.length);
                     });
                    done();
                });
        });

        it( "Feedmapping Call" , function () {
             nativocall.length.should.equal(0);
        });         

        it( "Post Release Call" , function () {
           
             postreleasecall.length.should.be.equal(0);
        });         

    })
}

for (var i = 0; i < urls1.staging.length; i++) {
    _Fn(urls1.staging[i]);
    console.log(urls1.staging[i]);
}
