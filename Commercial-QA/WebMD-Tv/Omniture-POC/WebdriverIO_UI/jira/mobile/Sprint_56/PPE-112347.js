var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-112347.testdata')[argv.env];
var url = input.environment;

describe('PPE-112347', function ()
 {
    it('Verify top banner is adhesive on mobile', function ()
    {
		for(var i=0;i<url.length;i++)
        {
			browser.url(url[i]);
            console.log("url "+i+": "+url[i]);
			browser.scroll(0,100);
			var sticky1 = browser.isVisibleWithinViewport(Commonlocators.topAd.selector)
            console.log(sticky1);
			sticky1.should.be.equal(true);
			browser.scroll(0,1000);
			var sticky2 = browser.isVisibleWithinViewport(Commonlocators.topAd.selector)
            console.log(sticky2);
			sticky2.should.be.equal(false);
		}
	});	
});