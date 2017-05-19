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
var chai = require('chai');
var should = chai.should();
var webdriverio = require("webdriverio");
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
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

