var webdriverio = require('webdriverio');
var should = require('should');
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe("Verifying the Marquee Video Player test cases", function () {
    it('PPE-39927: Verify the video starts from the default initial state if the user closes the browser and views the same article', function () {
        browser.url(input.staging_Marquee_video_player.environment); // Accessing the Marquee Video URL
        browser.pause(20000);
        browser.moveToObject(pvElements.largeVideo.selector);
        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video       
        var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
        if (res[0] > 0 && res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
            console.log("Video has started playing already" + videoCurrentTimetext);  // Displaying the current video time          
            browser.pause(5000);
        }
        else {
            console.log("Video has not started playing", res);
        }
    });
}); // As "browser.close" is not working. So the test case is closed here and reopening again

describe("Verifying the Marquee Video Player test cases by reopening the same page which is closed in the above step", function () {
    it('PPE-39927: Verify the video starts from the default initial state if the user closes the browser and views the same article', function () {
        browser.pause(2000);
        browser.url(input.staging_Marquee_video_player.environment); // Accessing the Marquee Video URL
        //browser.close();
        //browser.url(input.staging_Marquee_video_player.environment);
        browser.pause(20000);
        for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
            var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video       
            var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
            if (res[1] == 1) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                console.log("Video has started from the initial stage" + res);  // Displaying the current video time
                break; // Once the condition is met break the loop and will come out of the loop
            }
        }
    });




    // it('PPE-39028: Verify the play button superimposed over the video When the video is displayed in the Collapsed state and paused', function () {
    //     browser.scroll(100, 100); // Initially the Marquee video is displayed in large mode. to make it small as per the functionality we need to scrroll the page
    //     pvActions.element_click(MarqueeVideoElements.marqueeVideoSmallLargePlayer.selector); // Clicking on the Marquee video player to pause the video
    //     var playButtonOverlayDisplay = pvActions.Verify_element_exist(pvElements.playButtonOverlay.selector); // Verify that "Play" button is super imposed on the video player
    //     playButtonOverlayDisplay.should.equal(true); // Verifying the boolean value captured in the aboev statement. If the value is "True" play button is super imposed else not imposed
    // });


    // it('PPE-46560: Verify that video is auto played when the user cleared the cache and rendered any page having video', function () {
    //     browser.deleteCookie();
    //     browser.refresh();
    //     // Verifying the video starts from the default state once the browser cahce is cleared and refreshed the page
    //     var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
    //     for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
    //         browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
    //         var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
    //         if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
    //             console.log("Video has started alreay started playing" + res);  // Displaying the current video time
    //             break; // Once the condition is met break the loop and will come out of the loop
    //         }
    //     }
    // });
    // browser.close()
    // it('PPE-46553: Verify that video in the page is not auto played if the video in the header has been started in the session', function () {
    //     browser.url(global.emvironment); // Access the premium video URL 
    //     pvActions.element_click(MarqueeVideoElements.gridPersonalizedMedicine.selector); // Clicking on the Grid element "Personalized Medicine"
    //     browser.pause(5000); // Wai till the page is loaded and video starts playing

    //     //Verifying that video has already started and the "Play" button state is changed
    //     browser.pause(5000); // Keep the browser in waiting state till the page is loaded completely
    //     //var playButtonVisible = pvActions.Verify_element_exist(pvElements.pauseButton.selector);
    //     var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that play button is visible or not and boolean value is captured in the variable "playButtonVisible" 
    //     playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed"

    //     // Verifying the video starts from the default state
    //     var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
    //     for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
    //         browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
    //         var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
    //         if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
    //             console.log("Video has started alreay started playing" + res);  // Displaying the current video time
    //             break; // Once the condition is met break the loop and will come out of the loop
    //         }
    //     }
    //     pvActions.element_click(pvElements.Cutting_edge_cancer_title.selector)// Clicking on the CTCA destination appears on the masthead
    //     pvActions.element_click(MarqueeVideoElements.gridSupportForMindAndSpirit.selector); // Clicking on another Grid element appears in the CTCA toc page

    //     //Verifying that video has already started and the "Play" button state is changed in the Marquee Video
    //     browser.pause(5000); // Keep the browser in waiting state till the page is loaded completely
    //     //var playButtonVisible = pvActions.Verify_element_exist(pvElements.pauseButton.selector);
    //     var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that play button is visible or not and boolean value is captured in the variable "playButtonVisible" 
    //     playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed"

    //     // Verifying the video starts from the default state
    //     var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
    //     for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
    //         browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
    //         var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
    //         if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
    //             console.log("Video has started alreay started playing" + res);  // Displaying the current video time
    //             break; // Once the condition is met break the loop and will come out of the loop
    //         }
    //     }

    //     // Verify that video is not auto played if the video in the header has been started in the session
    //     pvActions.element_click(pvElements.Cutting_edge_cancer_title.selector)// Clicking on the CTCA destination appears on the masthead
    //     pvActions.element_click(MarqueeVideoElements.gridPersonalizedMedicine.selector); // Clicking on the Grid element "Personalized Medicine" in CTCA page

    //     browser.pause(25000); // Keep the browser in waiting state till the page is loaded completely
    //     var playButtonVisible = pvActions.Verify_element_exist(pvElements.playButtonOverlay.selector); // Verify that "Play" overlays displayed and not doesnot disappear
    //     //var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that boolean value is captured for play button 
    //     playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed"
    // });
});