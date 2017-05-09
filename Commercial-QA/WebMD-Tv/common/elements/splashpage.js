var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../common/page');
var rootPath = path.normalize(__dirname)
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.splash;
var splashpage = Object.create(Page, {
    /**
     * define elements
     */
    grids: { get: function () { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+n+"]"); } },
    category: { get: function () { return browser.element("//h6[@class='category']"); } },
    videogridn: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+n+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']"); } },
    text: { value: function (n) { return browser.element("(//div[@id='multimedia-grid']//div[@class='item-duo-wrapper'])//div["+n+"]//div[@class='overlay']//p[@class='title']"); } },
    grid1: { value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+n+"]"); } },
    overlay:{ value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']/div["+n+"]//div[@class='overlay']"); } },
    watchnow:{ value: function (n) { return browser.element("//div[@id='multimedia-grid']//div[@class='item-duo-wrapper']//div["+n+"]//div[@class='overlay']//div[@class='button']//span[@class='txt']"); } },
    about: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']"); } },
    abouttext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/span"); } },
    title: { get: function () { return browser.element("//div[@class='info-container-wrap']/div/div/div[@class='title-section']/div[@class='title2']"); } },
    transcript: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']"); } },
    transcripttext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='cmd-transcripts btn btn-default']/span"); } },
    episodetitleN: { value: function (n) { return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//div[@class='default']"); } },
    facebook: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[1]"); } },
    facebooktext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[1]/span"); } },
    twitter: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[2]"); } },
    twittertext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/following-sibling::div[2]/span"); } },
    //videoN: { value:function(n){ return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])["+n+"]");}},
    filmstripN: { value: function (n) { return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//h4"); } },
    imagethumnailN: { value: function (n) { return browser.element("(//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//img"); } },
    playiconN: { value: function (n) { return browser.element("(//div[@class='more-videos']/div[@class='thumb-header']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//div[@class='thumb-header']//div[@class='play-iconbox']"); } },
    playshapeN: { value: function (n) { return browser.element("(//div[@class='more-videos']/div[@class='thumb-header']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active'])[" + n + "]//div[@class='thumb-header']//div[@class='play-iconbox']//div[@class='playshape']"); } },
    aboutheader:{ get: function () { return browser.element("//div[@class='module premium-video-container about-open']//div[@class='about-video premium open']//div[@class='header-row clearfix']//span[@class='header']"); } },
    titletext:{ get: function () { return browser.element("//div[@class='title-section']/div[@class='title2']"); } },
    abouttitletext:{ get: function () { return browser.element("//div[@class='about-video premium open']/h4"); } },
    abouttime:{ get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='time']"); } },
    sourcestext:{ get: function () { return browser.element("//span[@class='sources-toggle']"); } },
    copyright:{ get: function () { return browser.element("//div[@class='sources']"); } },
    aboutclose:{ get: function () { return browser.element("//div[@class='about-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']"); } },
    aboutsynopsistext:{ get: function () { return browser.element("//div[@class='about-video premium open']/p"); } },
    transcriptheader:{ get: function () { return browser.element("//div[@class='transcript-video premium open']//div[@class='header-row clearfix']//span[@class='header']"); } },
    transcripttimeN:{ value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix']["+n+"]//div[@class='col1 time']/../div"); } },
    transcriptauthorN:{ value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix']["+n+"]//div[@class='col2']//div[@class='name']"); } },
    transcripttextN:{ value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix']["+n+"]//div[@class='col2']//div[@class='text']"); } },
    transcriptclose:{ get: function () { return browser.element("//div[@class='transcript-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']"); } },
    play:{ get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-playing']"); } },
    pause:{ get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-paused']"); } },
    smallvideoplay:{ get: function () { return browser.element("//div[@class='vjs-progress-control vjs-control']//div[@role='slider']//div[@class='vjs-play-progress']"); } },
    nowplaying:{ get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='title1']/span"); } },
    smallvideonowplaying:{ get: function () { return browser.element("//div[@class='akamai-video akamai-layer']//video[@class='akamai-html5 akamai-media-element']"); } },
    videonowplaying:{ get: function () { return browser.element("//div[@class='akamai-overlays akamai-layer']//div[@class='akamai-play akamai-overlay']"); } },

    /**
* define or overwrite page methods
*/
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },

});
module.exports = splashpage
