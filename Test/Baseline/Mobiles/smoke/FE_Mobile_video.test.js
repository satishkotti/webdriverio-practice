var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
var video_Actions = require("../common/functions/FE_Mobile_video_Actions");
var videoElements = require('../common/elements/FE_Mobile_video_Elements');
var input = require('../config/FE_Mobile.testdata')[argv.env];
var URL = input.video_url;
browser.url(URL);
describe('Verify that video control bar contains "controls buttons" ', function() {
    it('Verify video visibility', function() {
        var visible = video_Actions.Element_visibility(videoElements.akamai_video.selector);
        visible.should.equal(true);
    });
    it('Verify that play button appeared on Video control bar', function() {
        var visible = video_Actions.Element_visibility(videoElements.play_button.selector);
        console.log(visible);
        visible.should.equal(true);
        var videoStreamingStatus = video_Actions.currentVideoTimestampVerification();
        expect(videoStreamingStatus > 0).to.be.true;
    });
    it('Verify that pause button appeared on Video control bar', function() {
        browser.click(videoElements.play_button.selector);
        browser.pause(9000);
        var visible = video_Actions.Element_visibility(videoElements.pause_button.selector);
        visible.should.equal(true);
        browser.click(videoElements.play_button.selector);
    });
    it.only('Verify fullscreen is working or not', function() {
        var visible = video_Actions.Element_visibility(videoElements.fullscreen_button.selector);
        visible.should.equal(true);
        var full_screen_height = video_Actions.check_working_of_full_screen_button();
        full_screen_height.should.greaterThan(202.5);
    });
    it('Verify that transcript button is working or not', function() {
        var visible = video_Actions.Element_visibility(videoElements.transcript.selector);
        visible.should.equal(true);
        video_Actions.check_working_of_Element(videoElements.transcript.selector, videoElements.transcript_closeicon.selector);
    });
    it('Verify that about button is working or not', function() {
        var visible = video_Actions.Element_visibility(videoElements.about_icon.selector);
        visible.should.equal(true);
        video_Actions.check_working_of_Element(videoElements.about_icon.selector, videoElements.about_closeicon.selector);
    });
    it('Verify that twitter icon is working or not', function() {
        var visible = video_Actions.Element_visibility(videoElements.twitter_icon.selector);
        visible.should.equal(true);
        var Twitter_Page_Title = 'Share a link on Twitter';
        var actions = video_Actions.Click_Elements(videoElements.twitter_icon.selector, videoElements.twitter_icon.selector);
        actions.Page_title_Text.should.equal(Twitter_Page_Title);
    });
    it('Verify that facebook icon is working or not', function() {
        var visible = video_Actions.Element_visibility(videoElements.facebook_icon.selector);
        visible.should.equal(true);
        var Facebook_Page_Title = 'Log in to Facebook | Facebook';
        var actions = video_Actions.Click_Elements(videoElements.facebook_icon.selector, videoElements.facebook_icon.selector);
        actions.Page_title_Text.should.equal(Facebook_Page_Title);
    });
});