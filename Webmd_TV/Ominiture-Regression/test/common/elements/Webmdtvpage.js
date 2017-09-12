var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../page');
//var input = require('./../../config/videotestdata');
var url = global.environment;
var browser = require('./../../common/browser');

    
module.exports = {

/**
Elements related to video player
*/
heroVideoLocator:"//div[@class='akamai-video akamai-layer']", // Locator for PV hero video 
Videoplaying:"//div[contains(@class,'akamai-playing') and not(contains(@class,'akamai-ad-mode')) and not(contains(@class,'akamai-pause'))]", // Locator for video playing 
Videopause:"//div[contains(@class,'akamai-paused') and not(contains(@class,'akamai-ad-mode')) and not(contains(@class,'akamai-playing'))]", // Locator for video pause 
webmdplayer:"//div[contains(@id,'webmd-player')]",//locator for webmdplayer

video_toolbar_playbutton:'div.dyn-controlbar>div.vjs-play-control.vjs-control.vjs-paused',
video_toolbar_pausebutton:'div.dyn-controlbar>div.vjs-play-control.vjs-control.vjs-playing',
video_toolbar_mutebutton:'div.vjs-mute-control.vjs-control.vjs-vol-3.vjs-vol-1',
video_toolbar_unmutebutton:'div.vjs-mute-control.vjs-control.vjs-vol-3.vjs-vol-0',
video_toolbar_closecaptionon:'div.vjs-captions-control.vjs-control',
video_toolbar_closecaptionoff:'div.vjs-captions-control.vjs-control.captions-on',
video_toolbar_saveforlater:'div.vjs-favorites-control.vjs-control',
video_toolbar_playcontrol:'div.vjs-play-control.vjs-control',
video_toolbar:'div.vjs-control-bar',
video_toolbar_container:'div.info-container.clearfix',
video_toolbar_playdisabled:'div.vjs-play-control.vjs-control.vjs-paused.vjs-disabled',
video_toolbar_twitter:'div.cmd-twitr',
video_toolbar_facebook:'div.cmd-fb',
video_toolbar_fullscreen:'div.vjs-fullscreen-control.vjs-control',
video_toolbar_duration:'div.vjs-duration-display',
video_toolbar_progressbarwrapper:'div.vjs-play-progress',
video_toolbar_progressbar:'div.vjs-progress-holder.vjs-seek',
/**
video infobar elements
*/

pvVideoSubTitle:"//div[@class='title1']", // Locator of the subtitle of the video "Now Playing" and "You are about watch"
pvVideoTitle:"//div[@class='title2']", // Locator for the video title appears on the infobar
transcriptIcon:"//div[@class='cmd-transcripts']/span", //Locator for transcript icon appears on the video inforbar
transcriptIcons:"//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']", //Locator for transcript icon appears on the video inforbar

transcriptcssIcon: "div.cmd-transcripts", //Locator for transcript icon appears on the video inforbar
transcriptmodule: 'div.transcript-video.premium', //Locator for transcript icon appears on the video inforbar
transcriptbeforeicon:'div.cmd-transcripts::before', //Locator for transcript icon appears on the video inforbar
transcriptbeforecloseicon:'div.cmd-transcripts.open::before', //Locator for transcript icon appears on the video inforbar
transcriptcloseIcon:"//div[@class='cmd-transcripts open']", //Locator for transcript icon appears on the video inforbar
transcriptcsscloseIcon:"div.cmd-transcripts.open", //Locator for transcript icon appears on the video inforbar
transcriptauthorname:"(//div[@class='transcript-video premium']//div[@class='name'])[1]", //Locator for transcript icon appears on the video inforbar
transcripttext:"(//div[@class='transcript-video premium']//div[@class='text'])[1]", //Locator for transcript icon appears on the video inforbar
aboutIcon:"//div[@class='tab-about btn btn-default']/span", //Locator for about icon appears on the video inforbar
aboutcloseIcon:"//span[text()='About']/following-sibling::span[@class='close-icon']", //Locator for about close icon appears on the video inforbar
aboutModule:'div.about-video.premium', //Locator for about icon appears on the video inforbar
aboutReviewer:'span.reviewer', //Locator for about icon appears on the video inforbar
facebookIcon:"//div[@class='cmd-fb']", //Locator for facebook icon appears on the video inforbar
twitterIcon:"//div[@class='cmd-twitr']" ,//Locator for twitter icon appears on the video inforbar

facebook:".//*[@id='v_premium-video-player_091e9c5e81712864']/div[2]/div[2]/div[2]/div[3]", //Locator for facebook icon appears on the toolbar
}
