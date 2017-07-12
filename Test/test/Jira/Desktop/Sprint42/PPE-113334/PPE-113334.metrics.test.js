var chai = require('chai');
var argv = require("yargs").argv;
var should = chai.should();
var webdriverio = require("webdriverio");
var testdata = require("../../../../../test/config/FeTestdat")[argv.env];
var ca = require("../../../../../test/common/functions/CommonActions");
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
            .scroll('//*[@id="page-1"]/div[3]/aside')
            .click(testdata.module_facebook[0].locator)
            .windowHandles().then(function (handle) {
                browser.pause(10000)
                       .window(handle.value[1])
                       .close()
                console.log("facebook closed")
            })
            .click(testdata.module_twitter[0].locator)
            .pause(20000)
            .windowHandles().then(function (handle) {
                browser.pause(10000)
                       .window(handle.value[1])
                       .close()
                console.log("twitter closed")
            })
            .click(testdata.module_pintrest[0].locator)
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
        ca.stdCallVerification("Pageviewcall", omnitureData, testdata.Pageview);

    });
    it('module call  call validation  for twitter ', function () {
        ca.stdCallVerification("Modulecall", omnitureData, testdata.module_twitter[1]);

    }
    );

    it('module call  call validation  for facebook ', function () {
        ca.stdCallVerification("Modulecall", omnitureData, testdata.module_facebook[1]);

    }
    );
    it('module call  call validation  for pintrest ', function () {
        ca.stdCallVerification("Modulecall", omnitureData, testdata.module_pintrest[1]);

    }
    );




});
