var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe('Verify that video control bar contains "Play, CC, Volume, and full screen controls buttons" in desktop browser', function () {

    it('Verify that play button appeared on Video control bar', function () {
        browser.url(input.staging_ctca.environment); // Access the PV and MV URL
        browser.pause(80000); // Keep the browser in waiting state till the preroll ad is completed
        browser.moveToObject(pvElements.heroVideoLocator.selector); // Focus on the video player to video the video control bar
        var playButtonDisplay = pvActions.Verify_element_exist(pvElements.pauseButton.selector); // Return the boolean value based on the object visibility
        playButtonDisplay.should.equal(true); // If the value is "True" play button is displayed on the contril bar else not visible
    });

    it('Verify that pause button appeared on Video control bar', function () {
        browser.refresh(); // Regresh the page to pause the video
        var pauseButtonDisplay = pvActions.Verify_element_exist(pvElements.playButton.selector); // Boolean value is captured ased on the element visibility
        pauseButtonDisplay.should.equal(true); // If the pause button is visible on the video control bar "True" will be captured else test case is failed
    });

    it('Verify that cc button appeared on Video control bar', function () {
        browser.moveToObject(pvElements.heroVideoLocator.selector);// Focus on the video player to video the video control bar
        var ccButtonDisplay = pvActions.Verify_element_exist(pvElements.ccButton.selector); // Capturing the boolean value based on the element "CC" visibility
        ccButtonDisplay.should.equal(true); // Verifying the boolean value captured. If the value is "True" cc is visible on the control bar else not visible 
    });

    it('Verify that volume button appeared on Video control bar', function () {
        browser.moveToObject(pvElements.heroVideoLocator.selector);// Focus on the video player to video the video control bar
        var volumeButtonDisplay = pvActions.Verify_element_exist(pvElements.volumeButton.selector);// Capturing the boolean value based on the element "Volume" icon visibility
        volumeButtonDisplay.should.equal(true);// Verifying the boolean value captured. If the value is "True" when the volume button is visible else false
    });

    it('Verify that full Normal Scrree button appeared on Video control bar', function () {
        browser.moveToObject(pvElements.heroVideoLocator.selector);// Focus on the video player to video the video control bar
        var fscrnNrscButtonDisplay = pvActions.Verify_element_exist(pvElements.fullNormalScrreeButton.selector);// Capturing the boolean value based on the element "Volume" icon visibility
        fscrnNrscButtonDisplay.should.equal(true);// Verifying the boolean value captured. If the value is "True" when the fullscreen icon is visible else false
    });

    it('PPE-46557: Verify that video plays when the user clicks on the "Play" button', function () {
        var isExist = browser.isExisting(pvElements.playButton.selector); // Verify the pause button is exist
        pvActions.element_click(pvElements.playButtonOverlay.selector); // Click on the play button 
        browser.pause(80000); // Wait till the pre roll ad is completed
        var firstVideoCurrentTime = pvActions.element_gettext(pvElements.videoCurrentTime.selector); // Getting the video current video running time
        var res = firstVideoCurrentTime.split(":");  // Split video current running time and storing into a array
        if (res[0] > 0 || res[1] > 0) { // Checkiing the hrs and mts of the current running video captured. If the hrs and mts greater than "0" means the video has already started else not started
            console.log("Video has started alreay playing" + res); // Displaying the current running time of the video
        }
        playButtonisExist = pvActions.Verify_element_exist(pvElements.pauseButton.selector); // Verify that Play button is visible 
        playButtonisExist.should.equal(true); // Verifying the boolean value captured. If the value is "True" if the play button is visible else false
    });

    it('PPE-46556: Verify that "Play" button appears on the video when it is not auto played', function () {
        browser.url(input.staging_ctca.environment); // Access the PV and MV URL again not to auto play the video
        var isExist = browser.isExisting(pvElements.playButtonOverlay.selector); // Capturing the boolean value 
        isExist.should.equal(true); // Verifying the boolean value. If the "play" button is existing then it returns the value "True" else false
        console.log(isExist);
    });

    it('PPE-39176: Verify that CC button is active as in the icon if Video has CC and it is ON', function () {
        var isActive = browser.isExisting(pvElements.ccButton.selector); // Capturing the boolean value for CC button if it is active
        isActive.should.equal(true); //Verifying the boolean value. If the "CC" button is existing then it returns the value "True" else false
        console.log(isActive);
    });

    it('PPE-39175: Verify that CC button is inactive as in the icon if Video has no CC', function () {
        browser.url(input.staging_Marquee_video_player.environment); // Access the URL
        var isDisabled = browser.isExisting(pvElements.ccDisabeled.selector);// Capturing the boolean value 
        isDisabled.should.equal(true); //Verifying the boolean value. If the "CC" button disabled then it returns the value "True" else false
        console.log(isDisabled);
    });

    it('Verify that CC progress bar displayed when the user clicks on "CC" button', function () {
        browser.url(input.staging_ctca.environment);
        browser.pause(90000);        
        pvActions.element_click(pvElements.ccButton.selector);
        browser.moveToObject(pvElements.heroVideoLocator.selector);
        var ccProgressBarDisplay = pvActions.Verify_element_exist(pvElements.ccProgressBar.selector);
        ccProgressBarDisplay.should.equal(true);
    });

    it('Verify the functionlaity of volume button when the user turns it "ON"', function () {
        browser.moveToObject(pvElements.heroVideoLocator.selector);
        var MuteButtonVerification = pvActions.Verify_element_exist(pvElements.volumeUnMute.selector);
        MuteButtonVerification.should.equal(true);
        pvActions.element_click(pvElements.volumeUnMute.selector);
    });

    it('Verify the functionlaity of volume button when the user turns it "OFF"', function () {
        browser.moveToObject(pvElements.heroVideoLocator.selector);
        var unMuteButtonVerification = pvActions.Verify_element_exist(pvElements.volumeMute.selector);
        unMuteButtonVerification.should.equal(true);
    });
});