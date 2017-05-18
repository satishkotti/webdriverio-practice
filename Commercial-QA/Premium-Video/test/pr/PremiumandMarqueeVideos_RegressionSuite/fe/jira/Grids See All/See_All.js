var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe('Verify the "See All" link is present at Asset Grids which link to the See All page.', function () {

    it('PPE-35310: Verify that "See All" links appears top right corner of the grids', function () {
        browser.url(input.staging_ctca.environment);
        browser.scroll(0, 500);
        browser.pause(2000);
        pvActions.popUpDisplay();
        //pvActions.popUpDisplay();
        var grid8ContentSeeAllvisibility = pvActions.Verify_element_exist(pvElements.grid8ContentSeeAll.selector);
        grid8ContentSeeAllvisibility.should.equal(true);
        browser.scroll(0, 500);
        var grid8ContentSeeAllvisibility = pvActions.Verify_element_exist(pvElements.grid7ContentSeeAll.selector);
        grid8ContentSeeAllvisibility.should.equal(true);
    });

    it('PPE-32294: Verify that user is navigated to "See All" page upon clicking the "See All" links appears top right corner of the grids', function () {
        pvActions.element_click(pvElements.grid8ContentSeeAll.selector);
        pvActions.popUpDisplay();
        var geturl = browser.getUrl();
        pvActions.popUpDisplay();
        geturl.should.equal("http://www.staging.webmd.com/cancer/cutting-edge-16/index");
        pvActions.element_click(pvElements.ctcaDestinationLink.selector);
        pvActions.popUpDisplay();
        browser.scroll(0, 1500);
        browser.pause(2000);
        pvActions.element_click(pvElements.grid7ContentSeeAll.selector);
        pvActions.popUpDisplay();
        browser.pause(2000);
        var geturl = browser.getUrl();
        geturl.should.equal("http://www.staging.webmd.com/cancer/cutting-edge-16/index");
    });

});