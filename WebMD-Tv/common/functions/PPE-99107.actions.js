var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var marqueeheader = require('./../elements/marqueeheader');
var functions=require('./../actions/functions');
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.article;
var largevideo={};
var smallvideo={};


module.exports = {
  largevideoheader: function () {
    //marqueeheader.open();
    //marqueeheader.open(url);
    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      //browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
      browser.pause(2000);
      marqueeheader.about.waitForVisible(4000);
      largevideo.color = functions.get_cssValue(marqueeheader.video,'color');
      largevideo.largevideowidth = functions.get_cssValue(marqueeheader.video,'width');
      largevideo.largevideoheight = functions.get_cssValue(marqueeheader.video,'height');
      largevideo.largevideoaboutwidth = functions.get_cssValue(marqueeheader.about,'width');
      largevideo.largevideoaboutheight = functions.get_cssValue(marqueeheader.about,'height');
      largevideo.largevideoaboutwidthfont = functions.get_cssValue(marqueeheader.about,'font-size');
      largevideo.largevideotitlewidth = functions.get_cssValue(marqueeheader.title,'width');
      largevideo.largevideotitleheight = functions.get_cssValue(marqueeheader.title,'height');
      largevideo.largevideotitlefontsize = functions.get_cssValue(marqueeheader.title,'font-size');
      largevideo.largevideotitlefamily = functions.get_cssValue(marqueeheader.title,'font-family');
      largevideo.largevideotitlecolor = functions.get_cssValue(marqueeheader.title,'color');
      largevideo.largevideotranscriptwidth = functions.get_cssValue(marqueeheader.transcript,'width');
      largevideo.largevideotranscriptheight = functions.get_cssValue(marqueeheader.transcript,'height');
      largevideo.largevideotranscriptwidthfont = functions.get_cssValue(marqueeheader.transcript,'font-size');
      largevideo.largevideotwitterwidth = functions.get_cssValue(marqueeheader.twitter,'width');
      largevideo.largevideotwitterheight = functions.get_cssValue(marqueeheader.twitter,'height');
      largevideo.largevideotwitterwidthfont = functions.get_cssValue(marqueeheader.twitter,'font-size');
      largevideo.largevideofacebookwidth = functions.get_cssValue(marqueeheader.facebook,'width');
      largevideo.largevideofacebookheight = functions.get_cssValue(marqueeheader.facebook,'height');
      largevideo.largevideofacebookwidthfont = functions.get_cssValue(marqueeheader.facebook,'font-size');
marqueeheader.play.click();
largevideo.pause=functions.is_Existing(marqueeheader.pause);
marqueeheader.pause.click();
largevideo.play=functions.is_Existing(marqueeheader.play);
    return largevideo;
  },
  smallvideoheader: function () {

    browser.scroll("//aside[@class='hero']/img");
    browser.pause(2000);
    smallvideo.color = functions.get_cssValue(marqueeheader.video,'color');
    smallvideo.smallvideowidth = functions.get_cssValue(marqueeheader.video,'width');
    smallvideo.smallvideoheight = functions.get_cssValue(marqueeheader.video,'height');
    smallvideo.smallvideoaboutwidth = functions.get_cssValue(marqueeheader.about,'width');
    smallvideo.smallvideoaboutheight = functions.get_cssValue(marqueeheader.about,'height');
    smallvideo.smallvideoaboutwidthfont = functions.get_cssValue(marqueeheader.about,'font-size');
    smallvideo.smallvideotitlewidth = functions.get_cssValue(marqueeheader.title,'width');
    smallvideo.smallvideotitleheight = functions.get_cssValue(marqueeheader.title,'height');
    smallvideo.smallvideotitlefontsize = functions.get_cssValue(marqueeheader.title,'font-size');
    smallvideo.smallvideotitlefamily = functions.get_cssValue(marqueeheader.title,'font-family');
    smallvideo.smallvideotitlecolor = functions.get_cssValue(marqueeheader.title,'color');
    smallvideo.smallvideotranscriptwidth = functions.get_cssValue(marqueeheader.transcript,'width');
    smallvideo.smallvideotranscriptheight = functions.get_cssValue(marqueeheader.transcript,'height');
    smallvideo.smallvideotranscriptwidthfont = functions.get_cssValue(marqueeheader.transcript,'font-size');
    smallvideo.smallvideotwitterwidth = functions.get_cssValue(marqueeheader.twitter,'width');
    smallvideo.smallvideotwitterheight = functions.get_cssValue(marqueeheader.twitter,'height');
    smallvideo.smallvideotwitterwidthfont = functions.get_cssValue(marqueeheader.twitter,'font-size');
    smallvideo.smallvideofacebookwidth = functions.get_cssValue(marqueeheader.facebook,'width');
    smallvideo.smallvideofacebookheight = functions.get_cssValue(marqueeheader.facebook,'height');
    smallvideo.smallvideofacebookwidthfont = functions.get_cssValue(marqueeheader.facebook,'font-size');
    smallvideo.nowplayingfontsize=functions.get_cssValue(marqueeheader.nowplaying,'font-size');
    smallvideo.nowplayingfontcolor=functions.get_cssValue(marqueeheader.nowplaying,'color');
    smallvideo.nowplayingfontfamily=functions.get_cssValue(marqueeheader.nowplaying,'font-family');
    browser.pause(9000);
    smallvideo.progress=marqueeheader.smallvideoplay.getCssProperty('width');
    marqueeheader.smallvideonowplaying.moveToObject();
    marqueeheader.smallvideonowplaying.click();
    browser.pause(4000);
    marqueeheader.videonowplaying.moveToObject();
    marqueeheader.videonowplaying.click();
    browser.pause(4000);
    smallvideo.progressplay=marqueeheader.smallvideoplay.getCssProperty('width');

    if(smallvideo.progress.parsed.value<smallvideo.progressplay.parsed.value)
    {
      smallvideo.result=true;
    }else{
      smallvideo.result=false;
    }
browser.click("//div[@id='logo']//img[@class='wmd-white-logo']");
smallvideo.webmdurl=browser.getUrl();
    return smallvideo;
  },
}
