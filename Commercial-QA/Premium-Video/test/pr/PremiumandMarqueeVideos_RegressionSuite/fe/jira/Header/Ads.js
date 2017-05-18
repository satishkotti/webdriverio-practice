var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
//var Marquee_regression = require('./../../../common/functions/PPE-107628_Marquee_actions');
//var Header_section = require('./../../../common/elements/PPE-107628_Marquee_elemenets');
//var input = require('./../../../config/Marquee_video');

describe('Verify the headers in the Premium Video Page destination is sticky', function () {

    it('PPE-35316: Verify the headers in the Premium Video Page destination are sticky', function () {
        //browser.url(input.staging_ctca.environment);
        browser.url("http://www.webmd.com/cancer/cutting-edge-16/cancer-stem-cell-treatment");
        browser.scroll(0,1000);
        //var baseIFrame = browser.getAttribute('#bannerAd_fmt iframe', 'id');
        var baseIFrame = browser.getAttribute('#rightAd_fmt iframe', 'id');
        //browser.frame("//div[contains(@id,'ads2-pos-101')]//iframe");
        browser.frame(baseIFrame);
        //browser.frame("//html//body//div//iframe");
        //var val = browser.getAttribute("//div[contains(@id,'ads2-pos-101')]//iframe//html//body//div//iframe","src");
        //console.log(val);

        //console.log(browser.getAttribut""e("//div[contains(@id,'ebDiv')]//img", 'src'));
        console.log(browser.getAttribute("//div[contains(@id,'DfaVisibilityIdentifier')]//iframe", "src"));
    });
})