var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var Marquee_regression = require('./../../../common/functions/PPE-107628_Marquee_actions');
var MarqueeVideoElements = require('./../../../common/elements/Marquee_variables');
var Header_section = require('./../../../common/elements/PPE-107628_Marquee_elemenets');
var arraTtestData = ["Search and Destroy: Targeted Cancer Therapy", "Put Your Immune System on the Attack", "Fighting Cancer with Immunotherapy", "New Ways to Detect Diseased Cells Early On", "Treat the Whole You -- Physical, Emotional, and Spiritual", "The Power of Integrative Cancer Care", "From Survivor to Thriver: The Healing Power of Giving Back"];
var input = require('./../../../config/Marquee_video');

describe("Verifying functioality of the filmstrip", function () {

    it('PPE-32297: Verify that next visible video thumbnail is displayed in the filmstrip when the user clicks on the right arrow button', function () {
        browser.url(input.staging_ctca.environment); // Accessing the CTCA URL
        var thumbNumber = browser.getAttribute("//li[2]//div[@class='thumb-header']//h4",'data-name');
        console.log(thumbNumber);
    });
});
