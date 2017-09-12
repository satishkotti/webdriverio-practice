var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var functions = require('./../../../common/functions/Common.actions');
var Commonlocators = require('./../../../common/elements/Common.elements');
var input = require('./../../../config/PPE-118803.testdata')[argv.env];
var url = input.environment;

describe('PPE-118803 - Desktop_970*250 Ad Test w/ Masthead (QA Only)', function ()
 {
    it('Verify top banner 970*250 is adhesive on desktop', function ()
    {
			browser.url(url);
			browser.windowHandleMaximize();
			browser.click(Commonlocators.launchpoupclose.selector);
			browser.pause(10000);
            browser.scroll(Commonlocators.topStories.selector);
			var sticky1 = browser.isVisible(Commonlocators.newTopAd.selector);
            console.log(sticky1);
			sticky1.should.be.equal(true);
			browser.pause(10000);
			browser.scroll(Commonlocators.messageBoards.selector);
			var sticky2 = browser.isVisible(Commonlocators.socialIconsBar.selector);
            console.log(sticky2);
			sticky2.should.be.equal(true);
	});	
});