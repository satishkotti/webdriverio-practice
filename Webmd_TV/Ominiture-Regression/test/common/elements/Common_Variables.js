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
    Header elements - All the below elements are related to header section (Ex: WebMD logo, CTCA title)
    */
    
    ctcaDestinationLink:"//div[contains(text(),'THE CUTTING EDGE OF CANCER')]", // Locator for the CTCA destination (title) appears in the masthead 
    sponsoredByLink:"//div[@class='sb-attribution']", // Locator to find the "Supported by" link in the masthead 
    sponsoredByLogo:"//div[@class='sb-attribution']//span", // Locator to find the "Supported by" logo in the masthead
    adLabel:"//div[@class='sb-label']", // Locator to find the "Advertisement" text in the masthead next to the sponsored logo
    learnMoreAbout:"//div[@class='sb-black']", // Locator to find the "Learn more about" text in the masthead next to the sponsored logo
    cancerTreatmentOptions:"//div[@class='sb-blue']", // Locator to find the "cancer Treatment options" text in the masthead next to the sponsored logo
    popup:"//div[@id='newsletterHover']", // Locator to find the "pop up" displayed when the user clicks on the "Supported by" text or "cancer treatment options" links in the header section
    popupClose:"//div[@id='webmdHoverClose']", // Locator to close the pop up window
    ctcaLinkVerification:"//div[contains(text(),'THE CUTTING EDGE OF CANCER')]//parent::a", // Locator to find the CTCA destination text is a link or not
    webmdLogo:"//div[@id='logo']/a/img", // Locator for the "WebMD" logo appears in the masthead
    presentsText:"//div[@class='masthead-left clearfix']//small[contains(text(),'presents')]", // Locator for the "Presents" text appears below the "WebMD" logo
    masthead:"//div[@class='masthead-stretch']", //Locator for the sticky masthead
    Scroll_locator:"(//div[@class='owl-stage']//div[@class='owl-item active']//img)[4]", //Locator to scroll page
    Video_title:"//div[@class='title2']", // Locator for the video title appears on the infobar
    survey_frame:'iframe#iPopFrame_sw',
    survey_frameid:'iPopFrame_sw',
    survey_nothanks:"//button[text()='No Thanks']",

    /**
    Elements related to video player
    */
    akamaiVideoPlayer:"//video[@class='akamai-html5 akamai-media-element']", // Locator to find the "Akamai Video Player" both in PV and MV pages
    videoSubTitle:"//div[@class='info-container-wrap']//div[@class='title1']", // Locator of the subtitle of the video "Now Playing" and "You are about watch"
    Video_title:"//div[@class='info-container-wrap']//div[@class='title2']", // Locator for the video title appears on the infobar
    dynamicToolbar:"//div[@class='dyn-controlbar']", // // Locator for video control bar
    playButton:"div.vjs-play-control.vjs-control.vjs-paused" //Locator for the "Play" appears on the video control bar
 /*   pauseButton: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-playing']"); } }, //Locator for the "Pause" appears on the video control bar
    playButtonOverlay: { get: function () { return browser.element("//div[@class='akamai-play akamai-overlay']"); } }, //Locator for the "Play button overlay" appears on the video player when the video is paused
    ccButton: { get: function () { return browser.element("//div[@class='vjs-captions-control vjs-control']"); } }, //Locator for the "cc" appears on the video control bar
    ccOnButton: { get: function () { return browser.element("//div[@class='vjs-captions-control vjs-control captions-on']"); } },//Locator for the "cc on" appears on the video control bar
    ccDisabeled: { get: function () { return browser.element("//div[@class='vjs-captions-control vjs-control captions-disabled']"); } }, //Locator for the "cc button disable" appears on the video control bar
    ccProgressBar: { get: function () { return browser.element("//div[@class='akamai-caption-text']"); } }, //Locator for the "CC" text overlay (place where the cc text is displayed)
    volumeButton: { get: function () { return browser.element("//div[@class='vjs-mute-control vjs-control vjs-vol-3 vjs-vol-1']"); } }, //Locator for the "Volume" appears on the video control bar
    volumeMute: { get: function () { return browser.element("//div[@class='vjs-mute-control vjs-control vjs-vol-3 vjs-vol-0']"); } },// Locator for the volumen button in mute state
    volumeUnMute: { get: function () { return browser.element("//div[@class='vjs-mute-control vjs-control vjs-vol-3 vjs-vol-0']"); } },// Locator for the volume button in unmute state
    volumeMuteUnmuteCssProperty: { get: function () { return browser.element("//div[@class='vjs-volume-handle vjs-slider-handle']"); } },// Locator for the volume button Css property 
    fullNormalScrreeButton: { get: function () { return browser.element("//div[@class='vjs-fullscreen-control vjs-control ']"); } }, //Locator for the "full/normal screen" button appears on the video control bar
    videoCurrentTime: { get: function () { return browser.element("//div[@class='vjs-current-time-display']"); } }, //Locator for the "video current time" appears on the video control bar
    videoDuration: { get: function () { return browser.element("//div[@class='vjs-duration-display']"); } }, //Locator for the "video duration time" appears on the video control bar

    /**
    Elements related to inforbar
    
    transcriptIcon: { get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='cmd-transcripts']"); } }, //Locator for transcript icon appears on the video inforbar
    aboutIcon: { get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='tab-about']"); } }, //Locator for about icon appears on the video inforbar
    facebookIcon: { get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='cmd-fb']"); } }, //Locator for facebook icon appears on the video inforbar
    twitterIcon: { get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='cmd-twitr']"); } }, //Locator for twitter icon appears on the video inforbar
    transcriptCloseButton: { get: function () { return browser.element("//div[@class='transcript-video premium open']//span[@class='close-icon']"); } }, //Locator trancript close button appears on top right corner in transcript and About container
    transcriptText: { get: function () { return browser.element("//span[contains(text(),'Transcript')]"); } }, //Locator to find "Transcript" text in the Transcript container
    aboutCloseButton: { get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='close-icon']"); } }, //Locator about close button appears on top right corner in transcript and About container
    aboutTitle: { get: function () { return browser.element("//span[contains(text(),'About')]"); } }, //Locator for "About" title appears in the about container
    videoTitleInAboutContainer: { get: function () { return browser.element("//div[@class='about-video premium open']//h4[@class='title']"); } }, //Locator for video title appears in the about container
    aboutSources: { get: function () { return browser.element("//span[contains(text(),'Sources')]"); } }, //Locator for "Sources" appears in the about container
    aboutTime: { get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='time']"); } }, //Locator for Time displayed next to the video title appears in the about container
    CopyrightsInAboutContainer:"//div[@class='about-video premium open']//h4[@class='title']/following-sibling::div/br"//Locator for copyrights information appears in the about container
*/
}