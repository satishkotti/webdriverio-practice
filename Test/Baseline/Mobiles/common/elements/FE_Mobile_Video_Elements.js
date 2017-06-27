var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../../../../page');
var video_page = Object.create(Page, {

    //akamai_video
    akamai_video: { get: function() { return browser.element("//video[@class='akamai-html5 akamai-media-element']"); } },
    //play_button
    play_button: { get: function() { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-play-pause akamai-button"]//div [@class="akamai-icon"]'); } },
    //pause_button
    pause_button: { get: function() { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-play-pause akamai-button"]//div [@class="akamai-icon"]'); } },
    //current_time
    current_time: { get: function() { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-time-display"]//span [@class="akamai-current-time-display"]'); } },
    //fullscreen_button
    fullscreen_button: { get: function() { return browser.element('//div [@class="akamai-control-bar"]//div [@class="akamai-full-screen akamai-button"]//div [@class="akamai-icon"]'); } },
    //transcript
    transcript: { get: function() { return browser.element('//div [@class="cmd-section"]/div[1]'); } },
    //transcript_closeicon
    transcript_closeicon: { get: function() { return browser.element('//*[@id="ContentPane20"]/div/div[3]/div[1]/span[2]'); } },
    //about_icon
    about_icon: { get: function() { return browser.element('//div [@class="cmd-section"]/div[2]'); } },
    //about_closeicon
    about_closeicon: { get: function() { return browser.element('//div [@class="cmd-section"]/div[2]'); } },
    //desc
    desc: { get: function() { return browser.element(".//*[@id='ContentPane20']/div/div[5]/p"); } },
    //twitter_icon
    twitter_icon: { get: function() { return browser.element('//div [@class="info-container clearfix"]//div [@class="cmd-section"]/div[3]'); } },
    //facebook_icon
    facebook_icon: { get: function() { return browser.element('//div [@class="info-container clearfix"]//div [@class="cmd-section"]/div[4]'); } },
});
module.exports = video_page