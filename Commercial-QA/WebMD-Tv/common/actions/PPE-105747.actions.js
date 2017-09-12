var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
//var webmdtvpage = require('./../elements/webmdtvpage');
var webmdtvpage = require('./../elements/webmdtvpage');
var input = require('./../../config/Webmd-tv')[argv.env];
var functions = require('./../functions/functions');
var url = input.adlayout;
var url2 = input.layout;
var adpositions = {};
var video = {};
module.exports = {
  adposition: function () {
    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);

    //adpositions.adpositioned = browser.getLocationInView("//div[@id='otherAd_fmt']//div[@id='ads2-pos-131-rr_ad']");
    adpositions.adpositioned = browser.getLocationInView(webmdtvpage.adlayouts);
    //adpositions.videoposition = browser.getLocationInView("//div[@class='akamai-video akamai-layer']");
    adpositions.videoposition = browser.getLocationInView(webmdtvpage.videoadlayout);

    adpositions.adheight = functions.get_cssValue(webmdtvpage.adlayouts, 'height');
    adpositions.adwidth = functions.get_cssValue(webmdtvpage.adlayouts, 'width');

    adpositions.advideocssProperties = functions.cssProperties(webmdtvpage.videoadlayout);
    adpositions.abouttextcssProperties= functions.cssProperties(webmdtvpage.abouttext);

    adpositions.transcriptcssProperties= functions.cssProperties(webmdtvpage.transcripttext);
    adpositions.twittercssProperties= functions.cssProperties(webmdtvpage.twittertext);

    adpositions.facebookcssProperties= functions.cssProperties(webmdtvpage.facebooktext);
    adpositions.titlecssProperties= functions.cssProperties(webmdtvpage.titletext);

    return adpositions;

  },

  fullvideo: function () {
    browser.url(url2);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);

    video.videocssProperties = functions.cssProperties(webmdtvpage.videoadlayout);
    video.aboutcssProperties = functions.cssProperties(webmdtvpage.abouttext);

    video.transcriptcssProperties = functions.cssProperties(webmdtvpage.transcripttext);
    video.twittercssProperties = functions.cssProperties(webmdtvpage.twittertext);
    
    video.facebookcssProperties = functions.cssProperties(webmdtvpage.facebooktext);
    video.titlecssProperties = functions.cssProperties(webmdtvpage.titletext);

    return video;
  }
}
