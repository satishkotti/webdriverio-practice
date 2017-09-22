var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var splashpage = require('./../elements/webmdtvpage');
var videoelements = require('./../elements/webmdtv');
var functions = require('./../functions/functions');
var env = require('./../../gulpfile.js').TestEnv;
var input = require('./../../config/Webmd-tv')[env];
var url = input.stickyvideo;
var videoautofor = {};
var video = {};
var auto = {};
var videopau = {};
var bigvideopau = {};
var webdriverio = require('webdriverio');

module.exports = {
  videounpin: function () {
    browser.reload();
    browser.pause(2000);
    browser.url(url);
    browser.scroll(150, 150);
     browser.scroll(50, 50);
    var videoplays = splashpage.Videoplayer.selector;
    var Videoplay = browser.waitForVisible(splashpage.Videosplaying.selector, 8000);

    browser.pause(8000);
    //when video played is true then we are executing below steps
    if (Videoplay == true) {
    
      var bigvideo = splashpage.bigvideoexist.selector;
      // var bigvideopause = splashpage.headervideopause.selector;
      //browser.moveToObject("//div[contains(@id,'webmd-player')]")
            browser.moveToObject(splashpage.video_toolbar.selector)
             browser.moveToObject(splashpage.video_toolbar.selector)

      browser.pause(3000);
     // browser.click("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-playing']")
     browser.click(splashpage.video_toolbar_pause.selector)
     
      
      browser.pause(1000);
      browser.scroll(100, 100);

      var Ugcmodule = splashpage.Ugcmodule.selector;
      browser.scroll(Ugcmodule, 250, 250);
      browser.pause(6000);
      bigvideopau.videopauseexist = browser.isExisting(splashpage.smallvideoexist.selector);
      console.log("log-" +bigvideopau.videopauseexist );
browser.pause(6000);
      return bigvideopau;

    }

  },

  videopause: function () {
    browser.reload();
    browser.pause(2000);
    browser.url(url);
    var videoplays = splashpage.Videoplayer.selector;
    var Videoplay = browser.waitForVisible(splashpage.Videosplaying.selector, 8000);
    browser.scroll(100, 100);
    browser.pause(1000);
    //when video played is true then we are executing below steps
    if (Videoplay) {
      var bigvideo = splashpage.bigvideoexist.selector;
      var smallvideo = splashpage.smallvideoexist.selector;
      var Ugcmodule = splashpage.Ugcmodule.selector;
      browser.scroll(100, 100);
      if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');
        browser.pause(1000);
      }
      browser.scroll(Ugcmodule, 250, 250);
      browser.waitForVisible(Ugcmodule, 2000);
      browser.pause(3000);
      videopau.smallexist = browser.isExisting(splashpage.smallvideoexist.selector);
      console.log("videopau.smallexist-" + videopau.smallexist);
      if (videopau.smallexist) {
        browser.click(splashpage.headervideoprogress.selector);
        browser.pause(5000);
        videopau.videopauseexist = browser.isExisting(splashpage.headervideopause.selector);
        console.log("videopauseexist-" + videopau.videopauseexist);
        return videopau;
      }
    }

  },

  stickyvideo: function () {
    browser.url(url);
    var videoplays = splashpage.Videoplayer.selector;
    var videoplay = splashpage.video_toolbar_pausebutton.selector;
    browser.waitForVisible(videoplays, 3000);
    browser.pause(1000);
    browser.waitForVisible(videoplay, 4000);
    browser.pause(1000);
    browser.scroll(100, 100);
    browser.scroll(videoplays, 200, 200);

    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    var bigvideo = splashpage.bigvideoexist.selector;
    var smallvideo = splashpage.smallvideoexist.selector;
    var Ugcmodule = splashpage.Ugcmodule.selector;
    var Migranevideologo = splashpage.Migranevideologo.selector;
    browser.scroll(Ugcmodule, 250, 250);
    browser.waitForVisible(Ugcmodule, 2000);
    browser.pause(30000);
    video.smallexist = browser.isExisting(splashpage.smallvideoexist.selector);
    console.log("video small video- " + video.smallexist);
    browser.reload();
    browser.url(url);
    browser.pause(2000);
    if (browser.isExisting('#webmdHoverClose')) {
      browser.click('#webmdHoverClose');
      browser.pause(1000);
    }
    browser.scroll(200, 200);
    video.bigexist = functions.is_Existing(splashpage.bigvideoexist);
    browser.pause(2000);
    console.log("video bigvideo- " + video.bigexist);
    browser.pause(2000);
    return video;

  },

  videoauto: function () {
    browser.reload();
    browser.url(url);
    browser.pause(2000);
    try {
      var video1 = splashpage.Videoplayer.selector;
      if (browser.isExisting('#webmdHoverClose')) {
        browser.click('#webmdHoverClose');
        browser.pause(1000);
      }
      browser.scroll(100, 100);
      var currenturl = browser.getUrl();
      var TimeDurText = browser.getText(splashpage.TimeDurText.selector);
      console.log("TimeDurText- " + TimeDurText);
      browser.pause(4500);
      var TimeCurrText = browser.getText(splashpage.TimeCurrText.selector);
      var currenttitle = browser.getTitle();
      console.log("TimeCurrTex-" + TimeCurrText);
      var Videoplay = browser.waitForVisible(splashpage.Videosplaying.selector, 8000);
      if (Videoplay) {
        browser.pause(43000);
        var nexttitle = browser.getTitle();
        console.log("next title- " + nexttitle);
        console.log("current title- " + currenttitle);
        if (currenttitle != nexttitle) {
          auto.flag = true;
        }
        else {
          auto.flag = false;
        }
        return auto;
      }

    } catch (error) {
      console.log(error);
    }

  },

}