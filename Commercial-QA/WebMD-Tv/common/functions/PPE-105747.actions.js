var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var argv = require("yargs").argv;
var rootPath = path.normalize(__dirname)
var adlayout = require('./../elements/adlayout');
var marqueeheader = require('./../elements/marqueeheader');
var input = require('./../../config/Webmd-tv')[argv.env];
var functions=require('./../actions/functions');
var url = input.adlayout;
var url2=input.layout;
var adposition={};
var video={};
module.exports = {
  adposition: function () {
    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
      browser.pause(2000);
      adposition.positions = browser.execute(function () {
        return {
          adposition: window.parent.document.getElementById('google_ads_iframe_/8668145/consumer/webmd_0').offsetLeft,
          videoposition: document.getElementsByClassName('akamai-html5 akamai-media-element')[0].offsetLeft
        }
      });
      adposition.adheight=functions.get_cssValue(adlayout.ad,'height');
      adposition.adwidth=functions.get_cssValue(adlayout.ad,'width');
      adposition.advideoheight=functions.get_cssValue(adlayout.video,'height');
      adposition.advideowidth=functions.get_cssValue(adlayout.video,'width');
      adposition.aboutcolor = functions.get_cssValue(marqueeheader.abouttext,'color');
      adposition.aboutfontfamily = functions.get_cssValue(marqueeheader.abouttext,'font-family');
      adposition.aboutfontsize = functions.get_cssValue(marqueeheader.abouttext,'font-size');
      adposition.transcriptcolor = functions.get_cssValue(marqueeheader.transcripttext,'color');
      adposition.transcriptfontfamily = functions.get_cssValue(marqueeheader.transcripttext,'font-family');
      adposition.transcriptwidthfont = functions.get_cssValue(marqueeheader.transcripttext,'font-size');
      adposition.twittercolor = functions.get_cssValue(marqueeheader.twittertext,'color');
      adposition.twitterfontfamily = functions.get_cssValue(marqueeheader.twittertext,'font-family');
      adposition.twitterwidthfont = functions.get_cssValue(marqueeheader.twittertext,'font-size');
      adposition.facebookfontfamily = functions.get_cssValue(marqueeheader.facebooktext,'font-family');
      adposition.facebookcolor = functions.get_cssValue(marqueeheader.facebooktext,'color');
      adposition.facebookwidthfont = functions.get_cssValue(marqueeheader.facebooktext,'font-size');
      adposition.titlefont = functions.get_cssValue(marqueeheader.titletext,'font-size');
      adposition.titlefontfamily = functions.get_cssValue(marqueeheader.titletext,'font-family');
      adposition.titlecolor = functions.get_cssValue(marqueeheader.titletext,'color');
    /*var adposition = {
      positions: positions,
      adwidth:adwidth,
      adheight:adheight,
      advideoheight:advideoheight,
      advideowidth:advideowidth
    }*/
    return adposition;

  },

  fullvideo:function(){
browser.url(url2);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.pause(1000);
      browser.click('#webmdHoverClose');
    }
      browser.pause(2000);
      video.videoheight=adlayout.video.getCssProperty('height');
      video.videowidth=adlayout.video.getCssProperty('width');
      video.aboutcolor = functions.get_cssValue(marqueeheader.abouttext,'color');
      video.aboutfontfamily = functions.get_cssValue(marqueeheader.abouttext,'font-family');
      video.aboutfontsize = functions.get_cssValue(marqueeheader.abouttext,'font-size');
      video.transcriptcolor = functions.get_cssValue(marqueeheader.transcripttext,'color');
      video.transcriptfontfamily = functions.get_cssValue(marqueeheader.transcripttext,'font-family');
      video.transcriptwidthfont = functions.get_cssValue(marqueeheader.transcripttext,'font-size');
      video.twittercolor = functions.get_cssValue(marqueeheader.twittertext,'color');
      video.twitterfontfamily = functions.get_cssValue(marqueeheader.twittertext,'font-family');
      video.twitterwidthfont = functions.get_cssValue(marqueeheader.twittertext,'font-size');
      video.facebookfontfamily = functions.get_cssValue(marqueeheader.facebooktext,'font-family');
      video.facebookcolor = functions.get_cssValue(marqueeheader.facebooktext,'color');
      video.facebookwidthfont = functions.get_cssValue(marqueeheader.facebooktext,'font-size');
      video.titlefont = functions.get_cssValue(marqueeheader.titletext,'font-size');
      video.titlefontfamily = functions.get_cssValue(marqueeheader.titletext,'font-family');
      video.titlecolor = functions.get_cssValue(marqueeheader.titletext,'color');

return video;
}
}
