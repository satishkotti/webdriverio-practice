var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
//var argv = require("yargs").argv;
var pvElements = require('./../elements/Premium_Video_Elements');
//var Input = require('./../../config/PPE-101689.data')[argv.env];

module.exports = {
    //function to check the visibility of the element
    Verify_element_exist: function (eleSelector) {
        try {
            return browser.isVisible(eleSelector);
        }
        catch (error) {
            console.log('Element with selector: ' + eleSelector + ' is not displayed');
        }
    },
    //function to get the text from a element
    element_gettext: function (eleSelector) {
        try {
            return browser.getText(eleSelector);
        }
        catch (error) {
            console.log('Element with selector: ' + eleSelector + ' is not displayed');
        }
    },
    //function to click on a element
    element_click: function (eleSelector) {
        try {
            return browser.click(eleSelector);
        }
        catch (error) {
            console.log('Element with selector: ' + eleSelector + ' is not displayed');
        }
    },

    // function to verify the video has already started playing
    isVideoRunning: function (eleSelector) {
        //element_gettext();
        var videoCurrentTimetext = browser.getText(eleSelector); // Getting the video current time displayed in the video control bar
        var res = videoCurrentTimetext.split(":"); // Splitting the curent time based on the colon ":" 
        var urlCapturedonInitialLoad = browser.getUrl();
        if (res[0] > 0 || res[1] > 0) { //Verifying that mts and seconds values should be greater than "0". If the value is greated than "0" means video already started
            console.log("Video has alreay started playing" + res);
        }
    },

    popUpDisplay: function () {
        if(browser.isExisting(pvElements.popup.selector))
               {
                pvActions.element_click(pvElements.popupClose.selector);
               }
        },
    }
