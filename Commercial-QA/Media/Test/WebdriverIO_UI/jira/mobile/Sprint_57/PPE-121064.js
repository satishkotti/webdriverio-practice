var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-121064.testdata')[argv.env];
var url = input.environment;

describe('PPE-121064 - Update to Waypoint Functionality', function ()
 {
    it('PPE-121851 - Verify page ad visibility', function ()
    {
		for(var i=0;i<url.length;i++)
        {
			browser.url(url[i]);
            console.log("url "+i+": "+url[i]);
			browser.scroll(0,300);
			var pageAdVisible1 = browser.isExisting(Commonlocators.pageAd1.selector);
            console.log(pageAdVisible1);
			pageAdVisible1.should.be.equal(true);
            browser.scroll(Commonlocators.pageAd2.selector);
			var pageAdVisible2 = browser.isExisting(Commonlocators.pageAd2.selector);
			console.log(pageAdVisible2);
			pageAdVisible2.should.be.equal(true);
			var pageAdVisible3 = browser.isExisting(Commonlocators.pageAd2.selector);
            console.log(pageAdVisible3);
			pageAdVisible3.should.be.equal(true);
		}
	});	
});