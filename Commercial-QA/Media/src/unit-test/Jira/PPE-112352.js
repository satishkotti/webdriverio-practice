var chai = require("chai");
var should = chai.should();
var webdriverio = require("webdriverio");
var urls1 = require("./../../main/config/DFPAdcallstestdata");
var urls2 = require("./../../main/config/DFPAdcallstestdata.1");  // test data file
//var ce = require("./../../main/common/elements/Commonelements");
var options = {
    desiredCapabilities: {
        browserName: "chrome" // declare browser name here
    }
};
var browser = webdriverio.remote(options);
var webmd_proxy = require("wdio-browser-proxy")(browser);
var qs = require("querystring");
var urls1 = require("./../../main/config/PPE-112352TaboolaTestData");

var pgsource,currenturl;

function _Fn(val) {
describe('basic test', function () {
    //currenturl = val.URL;
    this.timeout(100000);
        before(function (done) {
        var x = browser.enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
            x.url(val);
       x.pause(5000);
       
        if (x.isVisible("//div[@id='webmdHoverClose']")) {
        x.waitForVisible("//div[@id='webmdHoverClose']", 2000);
        x.click("//div[@id='webmdHoverClose']")
        }
        x.pause(3000)
                .pause(5000)
                .end()
                .getNetworkCalls('https://securepubads.g.doubleclick.net/gampad').then(function (result) {
                    Addata1 = result;
                    console.log(Addata1.length);
                    qs1 = Addata1[0].request.queryString;
                   // console.log(qs1);
                    // console.log(qs1[0].value);
                    done();
                });
        });

    it(" Verify Taboola Code in Page Source ", function () {
        console.log("page source verification");
        //pgsource.includes();
    });
 });
}

for (var i = 0; i < urls1.length; i++) {
    _Fn(urls1[i]);
}

