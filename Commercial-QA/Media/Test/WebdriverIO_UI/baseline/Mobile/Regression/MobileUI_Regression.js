var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/Sample.testdata')[argv.env];
var urls = input.environment;

function _fn(val)
{
describe('Regression Automation - Verify ads on mobile', function ()
 {
	var url = val;
	it('Testcase_12 - Verify top ad', function ()
    {
        browser.url(url);
        browser.pause(15000);
        var topAd = browser.isVisible(Commonlocators.topAd.selector);
        topAd.should.be.equal(true);
    });

    it('Testcase_18 - Verify sponsored ads links', function ()
    {
        browser.url(url);
        browser.pause(15000);
		browser.scroll(0,10000);
        browser.pause(10000);
        browser.frame(Commonlocators.iframe1.selector);
        browser.pause(1000);
        var wrapperDiv = browser.isVisibleWithinViewport(Commonlocators.wrapperDiv.selector);
        wrapperDiv.should.be.equal(true);
        var sponsoredAdsText = browser.getText(Commonlocators.sponsoredAds.selector);
        sponsoredAdsText.should.equal('SPONSORED ADS');
    });

    it('Testcase_12 - Verify bottom ad & PPE-122122 - Mobile_Unable to see ads (2026) on few mobile web pages in qa01 and staging & PPE-120444 - Mobile_Sometimes the Footer ad is not displayed', function ()
    {
        browser.url(url);
        browser.pause(15000);
		browser.scroll(0,3000);
        browser.pause(10000);
        var bottomAd = browser.isExisting(Commonlocators.bottomAd.selector);
        bottomAd.should.be.equal(true);
	});
});
}
for (var i = 0; i < urls.length; i++)
{
    _fn(urls[i]);
}