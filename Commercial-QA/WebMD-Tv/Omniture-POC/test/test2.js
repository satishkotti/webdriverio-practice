var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");
var browser = webdriverio.remote(options);
var webmd_proxy = require('wdio-browser-proxy')(browser);
var qs = require('querystring');

describe('basic test', function () {
    this.timeout(30000);
    var omnitureData;
    before(function (done) {
        browser
            .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            .url('http://www.webmd.com/rx')
            .end()
            .getNetworkCalls('http://std.o.webmd.com').then(function (result) {
                omnitureData = result;
                done();
            });
    });

    it('it should make some calls to omniture', function () {
        omnitureData.length.should.be.above(0);
    });

    it('should make omniture call with the expected prop values', function(){
        //take the last omniture call
        var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
        //check the prop values
        should.exist(propValues.pageName);
        propValues.pageName.should.equal('webmd.com/rx')
    });
});