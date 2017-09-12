//this is integration test that will fire off tests that will use selenium, browsermob and actual browsers
//you will need to start selenium, browsermob before running these tests

var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");
var options = {
    //host: '172.28.37.142',
    host: '127.0.0.1',
    port: 4444,
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
var browser = webdriverio.remote(options);
//this assumes you have a selenium running on 4444 and a proxy running on 8080
var webmd_proxy = require('../../lib/wdio-browser-proxy')(browser, { host: '127.0.0.1', port: 8080, selHost: '172.28.37.142', selPort: 4444 });
var qs = require('querystring');

describe('basic test', function () {
    this.timeout(60000);
    var omnitureData;
    before(function (done) {
        browser
            .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            .addBlackList('https://.*doubleclick.net/.*')
            .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
            .url('http://www.webmd.com/')
            .end()
            .getNetworkCalls('http://std.o.webmd.com').then(function (result) {
                omnitureData = result;
                done();
            })
            .catch(function (err) {
                console.log(err);
                done();
            });
    });

    it('it should make some calls to omniture', function () {
        omnitureData.length.should.be.above(0);
    });

    it('should make omniture call with the expected prop values', function () {
        //take the last omniture call
        var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
        //check the prop values
        should.exist(propValues.pageName);
        propValues.pageName.should.equal('webmd.com/')
    });

    after(function (done) {
        browser.end().then(function () { done(); })
    });

});

describe('basic https test', function () {
    this.timeout(60000);
    var omnitureData;
    before(function (done) {
        browser
            .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            .addBlackList('https://.*doubleclick.net/.*')
            .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
            .url('https://member.webmd.com')
            .end()
            .getNetworkCalls('https://ssl.o.webmd.com').then(function (result) {
                omnitureData = result;
                done();
            });
    });

    it('it should make some calls to omniture', function () {
        omnitureData.length.should.be.above(0);
    });

    it('should make omniture call with the expected prop values', function () {
        //take the last omniture call
        var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
        //check the prop values
        should.exist(propValues.pageName);
        propValues.pageName.should.equal('member.webmd.com/signin-core')
    });

    after(function (done) {
        browser.end().then(function () { done(); })
    });
});

describe('specify host or port', function () {
    var browser2 = webdriverio.remote(options);
    //this assumes you have a selenium running on port 4444 and a proxy running on 9090
    var webmd_proxy2 = require('../../lib/wdio-browser-proxy')(browser2, { host: '127.0.0.1', port: 8080, selHost: '172.28.37.142', selPort: 4444 });

    describe('basic test', function () {
        this.timeout(60000);
        var omnitureData;
        before(function (done) {
            browser2
                .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
                .addBlackList('https://.*doubleclick.net/.*')
                .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
                .url('http://www.webmd.com')
                .end()
                .getNetworkCalls('http://std.o.webmd.com').then(function (result) {
                    omnitureData = result;
                    done();
                });
        });

        it('it should make some calls to omniture', function () {
            omnitureData.length.should.be.above(0);
        });

        it('should make omniture call with the expected prop values', function () {
            //take the last omniture call
            var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
            //check the prop values
            should.exist(propValues.pageName);
            propValues.pageName.should.equal('webmd.com/')
        });

        after(function (done) {
            browser.end().then(function () { done(); })
        });
    });
});

describe('set a redirection for a url', function () {

    this.timeout(60000);
    var browser2 = webdriverio.remote(options);
    //this assumes you have a selenium running on port 4444 and a proxy running on 9090
    var webmd_proxy2 = require('../../lib/wdio-browser-proxy')(browser2, { host: '127.0.0.1', port: 8080, selHost: '172.28.37.142', selPort: 4444 });
    var title = '';

    before(function (done) {
        browser2
            .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            .redirect('http://.*cnn.com/.*', 'http://www.webmd.com')
            .url('http://www.cnn.com')
            .getTitle().then(function (value) {
                title = value;
            })
            .end()
            .then(function () {
                done();
            });
    });

    it('it should redirect to webmd', function () {
        title.should.equal('WebMD - Better information. Better health.');
    });

    after(function (done) {
        browser.end().then(function () { done(); })
    });

});

describe('set whitelist for a url', function () {

    this.timeout(60000);
    var browser2 = webdriverio.remote(options);
    //this assumes you have a selenium running on port 4444 and a proxy running on 9090
    var webmd_proxy2 = require('../../lib/wdio-browser-proxy')(browser2, { host: '127.0.0.1', port: 8080, selHost: '172.28.37.142', selPort: 4444 });
    var callData;

    before(function (done) {
        browser2
            .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            .addWhiteList('http://.*webmd.com/.*')
            .url('http://www.webmd.com')
            .end()
            .getNetworkCalls('http://bcp.crwdcntrl.net').then(function (result) {
                callData = result;
                done();
            });
    });

    it('it not be able to get crwdcntrl call', function () {
        callData.length.should.equal(0);
    });

    after(function (done) {
        browser.end().then(function () { done(); })
    });

});
