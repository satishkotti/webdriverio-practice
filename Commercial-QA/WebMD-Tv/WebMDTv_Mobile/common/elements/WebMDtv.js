var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
//var Page = require('./../../../prdemo');
var Page = require('./../../page');
var input = require('./../../config/Webmd-tv')[argv.env];
var url = input.environment;
var driver = {};

var PlayerOptions = Object.create(Page, {
    /**
     * define elements
     */
    //About Locators

    // About: "//div[@class='vjs-control-bar']//div[@class='info-container clearfix']//div[@class='cmd-section']//div[@class='tab-about  btn btn-default']",
    about: { get: function () { return browser.element("div.vjs-control-bar > div > div.cmd-section > div.tab-about.btn.btn-default"); } },
    abouttext: { get: function () { return browser.element("div.tab-about.btn.btn-default > span"); } },
    abt_cnt_about: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > div.header-row.clearfix > span.header"); } },
    abt_cnt_heading: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > h4"); } },
    abt_cnt_scr: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > span"); } },
    abt_cnt_scr_txt: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > div:nth-child(5)"); } },
    abt_cnt_synp_txt: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > p"); } },
    abt_cnt_cpyrt_txt: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > div.sources"); } },
    abt_cnt_cls_btn: { get: function () { return browser.element("div.about-video.premium.mobile.open > div > div.header-row.clearfix > span.close-icon"); } },
    transcript: { get: function () { return browser.element("div.vjs-control-bar > div > div.cmd-section > div.cmd-transcripts.btn.btn-default"); } },
    transcripttext: { get: function () { return browser.element("div.cmd-transcripts.btn.btn-default > span"); } },
    trans_cnt_transcript: { get: function () { return browser.element("div.transcript-video.premium.mobile.open > div.header-row.clearfix > span.header"); } },
    trans_cnt_cls: { get: function () { return browser.element("div.transcript-video.premium.mobile.open > div.header-row.clearfix > span.close-icon"); } },
    trans_cnt_time: { get: function () { return browser.element("div.transcript-container.clearfix.ttml > div:nth-child(2) > div.col1.time"); } },
    trans_cnt_Name: { get: function () { return browser.element("div.transcript-container.clearfix.ttml > div:nth-child(2) > div.col2 > div.name"); } },
    trans_cnt_spk_txt: { get: function () { return browser.element("div.transcript-container.clearfix.ttml > div:nth-child(2) > div.col2 > div.text"); } },
    facebook: { get: function () { return browser.element("//div[@class='cmd-fb  btn btn-default']/img"); } },
    twitter: { get: function () { return browser.element("//div[@class='cmd-twitr  btn btn-default']/img"); } },
    titletext: { get: function () { return browser.element("//div[@class='title2']"); } },



    UGC_FromCommunity: { get: function () { return browser.element("#ugc-wrapper > h3"); } },
    UGC_block: { get: function () { return browser.element("div.owl-item.active.center"); } },
    UGC_block_Count: { get: function () { return browser.element("//div[@class='owl-item active center']//div[@class='counter']/span[3]"); } },
    UGC_block_Current_Count: { get: function () { return browser.element("//div[@class='owl-item active center']//div[@class='counter']/span[1]"); } },

    UGC_sharebutton: { get: function () { return browser.element("div.owl-item.active.center > div > div > section.bottom-content > footer > div.share > a > span"); } },
    UGC_shareimage: { get: function () { return browser.element("div.owl-item.active.center > div > div > section.bottom-content > footer > div.share > a > img"); } },
    UGC_shareblock: { get: function () { return browser.element("div.owl-item.active.center > div > div > section.bottom-content > footer > div.share > div"); } },
    UGC_shareclose: { get: function () { return browser.element("div.owl-item.active.center > div > div > section.bottom-content > footer > div.share > div > a.close"); } },
    UGC_sharefacebook: { get: function () { return browser.element("//div[@class='owl-item active center']//section[@class='bottom-content']//a[@class='ugc-share-fb']/img"); } },
    UGC_sharetwitter: { get: function () { return browser.element("//div[@class='owl-item active center']//section[@class='bottom-content']//a[@class='ugc-share-tw']/img"); } },
    UGC_sharepintrest: { get: function () { return browser.element("//div[@class='owl-item active center']//section[@class='bottom-content']//a[@class='ugc-share-pin']/img"); } },



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
    //Top Banner Ad

    //akamai_video
    akamai_video: { get: function () { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
    //play_button
    play_button: { get: function () { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-play-pause akamai-button"]//div [@class="akamai-icon"]'); } },
    //pause_button
    pause_button: { get: function () { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-play-pause akamai-button"]//div [@class="akamai-icon"]'); } },
    //current_time
    current_time: { get: function () { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-time-display"]//span [@class="akamai-current-time-display"]'); } },
    //fullscreen_button
    fullscreen_button: { get: function () { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-full-screen akamai-button"]//div [@class="akamai-icon"]'); } },
    open: {
        value: function () {
            Page.open.call(this, url);
        }
    },


});

module.exports = PlayerOptions