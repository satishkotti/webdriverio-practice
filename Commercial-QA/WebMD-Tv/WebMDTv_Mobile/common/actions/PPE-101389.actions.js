var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var marqueeheader = require('./../elements/marqueeheader');
var migrainepage = require('./../elements/Migrainepage');
var input = require('./../../config/Webmd-tv');
var infobarmain = {};



module.exports = {
  infobar: function () {
    marqueeheader.open();
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');

      browser.pause(2000);
      marqueeheader.about.waitForVisible(4000);
      infobarmain.video = marqueeheader.video.getCssProperty('width');
      infobarmain.aboutwidth = marqueeheader.about.getCssProperty('width');
      infobarmain.aboutheight = marqueeheader.about.getCssProperty('height');
      infobarmain.aboutfontsize = marqueeheader.about.getCssProperty('font-size');
      infobarmain.aboutcolor = marqueeheader.about.getCssProperty('color');
      infobarmain.gettitle = migrainepage.inforbartitle.getCssProperty('width');
      infobarmain.gettitleheight = migrainepage.inforbartitle.getCssProperty('height');
      infobarmain.gettitlefontsize = migrainepage.inforbartitle.getCssProperty('font-size');
      infobarmain.gettitlefontfamily = migrainepage.inforbartitle.getCssProperty('font-family');
      infobarmain.gettitlefontcolor = migrainepage.inforbartitle.getCssProperty('color');
      infobarmain.infobartranscriptcolor = marqueeheader.transcript.getCssProperty('color');
      infobarmain.infobartranscriptfont = marqueeheader.transcript.getCssProperty('font-size');
      infobarmain.infobartranscriptfamily = marqueeheader.transcript.getCssProperty('font-family');
      infobarmain.infobartwittercolor = marqueeheader.twitter.getCssProperty('color');
      infobarmain.infobartwitterwidthfont = marqueeheader.twitter.getCssProperty('font-size');
      infobarmain.infobartwitterfamily = marqueeheader.twitter.getCssProperty('font-family');
      infobarmain.infobarfacebookcolor = marqueeheader.facebook.getCssProperty('color');
      infobarmain.infobarfacebookwidthfont = marqueeheader.facebook.getCssProperty('font-size');
      infobarmain.infobarfacebookfamily = marqueeheader.facebook.getCssProperty('font-family');

    } else {
      browser.pause(2000);
      marqueeheader.about.waitForVisible(4000);
      infobarmain.video = marqueeheader.video.getCssProperty('width');
      infobarmain.aboutwidth = marqueeheader.about.getCssProperty('width');
      infobarmain.aboutheight = marqueeheader.about.getCssProperty('height');
      infobarmain.aboutfontsize = marqueeheader.about.getCssProperty('font-size');
      infobarmain.aboutcolor = marqueeheader.about.getCssProperty('color');
      infobarmain.gettitle = migrainepage.inforbartitle.getCssProperty('width');
      infobarmain.gettitleheight = migrainepage.inforbartitle.getCssProperty('height');
      infobarmain.gettitlefontsize = migrainepage.inforbartitle.getCssProperty('font-size');
      infobarmain.gettitlefontfamily = migrainepage.inforbartitle.getCssProperty('font-family');
      infobarmain.gettitlefontcolor = migrainepage.inforbartitle.getCssProperty('color');
      infobarmain.infobartranscriptwidth = marqueeheader.transcript.getCssProperty('width');
      infobarmain.infobartranscriptheight = marqueeheader.transcript.getCssProperty('height');
      infobarmain.infobartranscriptwidthfont = marqueeheader.transcript.getCssProperty('font-size');
      infobarmain.infobartwitterwidth = marqueeheader.twitter.getCssProperty('width');
      infobarmain.infobartwitterheight = marqueeheader.twitter.getCssProperty('height');
      infobarmain.infobartwitterwidthfont = marqueeheader.twitter.getCssProperty('font-size');
      infobarmain.infobarfacebookwidth = marqueeheader.facebook.getCssProperty('width');
      infobarmain.infobarfacebookheight = marqueeheader.facebook.getCssProperty('height');
      infobarmain.infobarfacebookcolor = marqueeheader.facebook.getCssProperty('color');
      infobarmain.infobarfacebookwidthfont = marqueeheader.facebook.getCssProperty('font-size');
    }

    return infobarmain;
  },
  smallvideoheader: function () {

    browser.scroll("//aside[@class='hero']/img");
    var color = marqueeheader.video.getCssProperty('color');
    var smallvideowidth = marqueeheader.video.getCssProperty('width');
    var smallvideoheight = marqueeheader.video.getCssProperty('height');
    var smallvideoaboutwidth = marqueeheader.about.getCssProperty('width');
    var smallvideoaboutheight = marqueeheader.about.getCssProperty('height');
    var smallvideoaboutwidthfont = marqueeheader.about.getCssProperty('font-size');
    var smallvideotitlewidth = marqueeheader.title.getCssProperty('width');
    var smallvideotitleheight = marqueeheader.title.getCssProperty('height');
    var smallvideotitlefontsize = marqueeheader.title.getCssProperty('font-size');
    var smallvideotitlefamily = marqueeheader.title.getCssProperty('font-family');
    var smallvideotitlecolor = marqueeheader.title.getCssProperty('color');
    var smallvideotranscriptwidth = marqueeheader.transcript.getCssProperty('width');
    var smallvideotranscriptheight = marqueeheader.transcript.getCssProperty('height');
    var smallvideotranscriptwidthfont = marqueeheader.transcript.getCssProperty('font-size');
    var smallvideotwitterwidth = marqueeheader.twitter.getCssProperty('width');
    var smallvideotwitterheight = marqueeheader.twitter.getCssProperty('height');
    var smallvideotwitterwidthfont = marqueeheader.twitter.getCssProperty('font-size');
    var smallvideofacebookwidth = marqueeheader.facebook.getCssProperty('width');
    var smallvideofacebookheight = marqueeheader.facebook.getCssProperty('height');
    var smallvideofacebookwidthfont = marqueeheader.facebook.getCssProperty('font-size');
    var smallvideo = {
      smallvideowidth: smallvideowidth,
      smallvideoheight: smallvideoheight,
      smallvideoaboutwidth: smallvideoaboutwidth,
      smallvideoaboutheight: smallvideoaboutheight,
      smallvideotitlefamily: smallvideotitlefamily,
      smallvideotitlefontsize: smallvideotitlefontsize,
      smallvideoaboutwidthfont: smallvideoaboutwidthfont,
      smallvideotitleheight: smallvideotitleheight,
      smallvideotitlecolor: smallvideotitlecolor,
      smallvideotranscriptwidth: smallvideotranscriptwidth,
      smallvideotranscriptheight: smallvideotranscriptheight,
      smallvideotranscriptwidthfont: smallvideotranscriptwidthfont,
      smallvideotwitterwidth: smallvideotwitterwidth,
      smallvideotwitterheight: smallvideotwitterheight,
      smallvideotwitterwidthfont: smallvideotwitterwidthfont,
      smallvideofacebookwidth: smallvideofacebookwidth,
      smallvideofacebookheight: smallvideofacebookheight,
      smallvideofacebookwidthfont: smallvideofacebookwidthfont,
    }
    return smallvideo;
  },
}
