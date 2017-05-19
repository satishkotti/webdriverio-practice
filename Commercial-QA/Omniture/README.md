# wdio-browser-proxy

This module allows you to add a proxy for webdriver.io based tests to capture network calls made by the browser during the test

## Getting Started

These instructions will help you install the module into an existing webdriver.io test. Sample code is provided to help you integrate into your code.

### Prerequisites

You must have the following installed on your machine in order for this to work:
* NodeJS
* webdriver.io (v 4.6.2)
* selenium-standalone (IMPORTANT), the latest version of selenium-standalone (6.X) will not work with all browsers
    * Use version 5.11.1(recommended). During initial testing it's noted that firefox version 47 was the supported browser that worked. 5.11.1 will also work with chrome, internet explorer and phantomjs
    * selenium-standalone 6.X now appears to work for chrome and internet explorer ONLY
* browsermob-proxy (https://bmp.lightbody.net/) (v 2.1.4)

You should have selenium-standalone running as well as browsermob-proxy running before executing any tests that use this module

### Installing

in your folder for your test project install this module:

npm install git+ssh://git@stash.portal.webmd.com:7999/conapps/wdio-browser-proxy.git

Sample test.js file
```
//this is integration test that will fire off tests that will use selenium, browsermob and actual browsers
//you will need to start selenium, browsermob before running these tests

var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");
var urls1 = require("./OmnitureModuleCallsRegression_testdata_staging.json");  // test data file
var options = {
    host: '127.0.0.1',
    port: 4444,
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
var browser = webdriverio.remote(options);
//this assumes you have a selenium running on 4444 and a proxy running on 8080
var webmd_proxy = require('../../lib/wdio-browser-proxy')(browser, { selHost: '127.0.0.1', selPort: 4444 });
var qs = require('querystring');
function _Fn(val) {
    describe('basic test', function () {
        var currentUrl1 = val.URL;
        var currentc3 = val.c3value;
        var currentc4 = val.c4value;
        var currentc6 = val.c6value;
        var currentc30 = val.c30value;
        var currentc31 = val.c31value;
        var currentpe = val.pevalue;
        var currentpageName = val.pageNameValue;
        var currentxpath = val.Xpath;
        var currentmpage = val.mpagevalue;
        var currentmmodule = val.mmodulevalue;
        var currentmlink = val.mlinkvalue;
        var currentmtopic = val.mtopicvalue;
        this.timeout(0);
        var omnitureData;
        before(function (done) {
            try {
                browser
                    .enableProxy({})//.then(function () { console.log('finsihed enabling proxy'); })
                    .addBlackList('https://.*doubleclick.net/.*')
                    .url(currentUrl1)
                    .url(currentUrl1)
                    .click(currentxpath)
                    .pause(5000)
                    .end()
                    .getNetworkCalls('http://std.o.webmd.com').then(function (result) {
                        omnitureData = result;
                        done();
                    });
            } catch (error) {
                console.log(error);
            }

        });

        it('it should make some calls to omniture', function () {
            omnitureData.length.should.be.above(0);
        });

        it('should make omniture call with the expected prop values', function () {
            //take the last omniture call
            var propValues = qs.parse(omnitureData[omnitureData.length - 1].request.url);
            console.log(propValues);
            //check the prop values
            should.exist(propValues.pageName);
            if (propValues.mpage && propValues.mmodule && propValues.mtopic) {

                propValues.c3.should.equal(currentc3); // verify c3 value against test data

                propValues.c6.should.equal(currentc6);
                if (propValues.pe) {
                    propValues.pe.should.equal(currentpe);
                }
                propValues.mpage.should.equal(currentmpage);
                propValues.mmodule.should.equal(currentmmodule);

                if (propValues.mlink) {
                    propValues.mlink.should.equal(currentmlink);
                }
                if (propValues.mtopic) {
                    propValues.mtopic.should.equal(currentmtopic);
                }

                if (propValues.c4) {
                    propValues.c4.should.equal(currentc4);
                }
                if (propValues.c30) {
                    propValues.c30.should.equal(currentc30);
                }
                if (propValues.c31) {
                    propValues.c31.should.equal(currentc31);
                }

            }

        });
    });

  
}

for (var i = 0; i < urls1.length; i++) {
    try {
        _Fn(urls1[i]);

    } catch (error) {
        console.log(error);
    }
}

```

End with an example of getting some data out of the system or using it for a little demo

### Changing Host and Port
You can change the host and port where the proxy us running by specifying an options parameter, you can also specify the selenium host and port
```
var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
var browser = webdriverio.remote(options);
var webmd_proxy = require('wdio-browser-proxy')(browser, { host: 'yourhost.com', port: 9090, selHost: 'selenium host', selPort: 4444 });
```

## Running the tests

Execute your tests using mocha command as you would any other mocha test. Again please make sure selenium-standalone is running and browsermob-proxy is running.

The plugin currently does not work using wdio testrunner command (wdio wdio.conf.js). There might be some issues initializing the browser to point to the proxy.

