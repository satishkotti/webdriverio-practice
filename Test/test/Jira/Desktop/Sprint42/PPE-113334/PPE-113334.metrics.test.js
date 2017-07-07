var chai = require('chai');
var argv = require("yargs").argv;
var should = chai.should();
var webdriverio = require("webdriverio");
var testdata = require("../../../../../test/config/FeTestdat")[argv.env];
var ca=require("../../../../../test/common/functions/CommonActions");
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
var browser = webdriverio.remote(options);
var webmd_proxy = require('wdio-browser-proxy')(browser);
var qs = require('querystring');
var count = 0;


describe('basic test', function () {
    this.timeout(0);
    var omnitureData;
    before(function (done) {
        
        var currenturl = testdata.URL; 
        browser
            .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            .addBlackList('https://.*doubleclick.net/.*')
            .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
            .url(currenturl)
            .pause(50000)
            .end()
            .getNetworkCalls('http://std.o.webmd.com/').then(function (result) {
                omnitureData = result;
                console.log(omnitureData.length);
                done();
            });
    });

    it('it should make some calls to omniture', function () {
        omnitureData.length.should.be.above(0);
    });


          it('page view call validation ', function () {
        ca.stdCallVerification("Pageviewcall",omnitureData,testdata.Pageview);
        
    });
    
   
});
