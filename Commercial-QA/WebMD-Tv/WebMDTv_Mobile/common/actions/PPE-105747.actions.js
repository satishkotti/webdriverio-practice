var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var argv = require("yargs").argv;
var rootPath = path.normalize(__dirname)
var adlayout = require('./../elements/adlayout');
var PlayerOptions = require('./../elements/WebMDtv');
var input = require('./../../config/Webmd-tv')[argv.env];
var functions=require('./../actions/functions');
var url2=input.layout;
var video={};
module.exports = {
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
      video.aboutcolor = functions.get_cssValue(PlayerOptions.abouttext,'color');
      video.aboutfontfamily = functions.get_cssValue(PlayerOptions.abouttext,'font-family');
      video.aboutfontsize = functions.get_cssValue(PlayerOptions.abouttext,'font-size');
      video.transcriptcolor = functions.get_cssValue(PlayerOptions.transcripttext,'color');
      video.transcriptfontfamily = functions.get_cssValue(PlayerOptions.transcripttext,'font-family');
      video.transcriptwidthfont = functions.get_cssValue(PlayerOptions.transcripttext,'font-size');
      video.twitterwidth = functions.get_cssValue(PlayerOptions.twitter,'width');
      video.twitterheight = functions.get_cssValue(PlayerOptions.twitter,'height');
      video.facebookwidth = functions.get_cssValue(PlayerOptions.facebook,'width');
      video.facebookheight = functions.get_cssValue(PlayerOptions.facebook,'height');
      video.titlefont = functions.get_cssValue(PlayerOptions.titletext,'font-size');
      video.titlefontfamily = functions.get_cssValue(PlayerOptions.titletext,'font-family');
      video.titlecolor = functions.get_cssValue(PlayerOptions.titletext,'color');
      video.titlewidth = functions.get_cssValue(PlayerOptions.titletext,'width');
      video.titleheight = functions.get_cssValue(PlayerOptions.titletext,'height');

return video;
}
}
