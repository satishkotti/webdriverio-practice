var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var webmdtvpage = require('./../elements/webmdtvpage');
//var webmdtvpage = require('./../elements/webmdtvpage');
var input = require('./../../config/Webmd-tv');
var infobarmain = {};
var smallvideo={};



module.exports = {
  infobar: function () {
    //webmdtvpage.open();
    browser.url("http://www.staging.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts")
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      //browser.scroll("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']");
      //browser.scroll(0,20);
      browser.pause(2000);
      webmdtvpage.about.waitForVisible(4000);
      infobarmain.video = webmdtvpage.video.getCssProperty('width');
      infobarmain.aboutwidth = webmdtvpage.about.getCssProperty('width');
      infobarmain.aboutheight = webmdtvpage.about.getCssProperty('height');
      infobarmain.aboutfontsize = webmdtvpage.about.getCssProperty('font-size');
      infobarmain.aboutcolor = webmdtvpage.about.getCssProperty('color');
      infobarmain.gettitle = webmdtvpage.inforbartitle.getCssProperty('width');
      infobarmain.gettitleheight = webmdtvpage.inforbartitle.getCssProperty('height');
      infobarmain.gettitlefontsize = webmdtvpage.inforbartitle.getCssProperty('font-size');
      infobarmain.gettitlefontfamily = webmdtvpage.inforbartitle.getCssProperty('font-family');
      infobarmain.gettitlefontcolor = webmdtvpage.inforbartitle.getCssProperty('color');
      infobarmain.infobartranscriptcolor = webmdtvpage.transcript.getCssProperty('color');
      infobarmain.infobartranscriptfont = webmdtvpage.transcript.getCssProperty('font-size');
      infobarmain.infobartranscriptfamily = webmdtvpage.transcript.getCssProperty('font-family');
      infobarmain.infobartwittercolor = webmdtvpage.twitter.getCssProperty('color');
      infobarmain.infobartwitterwidthfont = webmdtvpage.twitter.getCssProperty('font-size');
      infobarmain.infobartwitterfamily = webmdtvpage.twitter.getCssProperty('font-family');
      infobarmain.infobarfacebookcolor = webmdtvpage.facebook.getCssProperty('color');
      infobarmain.infobarfacebookwidthfont = webmdtvpage.facebook.getCssProperty('font-size');
      infobarmain.infobarfacebookfamily = webmdtvpage.facebook.getCssProperty('font-family');

    } 
   
    return infobarmain;
  },
  smallvideoheader: function () {
    //webmdtvpage.open();
    browser.url('http://www.staging.webmd.com/zztest/webmd-tv/video-early-cancer-detection-robin-roberts');
    browser.pause(2000);
    browser.scroll("//aside[@class='hero']/img");
    smallvideo.color = webmdtvpage.video.getCssProperty('color');
    smallvideo.smallvideowidth = webmdtvpage.video.getCssProperty('width');
    smallvideo.smallvideoheight = webmdtvpage.video.getCssProperty('height');
    smallvideo.smallvideoaboutwidth = webmdtvpage.about.getCssProperty('width');
    smallvideo.smallvideoaboutheight = webmdtvpage.about.getCssProperty('height');
    smallvideo.smallvideoaboutwidthfont = webmdtvpage.about.getCssProperty('font-size');
    smallvideo.smallvideotitlewidth = webmdtvpage.title.getCssProperty('width');
    smallvideo.smallvideotitleheight = webmdtvpage.title.getCssProperty('height');
    smallvideo.smallvideotitlefontsize = webmdtvpage.title.getCssProperty('font-size');
    smallvideo.smallvideotitlefamily = webmdtvpage.title.getCssProperty('font-family');
    smallvideo.smallvideotitlecolor = webmdtvpage.title.getCssProperty('color');
    smallvideo.smallvideotranscriptwidth = webmdtvpage.transcript.getCssProperty('width');
    smallvideo.smallvideotranscriptheight = webmdtvpage.transcript.getCssProperty('height');
    smallvideo.smallvideotranscriptwidthfont = webmdtvpage.transcript.getCssProperty('font-size');
    smallvideo.smallvideotwitterwidth = webmdtvpage.twitter.getCssProperty('width');
    smallvideo.smallvideotwitterheight = webmdtvpage.twitter.getCssProperty('height');
    smallvideo. smallvideotwitterwidthfont = webmdtvpage.twitter.getCssProperty('font-size');
    smallvideo.smallvideofacebookwidth = webmdtvpage.facebook.getCssProperty('width');
    smallvideo.smallvideofacebookheight = webmdtvpage.facebook.getCssProperty('height');
    smallvideo.smallvideofacebookwidthfont = webmdtvpage.facebook.getCssProperty('font-size');
   
    return smallvideo;
  },
}
