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

    it('PPE-32295: Verify if user clicks on any of the video thumbnails in the film strip, Subsequent selected Video screen loads in the leftmost position in the filmstrip and "NEXT" button on top of it', function () {
        browser.url("http://www.webmd.com/cancer/cutting-edge-16/video-cancer-survivors-robin-roberts");
        var emntcnt = browser.getAttribute("//div[@class='playlist show-5']//li", "href").length; 
        for (var i = 1; i < emntcnt; i++) {
            var randNumber = Math.floor((Math.random() * emntcnt) + 1);
            console.log("initiai " + randNumber);
            for (var j = 1; j <= emntcnt; j++) {
                var vidName = browser.getText("//li[" + randNumber + "]//div[@class='thumb-header']//h4"); 
                if (vidName.length == 0) 
                {
                    //browser.pause(2000);
                    browser.click(Header_section.leftArrow.selector); 
                }
                else {
                    //browser.pause(2000);
                    browser.click("//li[" + randNumber + "]//div[@class='thumb']");
                    browser.pause(2000);
                    break;
                }
            }

            randNumber = randNumber + 1;
            if (randNumber == 8) {
                randNumber = 1;
            }
            for (var j = 1; j <= emntcnt; j++) {

                var vidName = browser.getText("//li[" + randNumber + "]//div[@class='thumb-header']//h4"); 
                if (vidName.length == 0) {
                    //browser.pause(2000);
                    browser.click(Header_section.leftArrow.selector);             
                }
                else {
                    browser.pause(2000);
                    var nextLabel = browser.getText("//div[@class='playlist show-5']//li[" + randNumber + "]//span[@class='next-label']"); 
                    nextLabel.should.equal("NEXT");
                    console.log(randNumber)
                    browser.pause(2000);
                    break;
                }
            }
        }
    });
});