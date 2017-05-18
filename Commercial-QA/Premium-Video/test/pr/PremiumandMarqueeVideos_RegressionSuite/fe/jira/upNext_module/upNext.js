var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe('Verify the “Up Next” module appears at the right place (right rail of the page and only on desktop and iPads)', function () {

    it('Verify the “Up Next” module appears at the right place (right rail of the page and only on desktop and iPads)', function () {
        browser.url(input.staging_Marquee_video_player.environment);
        upNextContainerVisibility = pvActions.Verify_element_exist(pvElements.upNextContainer.selector);
        upNextContainerVisibility.should.equal(true);
    });

    it('Verify the “Up Next” module appears at the right place (right rail of the page and only on desktop and iPads)', function () {
        var linksCount = browser.elements(pvElements.upNextContainerLinks.selector);
        for (i = 0; i < linksCount.value.length; i++) {
            browser.click("//div[@class='wbmd-nav-links']/div[1]");
            var titleExist = browser.isExisting("//header[@class='page-header']//h1");
            titleExist.should.equal(true);
            browser.pause(2000);
        }
    });
});