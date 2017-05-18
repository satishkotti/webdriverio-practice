var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../PremiumandMarqueeVideos_RegressionSuite/page');
var input = require('./../../config/Premium_Video_TestData');
var url = global.environment;
var pvElements = Object.create(Page, {

    /**
     Header elements - All the below elements are related to header section (Ex: WebMD logo, CTCA title)
     */
    ctcaDestinationLink: { get: function () { return browser.element("//div[contains(text(),'THE CUTTING EDGE OF CANCER')]"); } }, // Locator for the CTCA destination (title) appears in the masthead 
    sponsoredByLink: { get: function () { return browser.element("//div[@class='sb-attribution']"); } }, // Locator to find the "Supported by" link in the masthead 
    sponsoredByLogo: { get: function () { return browser.element("//div[@class='sb-attribution']//span"); } }, // Locator to find the "Supported by" logo in the masthead
    adLabel: { get: function () { return browser.element("//div[@class='sb-label']"); } }, // Locator to find the "Advertisement" text in the masthead next to the sponsored logo
    learnMoreAbout: { get: function () { return browser.element("//div[@class='sb-black']"); } }, // Locator to find the "Learn more about" text in the masthead next to the sponsored logo
    cancerTreatmentOptions: { get: function () { return browser.element("//div[@class='sb-blue']"); } }, // Locator to find the "cancer Treatment options" text in the masthead next to the sponsored logo
    popup: { get: function () { return browser.element("//div[@id='newsletterHover']"); } }, // Locator to find the "pop up" displayed when the user clicks on the "Supported by" text or "cancer treatment options" links in the header section
    popupClose: { get: function () { return browser.element("//div[@id='webmdHoverClose']"); } }, // Locator to close the pop up window
    ctcaLinkVerification: { get: function () { return browser.element("//div[contains(text(),'THE CUTTING EDGE OF CANCER')]//parent::a"); } }, // Locator to find the CTCA destination text is a link or not
    webmdLogo: { get: function () { return browser.element("//div[@id='logo']/a/img"); } }, // Locator for the "WebMD" logo appears in the masthead
    presentsText: { get: function () { return browser.element("//div[@class='masthead-left clearfix']//small[contains(text(),'presents')]"); } }, // Locator for the "Presents" text appears below the "WebMD" logo
    masthead: { get: function () { return browser.element("//div[@class='masthead-stretch']"); } }, //Locator for the sticky masthead
    Scroll_locator: { get: function () { return browser.element("(//div[@class='owl-stage']//div[@class='owl-item active']//img)[4]"); } }, //Locator to scroll page
    Video_title: { get: function () { return browser.element("//div[@class='title2']"); } }, // Locator for the video title appears on the infobar


    /**
     Elements related to video player
     */
    heroVideoLocator: { get: function () { return browser.element("//div[@class='akamai-video akamai-layer']"); } }, // Locator for PV hero video 
    videoSubTitle: { get: function () { return browser.element("//div[@class='title1']"); } }, // Locator of the subtitle of the video "Now Playing" and "You are about watch"
    dynamicToolbar: { get: function () { return browser.element("//div[@class='dyn-controlbar']"); } }, // // Locator for video control bar
    playButton: { get: function () { return browser.element(".vjs-play-control.vjs-control.vjs-paused"); } }, //Locator for the "Play" appears on the video control bar
    pauseButton: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-playing']"); } }, //Locator for the "Pause" appears on the video control bar
    playButtonOverlay: { get: function () { return browser.element("//div[@class='akamai-play akamai-overlay']"); } }, //Locator for the "Play button overlay" appears on the video player when the video is paused
    ccButton: { get: function () { return browser.element("//div[@class='vjs-captions-control vjs-control']"); } }, //Locator for the "cc" appears on the video control bar
    ccOnButton: { get: function () { return browser.element("//div[@class='vjs-captions-control vjs-control captions-on']"); } },//Locator for the "cc on" appears on the video control bar
    ccDisabeled: { get: function () { return browser.element("//div[@class='vjs-captions-control vjs-control captions-disabled']"); } }, //Locator for the "cc button disable" appears on the video control bar
    ccProgressBar: { get: function () { return browser.element("//div[@class='akamai-caption-text']"); } }, //Locator for the "CC" text overlay (place where the cc text is displayed)
    volumeButton: { get: function () { return browser.element("//div[@class='vjs-volume-grp']"); } }, //Locator for the "Volume" appears on the video control bar
    volumeMute: { get: function () { return browser.element("//div[@class='vjs-mute-control vjs-control vjs-vol-3 vjs-vol-0']"); } },// Locator for the volumen button in mute state
    volumeUnMute: { get: function () { return browser.element("//div[@class='vjs-mute-control vjs-control vjs-vol-3 vjs-vol-1']"); } },// Locator for the volume button in unmute state
    fullNormalScrreeButton: { get: function () { return browser.element("//div[@class='vjs-fullscreen-control vjs-control ']"); } }, //Locator for the "full/normal screen" button appears on the video control bar
    videoCurrentTime: { get: function () { return browser.element("//div[@class='vjs-current-time vjs-time-controls vjs-control']"); } }, //Locator for the "video current time" appears on the video control bar
    grid8ContentSeeAll: { get: function () { return browser.element("//div[@class='art-group itemGroup8Pieces clearfix']//a[@class='see-all']"); } }, //Locator for the first grid appears below the video player
    grid7ContentSeeAll: { get: function () { return browser.element("//div[@class='art-group itemGroup7Pieces clearfix']//a[@class='see-all']"); } }, // Locator for the second grid appears below the video player
    grid8Elemets: { get: function () { return browser.element("//div[@class='art-group itemGroup8Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); } }, // Locator to get all the anchor elements in 8tile grid
    grid7Elemets: { get: function () { return browser.element("//div[@class='art-group itemGroup7Pieces clearfix']//a[not(contains(@class,'see-all'))]", "href"); } }, // Locator to get all the anchor elements in 7tile grid
    tocGrid8Elemets: { get: function () { return browser.element("//div[@class='art-group itemGroup8Pieces clearfix']"); } }, // Locator to find the 8 grid module in CTCA TOC page
    tocGrid7Elemets: { get: function () { return browser.element("//div[@class='art-group itemGroup7Pieces clearfix']"); } }, // Locator to find the 7 grid module in CTCA TOC page
    /**
    Elements related to inforbar
    */
    transcriptIcon: { get: function () { return browser.element("//div[@class='cmd-transcripts']"); } }, //Locator for transcript icon appears on the video inforbar
    aboutIcon: { get: function () { return browser.element("//div[@class='tab-about']"); } }, //Locator for about icon appears on the video inforbar
    facebookIcon: { get: function () { return browser.element("//div[@class='cmd-fb']"); } }, //Locator for facebook icon appears on the video inforbar
    twitterIcon: { get: function () { return browser.element("//div[@class='cmd-twitr']"); } }, //Locator for twitter icon appears on the video inforbar
    transcriptCloseButton: { get: function () { return browser.element("//div[@class='transcript-video premium open']//span[@class='close-icon']"); } }, //Locator trancript close button appears on top right corner in transcript and About container
    aboutCloseButton: { get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='close-icon']"); } }, //Locator about close button appears on top right corner in transcript and About container

    /**
    Elements related to About container
    */
    aboutTitle: { get: function () { return browser.element("//span[contains(text(),'About')]"); } }, //Locator for "About" title appears in the about container
    videoTitleInAboutContainer: { get: function () { return browser.element("//div[@class='about-video premium open']//h4[@class='title']"); } }, //Locator for video title appears in the about container
    aboutSources: { get: function () { return browser.element("//span[contains(text(),'Sources')]"); } }, //Locator for "Sources" appears in the about container
    aboutTime: { get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='time']"); } }, //Locator for Time displayed next to the video title appears in the about container
    CopyrightsInAboutContainer: { get: function () { return browser.element("//div[@class='about-video premium open']//h4[@class='title']/following-sibling::div/br"); } }, //Locator for copyrights information appears in the about container

    /**
    Elements related to Filmstrip
    */
    moreFromThisSeries: { get: function () { return browser.element("//div[@class='more-from']"); } }, //Locator to find the "more from this series (7)" text
    filmstrip: { get: function () { return browser.element("//div[@class='playlist show-5']"); } }, //Locator to identify filmstrip
    nextLabel: { get: function () { return browser.element("//span[@ class='next-label']"); } }, //Locator to identify next label on filmstrip
    leftArrow: { get: function () { return browser.element("//div[@class='nav-arrow-left']"); } }, // Locator to identify left arrow button on filmstrip
    rightArrow: { get: function () { return browser.element("//div[@class='nav-arrow-right']"); } }, // Locator to identify right arrow button on filmstrip
    rightArrownav: { get: function () { return browser.element("//div[@class='thumb-header']/h4[contains(text(), 'Put Your Immune System on the Attack')]"); } }, // Locator to identify the video thumbnail on the filmstrip when the user clicks on the right arrow button
    leftArrownav: { get: function () { return browser.element("//div[@class='thumb-header']/h4[contains(text(), 'New Ways to Detect Diseased Cells Early On')]"); } }, // Locator to identify the video thumbnail on the filmstrip when the user clicks on the left arrow button
    playlist: { get: function () { return browser.element("//div[@class='playlist show-5']//li"); } }, // Locator to identify the video thumbnail on the filmstrip 

    /**
    Marquee Video page related variables
    */
    largeVideo: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },// Locator for large video in Marquee videos article page
    marqueeCurrentTime: { get: function () { return browser.element("//div[@class='vjs-current-time-display']"); } },// Locator for current time appears in Marquee video control bar 
    pauseButton: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-playing']"); } }, // Video "playing" button locator
    marqueeVideoSmallLargePlayer: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } }, // Marquee video small and large video locator
    gridPersonalizedMedicine: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } }, // Marquee video small and large video locator
    gridSupportForMindAndSpirit: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } }, // Marquee video small and large video locator
    grid: { get: function () { return browser.element("(//*[@id='ContentPane55']//img)"); } }, // Locator to find the grids in CTCA TOC page
    firstGrid: { get: function () { return browser.element("//div[@class='art-group itemGroup8Pieces clearfix']"); } }, // Locator to find the first grids in CTCA TOC page
    secondGrid: { get: function () { return browser.element("//div[@class='art-group itemGroup7Pieces clearfix']"); } }, // Locator to find the second grids in CTCA TOC page
    upNextContainer: { get: function () { return browser.element("//div[@class='up-next-container']"); } }, // Locator to find "Up Next" container in the CTCA article page
    upNextContainerLinks: { get: function () { return browser.element("//div[@class='wbmd-nav-links']/div"); } }, // Locator to find links in "Up Next" container in article page


open: {
    value: function () {
        Page.open.call(this, url);
    }
},
});

module.exports = pvElements