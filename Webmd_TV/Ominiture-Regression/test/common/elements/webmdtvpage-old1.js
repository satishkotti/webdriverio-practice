var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
//var Page = require('./../../../PremiumandMarqueeVideos_RegressionSuite/page');
var Page = require('./../../page');
//var input = require('./../../config/videotestdata');
var url = global.environment;
var browser = require('./../../common/browser');
module.exports = {
    /**
     * define elements
     */
   
    //Splash Header locators

    sponsortextlabel: { get: function () { return browser.element("//section[@id='s1']//span[@class='sponsored']"); } },
    Videolabel: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/div[@class='overlay']/p/span[1]"); } },
    Webmdlogohome: { get: function () { return browser.element("//section[@id='s1']//img[@class='wmd-white-logo']"); } },
    Migranelogo: { get: function () { return browser.element("//section[@id='s1']//span[@class='emp']"); } },
    Webmdhome: { get: function () { return browser.element("//div[@class='masthead-stretch']//img[@class='wmd-white-logo']"); } },
   
    Migranevideologo: { get: function () { return browser.element("//div[@class='masthead-stretch']//span[@class='emp']"); } },
    
     Webmdhomelogo: { get: function () { return browser.element("//div[@class='splashhead-wrapper clearfix']//img[@class='wmd-white-logo']"); } },
    
    Splashpgheader: { get: function () { return browser.element("//div[@class='masthead-wrapper clearfix']"); } },
    Splashpgwatchnowvd: { get: function () { return browser.element("//div[@id='multimedia-grid']/div/div[1]/a/div/div"); } },
        //Splash page elements
     Videoplayer: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
     Videosponsor: { get: function () { return browser.element("//div[@class='masthead-right clearfix sponsor-info']/div[@class='sponsor-logo']/div[@class='marquee_ed_disclaimer']"); } },
    Videomasterhead: { get: function () { return browser.element("//div[@class='masthead-stretch']//div[@class='masthead-wrapper clearfix']"); } },
    Filmstrip: { get: function () { return browser.element("//div[@id='webmd-tv-playlists']"); } },
    Ugcmodule: { get: function () { return browser.element("//*[@id='ugc-widget']/div[1]/div"); } },
    Assetgrid: { get: function () { return browser.element("//div[@class='list-container']"); } },
    Surveyclose: { get: function () { return browser.element("//div[contains(@onclick,'sw(1);')]"); } },
    Videotime: { get: function () { return browser.element("//div[@class='vjs-current-time-display']"); } },
    Videoplayprogress: { get: function () { return browser.element("//div[@class='vjs-play-progress']"); } },
    Videoprogresshandle: { get: function () { return browser.element("//div[@class='vjs-seek-handle']"); } },

    video_toolbar: { get: function () { return browser.element("//div[@class='dyn-controlbar']"); } },
    webmdplayer: { get: function () { return browser.element("//div[@id='webmd-player-908']/div[@class='akamai-video akamai-layer']"); } }, // video player availability
   


////div[@id='webmd-player-908']/div[@class='akamai-video akamai-layer']/video
    Videoplaying: { get: function () { return browser.element("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-playing']"); } },
    Videopause: { get: function () { return browser.element("//div [@class='dyn-controlbar']/div[@class='vjs-play-control vjs-control vjs-paused']"); } },

     Videoplplaying:"//div[contains(@class,'akamai-playing') and not(contains(@class,'akamai-ad-mode')) and not(contains(@class,'akamai-pause'))]", // Locator for video playing 
Videoplpause:"//div[contains(@class,'akamai-paused') and not(contains(@class,'akamai-ad-mode')) and not(contains(@class,'akamai-playing'))]", // Locator for video pause 
    Videocard: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/div[@class='overlay']"); } },
    Videocardimg: { get: function () { return browser.element("//div[@class='multimedia-grid']/div[@class='item-duo-wrapper']/div[1]/a/img"); } },

    Filmstripplaybtn: { get: function () { return browser.element("//div[@id='webmd-tv-playlists']/div[@class='more-videos']/div[@class='playlist filmstrip visually-hidden owl-carousel owl-loaded owl-drag']/div[@class='owl-stage-outer']/div/div[5]/div/a/div[@class='thumb']/div"); } },
    Filmstripplaybtnimg: { get: function () { return browser.element("//div[@id='webmd-tv-playlists']/div[@class='more-videos']/div[@class='playlist filmstrip visually-hidden owl-carousel owl-loaded owl-drag']/div[@class='owl-stage-outer']/div/div[5]/div/a/div[@class='thumb']/img"); } },    
    // poll elements
    Splashpollpresence: { get: function () { return browser.element("//div[@id='poll-module-placeholder']/div"); } },
    Splashpollallelm: { get: function () { return browser.element("//div[@id='poll-module-placeholder']/div//div[@class='content']/div[@class='options-wrapper']/div[@class='option answer']/p"); } },
    Splashpolltotvote: { get: function () { return browser.element("//div[@id='totalVote']/span"); } },
   
    Splashpollvotebef: { value: function (i) { return browser.element("//div[@class='options-wrapper'][" + i + "]/div/p"); } },
      Splashpolltotpoll: { get: function () { return browser.element("//div[@id='poll-module-placeholder']/div"); } },
  //transcript and about
   transcript: { get: function () { return browser.element("//div[@class='video-js cvp-platinum transition-screen-disabled']/div[2]/div[2]/div[2]/div[1]"); } },
    about: { get: function () { return browser.element("//div[@class='video-js cvp-platinum transition-screen-disabled']/div[2]/div[2]/div[2]/div[2]"); } },
    facebook: { get: function () { return browser.element("//div[@class='video-js cvp-platinum transition-screen-disabled']/div[2]/div[2]/div[2]/div[3]"); } },
    twitter: { get: function () { return browser.element("//div[@class='video-js cvp-platinum transition-screen-disabled']/div[2]/div[2]/div[2]/div[4]"); } },
  //video_toolbar
  toolccon: { get: function () { return browser.element("//div[@class='video-js cvp-platinum transition-screen-disabled']/div[2]/div[3]/div[5]"); } },
toolmute : { get: function () { return browser.element("//div[@class='video-js cvp-platinum transition-screen-disabled']/div[2]/div[3]/div[6]/div[1]"); } },
popupClose : { get: function () { return browser.element("//div[@id='webmdHoverClose']"); } },
    



  //ugc options
ugcfb: { get: function () { return browser.element("//div[@id='ugc-widget']/div[1]/div/div[5]/div/div/section[2]/div/footer/div[2]/div/a[2]/img"); } },
ugctw: { get: function () { return browser.element("//div[@id='ugc-widget']/div[1]/div/div[5]/div/div/section[2]/div/footer/div[2]/div/a[3]/img"); } },
ugcpi: { get: function () { return browser.element("//div[@id='ugc-widget']/div[1]/div/div[5]/div/div/section[2]/div/footer/div[2]/div/a[4]/img"); } },
ugcfbclose: { get: function () { return browser.element(" //div[@id='ugc-widget']/div[1]/div/div[5]/div/div/section[2]/div/footer/div[2]/div/a[1] "); } },
ugcshare: { get: function () { return browser.element("//div[@id='ugc-widget']/div[1]/div/div[5]/div/div/section[2]/div/footer/div[2]/a/span"); } },
ugclftarw: { get: function () { return browser.element("//div[@id='ugc-widget']/div[2]/a[1]/div"); } },
ugcrgtarw: { get: function () { return browser.element("//div[@id='ugc-widget']/div[2]/a[2]/div"); } },
ugcdatafmshare: { get: function () { return browser.element("//form[@id='WMDTVShareYourStory']/div[2]/button"); } },

//aricle




  
  
    
}
    
