var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../common/page');
var rootPath = path.normalize(__dirname)
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.marqueeheader;
var webmdtvpage = Object.create(Page, {
    /**
     * define elements
     */
    //Film strip locators
    video: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
    category: { get: function () { return browser.element("//h6[@class='category']"); } },
    about: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']"); } },
    abouttext: { get: function () { return browser.element("//div[@class='cmd-section']/div[@class='tab-about btn btn-default']/span"); } },
    //ad: { get: function () { return browser.element("//div[@id='otherAd_fmt']//div[@id='ads2-pos-131-rr_ad']"); } },
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
    aboutheader: { get: function () { return browser.element("//div[@class='module premium-video-container about-open']//div[@class='about-video premium open']//div[@class='header-row clearfix']//span[@class='header']"); } },
    titletext: { get: function () { return browser.element("//div[@class='title-section']/div[@class='title2']"); } },

    //About and Trandcript locators
    //abouttitletext:{ get: function () { return browser.element("//div[@class='about-video premium open']/h4"); } },--old //div[@class='about-video premium open']//div[@class='inner-about']//h4
    abouttitletext: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']//h4"); } },
    //abouttime:{ get: function () { return browser.element("//div[@class='about-video premium open']//span[@class='time']"); } },-old //div[@class='about-video premium open']//div[@class='inner-about']//span[@class='time']
    abouttime: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']//span[@class='time']"); } },
    sourcestext: { get: function () { return browser.element("//span[@class='sources-toggle']"); } },
    copyright: { get: function () { return browser.element("//div[@class='sources']"); } },
    //aboutclose:{ get: function () { return browser.element("//div[@class='about-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']"); } },//old --//div[@class='about-video premium open']//div[@class='inner-about']//span[@class='close-icon']
    aboutclose: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']//span[@class='close-icon']"); } },
    //aboutsynopsistext:{ get: function () { return browser.element("//div[@class='about-video premium open']/p"); } },//-old //div[@class='about-video premium open']//div[@class='inner-about']/p
    aboutsynopsistext: { get: function () { return browser.element("//div[@class='about-video premium open']//div[@class='inner-about']/p"); } },
    transcriptheader: { get: function () { return browser.element("//div[@class='transcript-video premium open']//div[@class='header-row clearfix']//span[@class='header']"); } },
    transcripttimeN: { value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix'][" + n + "]//div[@class='col1 time']/../div"); } },
    transcriptauthorN: { value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix'][" + n + "]//div[@class='col2']//div[@class='name']"); } },
    transcripttextN: { value: function (n) { return browser.element("//div[@class='transcript-video premium open']//div[@class='transcript-container clearfix ttml']//div[@class='trans-row clearfix'][" + n + "]//div[@class='col2']//div[@class='text']"); } },
    transcriptclose: { get: function () { return browser.element("//div[@class='transcript-video premium open']/div[@class='header-row clearfix']//span[@class='close-icon']"); } },

    //Video Locators
    play: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-playing']"); } },
    pause: { get: function () { return browser.element("//div[@class='vjs-play-control vjs-control vjs-paused']"); } },
    smallvideoplay: { get: function () { return browser.element("//div[@class='vjs-progress-control vjs-control']//div[@role='slider']//div[@class='vjs-play-progress']"); } },
    nowplaying: { get: function () { return browser.element("//div[@class='info-container-wrap']//div[@class='title1']/span"); } },
    smallvideonowplaying: { get: function () { return browser.element("//div[@class='akamai-video akamai-layer']//video[@class='akamai-html5 akamai-media-element']"); } },
    videonowplaying: { get: function () { return browser.element("//div[@class='akamai-overlays akamai-layer']//div[@class='akamai-play akamai-overlay']"); } },

    //Grid Locators

     gridtitle: { get: function () { return browser.element("//div[@class='list-header']"); } },
    grid1articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//h4'); } },
    grid1articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//h5'); } },
    grid2articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//h4'); } },
    grid2articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//h5'); } },
    grid3articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//h4'); } },
    grid3articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//h5'); } },
    grid1image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[1]//img'); } },
    grid2image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[2]//img'); } },
    grid3image: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[3]//img'); } },
    breadcrum: { get: function () { return browser.element("//section[@class='breadcrumb']/h6"); } },

    //Grid Articles
    grid4articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[4]//h4'); } },
    grid4articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[4]//h5'); } },
    grid5articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[5]//h4'); } },
    grid5articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[5]//h5'); } },
    grid6articletitle1: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[6]//h4'); } },
    grid6articletitle2: { get: function () { return browser.element('(//div[@class="list-container"]/div[@class="list-item"])[6]//h5'); } },
    inforbartitle: { get: function () { return browser.element("//div[@class='info-container clearfix']/div[@class='title-section']/div[@class='title2']"); } },
    leftarrow: { get: function () { return browser.element("//a[@class='video-nav-left']"); } },
    rightarrow: { get: function () { return browser.element("//a[@class='video-nav-right']"); } },
    leftnavigationarrow: { get: function () { return browser.element("//div[@class='nav-arrow-left']"); } },
    rightnavigationarrow: { get: function () { return browser.element("//div[@class='nav-arrow-right']"); } },
    filmstripelements: { get: function () { return browser.element("//div[@class='more-videos']//div[@class='owl-item'] | //div[@class='more-videos']//div[@class='owl-item active']"); } },

    //PPE-99104 DATA Entry locators
    maintext: { get: function () { return browser.element("//div[@id='ugc-wrapper']//div[@id='ugc-form']//div[@class='form-wrap']//form[@id='WMDTVShareYourStory']//div[@class='field']"); } },
    maintextarea: { get: function () { return browser.element("//form[@id='WMDTVShareYourStory']//div[@class='field focused']//textarea"); } },
    gender: { get: function () { return browser.element("//div[@class='radio-btn']//label[@for='ugc-male']"); } },

    //adlayout

    videoadlayout: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
  //ad: { get: function () { return browser.element("//div[@id='google_ads_iframe_/8668145/consumer/webmd_0__container__']"); } },
  adlayouts: { get: function () { return browser.element("//div[@id='otherAd_fmt']//div[@id='ads2-pos-131-rr_ad']"); } },

//email
    email: { get: function () { return browser.element("//div[@class='field text email']//input[@id='ugc-email']"); } },
    clearemail: { get: function () { return browser.element("//div[@class='field text email focused']//input[@id='ugc-email']"); } },
    emailtext: { get: function () { return browser.element("//div[@class='field text email']//span"); } },
    youtube: { get: function () { return browser.element("//div[@class='field text website']//input[@id='ugc-website']"); } },
    clearyoutube: { get: function () { return browser.element("//div[@class='field text website focused']//input[@id='ugc-website']"); } },
//phone Entry
    phone: { get: function () { return browser.element("//div[@class='field text phone']//input[@id='ugc-phone']"); } },
    clearphone: { get: function () { return browser.element("//div[@class='field text phone focused']//input[@id='ugc-phone']"); } },
    name: { get: function () { return browser.element("//div[@class='field text name']//input[@id='ugc-name']"); } },
    clearage: { get: function () { return browser.element("//div[@class='field-group']//div[@class='field col age']//input"); } },
    nametext: { get: function () { return browser.element("//div[@class='field text name']//span"); } },
    clearname: { get: function () { return browser.element("//div[@class='field text name focused']//input[@id='ugc-name']"); } },
//Age
    age: { get: function () { return browser.element("//div[@class='field col age']//input[@id='ugc-age']"); } },
    checkbox: { get: function () { return browser.element("//div[@class='field terms']//span[@class='checkbox']"); } },
    share: { get: function () { return browser.element(".submit"); } },
    thankyou: { get: function () { return browser.element("//div[@class='form-wrap']//span[@class='close-form']/following-sibling::h3"); } },
    shareclosebutton: { get: function () { return browser.element("//div[@class='form-wrap']//span[@class='close-form']"); } },
    namerequired: { get: function () { return browser.element("//div[@class='form-bottom']//div[@class='field text name']//span//em"); } },
    emailrequired: { get: function () { return browser.element("//div[@class='form-bottom']//div[@class='field text email']//span//em"); } },
    checkboxrequired: { get: function () { return browser.element("//div[@class='show']//div[@class='field terms']//span//em"); } },




    /**
* define or overwrite page methods
*/
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },

});
module.exports = webmdtvpage
