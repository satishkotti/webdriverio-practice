var webdriverio = require("webdriverio");
var options = {
      host: '172.28.37.142',
    // host: '172.25.18.106',
    //host: '127.0.0.1',
    port: 4444,
    desiredCapabilities: {
        browserName: 'chrome'
    },
    maxInstances: 1,

};
global.browser = webdriverio.remote(options);
console.log(browser);
var webmd_proxy = require('wdio-browser-proxy')(browser, {
     host: '172.28.37.142',
    // host: '127.0.0.1',
    port: 8080,
     host: '172.28.37.142',
     //host: '127.0.0.1',
    selPort: 4444
});

global.browser.addCommand('waitForUrl', function (value, timeout) {
    return this.waitUntil(function () {
        return this.url((error, result) => {
            return result.value === value;
        });
    }, timeout);
});
global.browser.setViewportSize({
    width: 1600,
    height: 768
});



var chai = require('chai');
chai.config.includeStack = true;
expect = chai.expect;
AssertionError = chai.AssertionError;
Assertion = chai.Assertion;
assert = chai.assert;
should = chai.should();
_ = require('lodash');

global.env = process.env.env;
global.testenv = process.env.testenv;
global.samplesize = 10;
global.prodenv = "http://www.webmd.com";


getbrowserwithblacklist = function () {
    return browser.enableProxy({})
        .addBlackList('https://.*doubleclick.net/.*')
        .addBlackList('http://.*doubleclick.net/.*')
        .addBlackList('http://img.webmd.com/pixel/.*')
        .addBlackList('http://img.preview.webmd.com/pixel/.*')
        .addBlackList('http://img.staging.webmd.com/pixel/.*')
        .addBlackList("http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/.*")
        .addBlackList("http://img.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/articles/health_tools/.*")
        .addBlackList("http://img.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/articles/health_tools/.*")
        .addBlackList('http://img.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/layout/shared/tag-registered.png.*')
        .addBlackList('http://img.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/layout/shared/tag-registered.png.*')
        .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/layout/shared/tag-registered.png.*')
        .addBlackList('http://fast.webmd.demdex.net/.*')
        .addBlackList('http://contextual.media.net/.*').addBlackList('http://.*.media.net/.*')
        .addBlackList('http://qsearch.media.net/log.*')
        .addBlackList('http://img.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
        .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
        .addBlackList('http://img.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/amd_modules/newsletter.*')
        .addBlackList('https://token.rubiconproject.com/token.*')
        .addBlackList('http://ads.yahoo.com/.*')
        .addBlackList('https://secure.insightexpressai.com/.*')
        .addBlackList('http://s.mnet-ad.net/.*')
        .addBlackList('http://www.webmd.com/api/directories/Service.svc/.*')
        .addBlackList('http://www.dev02.webmd.com/api/directories/Service.svc/.*')
        .addBlackList('http://img.medscapestatic.com/pi/features/drugdirectory/.*')
        .addBlackList('http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://css.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/fonts/.*')
        .addBlackList('http://css.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://img.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://img.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://css.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/fonts/.*')
        .addBlackList('http://css.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/fonts/.*')
        .addBlackList('http://css.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://css.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://img.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://img.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://css.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/fonts/.*')
        .addBlackList('http://css.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/fonts/.*')
        .addBlackList('http://css.preview.webmd.com/dtmcms/preview/webmd/consumer_assets/site_images/.*')
        .addBlackList('http://css.staging.webmd.com/dtmcms/staging/webmd/consumer_assets/site_images/.*')
        .addBlackList('https:.*')
        .addBlackList('https://.*newsletter*').windowHandleMaximize()
}

console.log('done with bootstrapping.');