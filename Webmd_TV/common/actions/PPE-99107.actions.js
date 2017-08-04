var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var webmdtvpage = require('./../elements/webmdtvpage');
var functions = require('./../functions/functions');
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.article;
var largevideo = {};
var smallvideo = {};


module.exports = {
  largevideoheader: function () {
    //webmdtvpage.open();
    //webmdtvpage.open(url);
    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      //browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
    browser.pause(2000);
    webmdtvpage.about.waitForVisible(4000);
    largevideo.color = functions.get_cssValue(webmdtvpage.video, 'color');
    largevideo.largevideowidth = functions.get_cssValue(webmdtvpage.video, 'width');
    largevideo.largevideoheight = functions.get_cssValue(webmdtvpage.video, 'height');
    largevideo.largevideoaboutwidth = functions.get_cssValue(webmdtvpage.about, 'width');
    largevideo.largevideoaboutheight = functions.get_cssValue(webmdtvpage.about, 'height');
    largevideo.largevideoaboutwidthfont = functions.get_cssValue(webmdtvpage.about, 'font-size');
    largevideo.largevideotitlewidth = functions.get_cssValue(webmdtvpage.title, 'width');
    largevideo.largevideotitleheight = functions.get_cssValue(webmdtvpage.title, 'height');
    largevideo.largevideotitlefontsize = functions.get_cssValue(webmdtvpage.title, 'font-size');
    largevideo.largevideotitlefamily = functions.get_cssValue(webmdtvpage.title, 'font-family');
    largevideo.largevideotitlecolor = functions.get_cssValue(webmdtvpage.title, 'color');
    largevideo.largevideotranscriptwidth = functions.get_cssValue(webmdtvpage.transcript, 'width');
    largevideo.largevideotranscriptheight = functions.get_cssValue(webmdtvpage.transcript, 'height');
    largevideo.largevideotranscriptwidthfont = functions.get_cssValue(webmdtvpage.transcript, 'font-size');
    largevideo.largevideotwitterwidth = functions.get_cssValue(webmdtvpage.twitter, 'width');
    largevideo.largevideotwitterheight = functions.get_cssValue(webmdtvpage.twitter, 'height');
    largevideo.largevideotwitterwidthfont = functions.get_cssValue(webmdtvpage.twitter, 'font-size');
    largevideo.largevideofacebookwidth = functions.get_cssValue(webmdtvpage.facebook, 'width');
    largevideo.largevideofacebookheight = functions.get_cssValue(webmdtvpage.facebook, 'height');
    largevideo.largevideofacebookwidthfont = functions.get_cssValue(webmdtvpage.facebook, 'font-size');
    webmdtvpage.play.click();
    largevideo.pause = functions.is_Existing(webmdtvpage.pause);
    webmdtvpage.pause.click();
    largevideo.play = functions.is_Existing(webmdtvpage.play);
    return largevideo;
  },
  smallvideoheader: function () {

    browser.scroll("//aside[@class='hero']/img");
    browser.pause(2000);
    smallvideo.color = functions.get_cssValue(webmdtvpage.video, 'color');
    smallvideo.smallvideowidth = functions.get_cssValue(webmdtvpage.video, 'width');
    smallvideo.smallvideoheight = functions.get_cssValue(webmdtvpage.video, 'height');
    smallvideo.smallvideoaboutwidth = functions.get_cssValue(webmdtvpage.about, 'width');
    smallvideo.smallvideoaboutheight = functions.get_cssValue(webmdtvpage.about, 'height');
    smallvideo.smallvideoaboutwidthfont = functions.get_cssValue(webmdtvpage.about, 'font-size');
    smallvideo.smallvideotitlewidth = functions.get_cssValue(webmdtvpage.title, 'width');
    smallvideo.smallvideotitleheight = functions.get_cssValue(webmdtvpage.title, 'height');
    smallvideo.smallvideotitlefontsize = functions.get_cssValue(webmdtvpage.title, 'font-size');
    smallvideo.smallvideotitlefamily = functions.get_cssValue(webmdtvpage.title, 'font-family');
    smallvideo.smallvideotitlecolor = functions.get_cssValue(webmdtvpage.title, 'color');
    smallvideo.smallvideotranscriptwidth = functions.get_cssValue(webmdtvpage.transcript, 'width');
    smallvideo.smallvideotranscriptheight = functions.get_cssValue(webmdtvpage.transcript, 'height');
    smallvideo.smallvideotranscriptwidthfont = functions.get_cssValue(webmdtvpage.transcript, 'font-size');
    smallvideo.smallvideotwitterwidth = functions.get_cssValue(webmdtvpage.twitter, 'width');
    smallvideo.smallvideotwitterheight = functions.get_cssValue(webmdtvpage.twitter, 'height');
    smallvideo.smallvideotwitterwidthfont = functions.get_cssValue(webmdtvpage.twitter, 'font-size');
    smallvideo.smallvideofacebookwidth = functions.get_cssValue(webmdtvpage.facebook, 'width');
    smallvideo.smallvideofacebookheight = functions.get_cssValue(webmdtvpage.facebook, 'height');
    smallvideo.smallvideofacebookwidthfont = functions.get_cssValue(webmdtvpage.facebook, 'font-size');
    smallvideo.nowplayingfontsize = functions.get_cssValue(webmdtvpage.nowplaying, 'font-size');
    smallvideo.nowplayingfontcolor = functions.get_cssValue(webmdtvpage.nowplaying, 'color');
    smallvideo.nowplayingfontfamily = functions.get_cssValue(webmdtvpage.nowplaying, 'font-family');
    browser.pause(9000);
    smallvideo.progress = webmdtvpage.smallvideoplay.getCssProperty('width');
    webmdtvpage.smallvideonowplaying.moveToObject();
    webmdtvpage.smallvideonowplaying.click();
    browser.pause(4000);
    webmdtvpage.videonowplaying.moveToObject();
    webmdtvpage.videonowplaying.click();
    browser.pause(4000);
    smallvideo.progressplay = webmdtvpage.smallvideoplay.getCssProperty('width');

    if (smallvideo.progress.parsed.value < smallvideo.progressplay.parsed.value) {
      smallvideo.result = true;
    } else {
      smallvideo.result = false;
    }
    browser.click("//div[@id='logo']//img[@class='wmd-white-logo']");
    smallvideo.webmdurl = browser.getUrl();
    return smallvideo;
  },
}
