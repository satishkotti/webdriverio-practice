var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe("Verifying video player test cases", function () {

    it('PPE-35293: Verify that Hero video appears below the header section when the CTCA page is loaded', function () {
        browser.url(global.environment); //Access the URL in Chrome browser
        browser.pause(5000); // Wait till the page is loaded
        var herovideovisible = pvActions.Verify_element_exist(pvElements.heroVideoLocator.selector); // Boolean value is retured based on the video player visibility
        herovideovisible.should.equal(true); // Verifying the boolean value captured. if the value is "True" video player is visible else "false" will be returned 
    });

        it('Verify when the Video Hero graphic is displayed the text over the title is saying "You are about to watch" on inital page load', function () {
        browser.scroll(0,300); // scroll the page to view the Hero Video
        var herovideovisible = pvActions.element_gettext(pvElements.videoSubTitle.selector); // Getting the text of the element
        console.log(herovideovisible);
        herovideovisible.should.equal('YOU ARE ABOUT TO WATCH'); // Comaring the text captured with the defined text 
    });

    it('Verify that Now Playing" is displayed once the video starts playing', function () {
        browser.pause(5000);
        var herovideovisible = pvActions.element_gettext(pvElements.videoSubTitle.selector); // Getting the text of the element
        console.log(herovideovisible);
        herovideovisible.should.equal('NOW PLAYING'); // Comaring the text captured with the defined text 
    });

    it('PPE-35294: Verify video has begun playing once the video has loaded', function () {
        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector); // Getting the video current time displayed in the video control bar
        var res = videoCurrentTimetext.split(":"); // Splitting the curent time based on the colon ":" 
        if (res[0] > 0 || res[1] > 0) { //Verifying that mts and seconds values should be greater than "0". If the value is greated than "0" means video already started
            console.log("Video has started alreay started playing" + res);
        }
    });

    it('PPE-48559: Verify that next video of the segment is auto forwarded after the present video completed', function () {
        browser.pause(20000); // Waiting till the first video is completed 
        var firstVideoCurrentTime = pvActions.element_gettext(pvElements.videoCurrentTime.selector); // Getting the video current video running time
        var res = firstVideoCurrentTime.split(":");  // Split video current running time and storing into a array
        if (res[0] > 0 || res[1] > 0) { // Checkiing the hrs and mts of the current running video captured. If the hrs and mts greater than "0" means the video has already started else not started
            console.log("Video has started alreay started playing" + res); // Displaying the current running time of the video
        }
        video1Title = pvActions.element_gettext(pvElements.Video_title.selector); //Getting the title of the current video (First video after the CTCA landing) 
        video1Url = browser.getUrl(); // Getting the first video URL to compare with the second video URL when the video is auto forwarded
        browser.pause(350000); // Waiting till the first video is completed
        var secondVideoCurrentTime = pvActions.element_gettext(pvElements.videoCurrentTime.selector); // Getting the video current video running time (second video)
        var res = secondVideoCurrentTime.split(":"); // Split video current running time and storing into a array (second Video)
        if (res[0] > 0 || res[1] > 0) { // Checkiing the hrs and mts of the second video captured. If the hrs and mts greater than "0" means the video has already started else not started
            console.log("Video has started alreay started playing" + res); //Displaying the current running time of the video
        }
        video2Title = pvActions.element_gettext(pvElements.Video_title.selector); //Getting the title video after the first video is completed running and auto forwarded to next video
        video2Url = browser.getUrl(); // Getting the second video URL to compare with the first video URL 
        console.log(video1Title + "  " + video2Title);
        console.log(video1Url + " " + video2Url);
        expect(video1Title).to.not.equal(video2Title); // Comparing the video titles captured (first and second) and verifying that both are different. When the video is autoforwaded the video title will be changed  
        expect(video1Url).to.not.equal(video2Url); // Comparing the URLs of the first and second video and comparing both are different
    });

    it('PPE-39927: Verify the video starts from the default initial state if the user closes the browser and views the same article', function () {
        // Verifying the video starts from the default state
        browser.click("//div[@class='vjs-play-control vjs-control vjs-paused']");
        browser.moveToObject("//div[@class='akamai-play akamai-overlay']");
        //pvActions.element_click(pvElements.pauseButton.selector);        
        //browser.moveToObject(pvElements.playButtonOverlay.selector);

        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video       
        for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
            browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
            var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
            if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                console.log("Video has started alreay started playing" + res);  // Displaying the current video time
                break; // Once the condition is met break the loop and will come out of the loop
            }
        }

        browser.url(input.staging_ctca.environment); // Access the URL
        //Verifying that video has already started and the "Play" button state is changed when the browser is closed and reopened 
        browser.pause(5000); // Keep the browser in waiting state till the page is loaded completely
        //var playButtonVisible = pvActions.Verify_element_exist(pvElements.pauseButton.selector);
        var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that boolean value is captured for play button 
        playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed""

        // Verifying the video starts from the default state once the browser is closed and re opened
        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
        for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
            browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
            var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
            if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                console.log("Video has started alreay started playing" + res);  // Displaying the current video time
                break; // Once the condition is met break the loop and will come out of the loop
            }
        }
    });

    it('PPE-39028: Verify the play button superimposed over the video When the video is displayed in the Collapsed state and paused', function () {
        browser.scroll(100, 100); // Initially the Marquee video is displayed in large mode. to make it small as per the functionality we need to scrroll the page
        pvActions.element_click(MarqueeVideoElements.marqueeVideoSmallLargePlayer.selector); // Clicking on the Marquee video player to pause the video
        var playButtonOverlayDisplay = pvActions.Verify_element_exist(pvElements.playButtonOverlay.selector); // Verify that "Play" button is super imposed on the video player
        playButtonOverlayDisplay.should.equal(true); // Verifying the boolean value captured in the aboev statement. If the value is "True" play button is super imposed else not imposed
    });

    it('PPE-46560: Verify that video is auto played when the user cleared the cache and rendered any page having video', function () {
        browser.deleteCookie();
        browser.refresh();
        // Verifying the video starts from the default state once the browser cahce is cleared and refreshed the page
        var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
        for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
            browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
            var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
            if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                console.log("Video has started alreay started playing" + res);  // Displaying the current video time
                break; // Once the condition is met break the loop and will come out of the loop
            }
        }
        it('PPE-46553: Verify that video in the page is not auto played if the video in the header has been started in the session', function () {
            browser.url(global.emvironment); // Access the premium video URL 
            pvActions.element_click(MarqueeVideoElements.gridPersonalizedMedicine.selector); // Clicking on the Grid element "Personalized Medicine"
            browser.pause(5000); // Wai till the page is loaded and video starts playing

            //Verifying that video has already started and the "Play" button state is changed
            browser.pause(5000); // Keep the browser in waiting state till the page is loaded completely
            //var playButtonVisible = pvActions.Verify_element_exist(pvElements.pauseButton.selector);
            var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that play button is visible or not and boolean value is captured in the variable "playButtonVisible" 
            playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed"

            // Verifying the video starts from the default state
            var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
            for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
                browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
                var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
                if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                    console.log("Video has started alreay started playing" + res);  // Displaying the current video time
                    break; // Once the condition is met break the loop and will come out of the loop
                }
            }
            pvActions.element_click(pvElements.Cutting_edge_cancer_title.selector)// Clicking on the CTCA destination appears on the masthead
            pvActions.element_click(MarqueeVideoElements.gridSupportForMindAndSpirit.selector); // Clicking on another Grid element appears in the CTCA toc page

            //Verifying that video has already started and the "Play" button state is changed in the Marquee Video
            browser.pause(5000); // Keep the browser in waiting state till the page is loaded completely
            //var playButtonVisible = pvActions.Verify_element_exist(pvElements.pauseButton.selector);
            var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that play button is visible or not and boolean value is captured in the variable "playButtonVisible" 
            playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed"

            // Verifying the video starts from the default state
            var videoCurrentTimetext = pvActions.element_gettext(pvElements.videoCurrentTime.selector);    // Getting the currennt running time of the video
            for (i = 0; i <= 50; i++) { // Looping is used to verify that the current time mentioned in if condition on every iteration
                browser.pause(1000);    // Keep the browser in waitng state for a second for every iteration
                var res = videoCurrentTimetext.split(":");  // Getting the current running time of the video and splitting it to hrs and mints
                if (res[0] > 0 || res[1] > 0) { // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                    console.log("Video has started alreay started playing" + res);  // Displaying the current video time
                    break; // Once the condition is met break the loop and will come out of the loop
                }
            }

            // Verify that video is not auto played if the video in the header has been started in the session
            pvActions.element_click(pvElements.Cutting_edge_cancer_title.selector)// Clicking on the CTCA destination appears on the masthead
            pvActions.element_click(MarqueeVideoElements.gridPersonalizedMedicine.selector); // Clicking on the Grid element "Personalized Medicine" in CTCA page

            browser.pause(25000); // Keep the browser in waiting state till the page is loaded completely
            var playButtonVisible = pvActions.Verify_element_exist(pvElements.playButtonOverlay.selector); // Verify that "Play" overlays displayed and not doesnot disappear
            //var playButtonVisible = pvActions.Verify_element_exist(MarqueeVideoElements.pauseButton.selector); // Verify that boolean value is captured for play button 
            playButtonVisible.should.equal(true);   // Verifying boolean value captured. If the boolean value captured as "True" test case is passsed else "Failed"
        });
    });

    it('PPE-28626: Verify the video contolbar slides up when the user mouses over the video player', function () {
        browser.url(input.staging_ctca.environment); // Access the URL
        browser.pause(5000); // Wait till the page is loaded completely
        browser.moveToObject(pvElements.heroVideoLocator.selector); // Focusing the cursor on a element
        var herovideovisible = pvActions.Verify_element_exist(pvElements.dynamicToolbar.selector); // Passing the boolean value based on the visibility of the object
        herovideovisible.should.equal(true); // Verifying the boolean value captured. if the value is "True" video controlbar is visible else "false" will be returned 
    });

    it('PPE-67000: Verify that play button overlay is seen when the user pauses the video', function () {
        browser.refresh(); // Refreshes the page to pause the video
        browser.pause(5000); // Keep the browser in waiting state
        var playButtonOverlayDisplay = pvActions.Verify_element_exist(pvElements.playButtonOverlay.selector); //Passing the boolean value based on the visibility of the object
        playButtonOverlayDisplay.should.equal(true); // Verifying the boolean value captured. if the value is "True" play button overlay is visible else "false" will be returned 
    });
    it('PPE-76213: Verify that “Play” button should not disappear when the user hovers over the play button', function () {
        browser.moveToObject(pvElements.playButtonOverlay.selector);// Focusing the cursor on a element
        var playButtonOverlayDisplay = pvActions.Verify_element_exist(pvElements.playButtonOverlay.selector); //Passing the boolean value based on the visibility of the object
        playButtonOverlayDisplay.should.equal(true); // Verifying the boolean value captured. if the value is "True" play button overlay is not disappeared else "false" will be returned 
    });
});