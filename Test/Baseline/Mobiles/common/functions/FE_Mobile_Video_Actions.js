var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var argv = require("yargs").argv;
var assert = require("assert");
var videoElements = require('./../../common/elements/FE_Mobile_video_Elements');
module.exports = {
    //checks visibility of Element present on the page
    Element_visibility: function(element) {
        var Element_visible = browser.isVisible(element);
        return Element_visible;
    },
    //checks functionality of the Element present on the page
    check_working_of_Element: function(element, closebutton) {
        browser.click(element);
        browser.scroll(0, 500);
        browser.click(closebutton);
    },
    //This Method will click an Icon that opens up a new child Window and return the Title of the child Window 
    Click_Elements: function(Icons, scroll_value) {
        browser.scroll(scroll_value);
        browser.pause(4000);
        // This will click on icons
        browser.waitForVisible(Icons);
        browser.click(Icons);
        browser.pause(4000);
        var handle = browser.windowHandles();
        browser.window(handle.value[1]);
        var Page_title_Text = browser.getTitle();
        browser.close(handle[1]);
        var actions = {
            Page_title_Text: Page_title_Text,
        }
        return actions;
    },
    //checks functionality of the full screen button  present on the video control bar
    check_working_of_full_screen_button: function() {
        var normal_height = browser.getCssProperty(videoElements.akamai_video.selector, 'height');
        browser.click(videoElements.fullscreen_button.selector);
        var full_screen_height = browser.getCssProperty(videoElements.akamai_video.selector, 'height');
        browser.click(videoElements.fullscreen_button.selector);
        return full_screen_height.parsed.value;
    },
    currentVideoTimestampVerification: function() {
        //browser.pause(3000);
        browser.click(videoElements.play_button.selector);
        browser.pause(20000);
        for (i = 0; i <= 50; i++) // Looping is used to verify that the current time mentioned in if condition on every iteration
        {
            //browser.moveToObject(videoElements.akamai_video.selector);
            var currentTime = browser.getText(videoElements.current_time.selector);
            //console.log("current Time" + currentTime);
            var currentVideoTimestamp = currentTime.split(":"); // Getting the current running time of the video and splitting it to hrs and mints
            if (currentVideoTimestamp[1] > 01 || currentVideoTimestamp[1] < 05) {
                // Checking the condition that mts or sec are greater than "0". if the seconds nuber is greate than "0" means that video has already started
                return (currentVideoTimestamp[1]); // Displaying the current video time
                break; // Once the condition is met break the loop and will come out of the loop
            } else {
                return (currentVideoTimestamp[1]);
            }
        }
    },
}