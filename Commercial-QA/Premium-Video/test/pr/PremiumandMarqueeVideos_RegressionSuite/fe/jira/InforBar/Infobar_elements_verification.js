var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe('Verify whether info bar is persistent and that will display the name of the current video, Transcript button, About button and the share icons.', function () {

    it('PPE-28628: Verify the current video title is displayed on infobar', function () {
        browser.url(input.staging_ctca.environment);
        browser.scroll(0, 200);
        var videoTitledisplay = pvActions.Verify_element_exist(pvElements.Video_title.selector);
        videoTitledisplay.should.equal(true);
        console.log(videoTitledisplay);
    });

    it('PPE-28628: Verify the transcript icon appear on the infobar', function () {
        var transcriptIconDisplay = pvActions.Verify_element_exist(pvElements.transcriptIcon.selector);
        transcriptIconDisplay.should.equal(true);
        console.log(transcriptIconDisplay);
    });

    it('PPE-28628: Verify the about icon appear on the infobar', function () {
        var aboutIconDisplay = pvActions.Verify_element_exist(pvElements.aboutIcon.selector);
        aboutIconDisplay.should.equal(true);
        console.log(aboutIconDisplay);
    });

    it('PPE-28628: Verify the twitter icon appear on the infobar', function () {
        var twitterIconDisplay = pvActions.Verify_element_exist(pvElements.twitterIcon.selector);
        twitterIconDisplay.should.equal(true);
        console.log(twitterIconDisplay);
    });

    it('PPE-28628: Verify the facebook icon appear on the infobar', function () {
        var fbIconDisplay = pvActions.Verify_element_exist(pvElements.facebookIcon.selector);
        fbIconDisplay.should.equal(true);
        console.log(fbIconDisplay);
    });

    it('Verify when the Video Hero graphic is displayed the text over the title is saying "You are about to watch" on inital page load', function () {
        var herovideovisible = pvActions.element_gettext(pvElements.videoSubTitle.selector);
        console.log(herovideovisible);
        herovideovisible.should.equal('YOU ARE ABOUT TO WATCH');
    });

    it('Verify that Now Playing" is displayed once the video starts playing', function () {
        browser.url(input.staging_ctca.environment);
        pvActions.element_click(pvElements.playButtonOverlay.selector);
        browser.pause(5000);
        var herovideovisible = pvActions.element_gettext(pvElements.videoSubTitle.selector);
        console.log(herovideovisible);
        herovideovisible.should.equal('NOW PLAYING');
    });

    it('PPE-32328: Verify if there is a close button appears upper right hand side in the transcripts container', function () {
        browser.scroll(0, 300);
        browser.pause(70000);
        pvActions.element_click(pvElements.transcriptIcon.selector);
        var closeButtonVisible = pvActions.Verify_element_exist(pvElements.transcriptCloseButton.selector);
        closeButtonVisible.should.equal(true);

        pvActions.element_click(pvElements.aboutIcon.selector);
        var closeButtonVisible = pvActions.Verify_element_exist(pvElements.aboutCloseButton.selector);
        closeButtonVisible.should.equal(true);
    });

    it('Verify that transcript container is closed upon clicking the close button', function () {
        pvActions.element_click(pvElements.transcriptIcon.selector);
        var closeButtonVisible = pvActions.Verify_element_exist(pvElements.transcriptCloseButton.selector);
        closeButtonVisible.should.equal(true);
        pvActions.element_click(pvElements.transcriptCloseButton.selector);
        var closeButtonVisible = pvActions.Verify_element_exist(pvElements.transcriptCloseButton.selector);
        closeButtonVisible.should.equal(false);

        pvActions.element_click(pvElements.aboutIcon.selector);
        var closeButtonVisible = pvActions.Verify_element_exist(pvElements.aboutCloseButton.selector);
        closeButtonVisible.should.equal(true);
        pvActions.element_click(pvElements.aboutCloseButton.selector);
        var closeButtonVisible = pvActions.Verify_element_exist(pvElements.transcriptCloseButton.selector);
        closeButtonVisible.should.equal(false);
    });

    it('PPE-32327: Verify whether the user can can scroll through the transcript', function () {
        pvActions.element_click(pvElements.aboutIcon.selector);
        browser.scroll(0, 400);
        browser.isVisible("//div[contains(text(),'PAMELA CRILLEY')]");
    });

    it('PPE-32326: Verify the the first portion of the video transcript is displayed as shown in the design', function () {
        pvActions.element_click(pvElements.transcriptIcon.selector);
        var transcriptText = browser.getText("//span[contains(text(),'Transcript')]");
        console.log(transcriptText);
        transcriptText.should.equal("TRANSCRIPT");
    });

    it('PPE-32317: Verify the About link, displays the Title (title) of the video object plus video duration', function () {
        pvActions.element_click(pvElements.aboutIcon.selector);
        var videoTitle = pvActions.Verify_element_exist(pvElements.videoTitleInAboutContainer.selector);
        videoTitle.should.equal(true);
        var videoTime = pvActions.Verify_element_exist(pvElements.aboutTime.selector);
        console.log(videoTime);
        videoTime.should.equal(true);
    });

    it('Verify the content of the about container', function () {
        var aboutTitle = pvActions.element_gettext(pvElements.aboutTitle.selector);
        aboutTitle.should.equal("ABOUT");
        var sourceTitle = pvActions.element_gettext(pvElements.aboutSources.selector);
        sourceTitle.should.equal("SOURCES");
        var cprightsText = pvActions.element_gettext(pvElements.CopyrightsInAboutContainer.selector);
        console.log("Copyrights value "+cprightsText);
        //cprightsText.should.equal(true);
    });

    it('PPE-28628: Verify the twitter icon appear on the infobar', function () {
        browser.click(pvElements.twitterIcon.selector);
        browser.click(pvElements.facebookIcon.selector);
        var handle = browser.windowHandles();
        windowCount = handle.value.length;
        for (var i = 1; i < windowCount; i++) {
            browser.window(handle.value[i]);
            console.log(browser.getTitle());
            browser.close(handle[i]);
        }
    });

});