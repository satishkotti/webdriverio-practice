var qs = require('querystring');
var wdio_proxy = require('wdio-browser-proxy')(browser);
console.log(wdio_proxy);
// describe("First Spec", function() {
//     it("should navigate to the WebdriverIO homepage", function(){
//         browser.url("http://webdriver.io/");
//         browser.pause(2000);
//         console.log(browser.getTitle());
//     });
// }) ;

describe('basic test', function () {
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