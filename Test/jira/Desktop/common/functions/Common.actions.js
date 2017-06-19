var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname);
module.exports = {

    // returns the css property for the given element
    get_Text: function(objElement) {
        try {
            return (objElement.getText());
        } catch (error) {
            console.log('Element with selector: ' + objElement.selector + ' is not displayed');
        }
    },
    is_Visible: function(objElement) {
        try {
            return (objElement.isVisible());
        } catch (error) {
            console.log('Element with selector: ' + objElement.selector + ' is not displayed');
        }
    },
    is_Existing: function(objElement) {
        try {
            return (objElement.isExisting());
        } catch (error) {
            console.log('Element with selector: ' + objElement.selector + ' is not Existing');
        }
    },
    elements: function(objElement) {
        try {
            return (objElement.elements());
        } catch (error) {
            console.log('Element with selector: ' + objElement.selector + ' is not Existing');
        }
    },
    verify_Css: function(ele, property) {
        var icon = $(ele);
        var value = icon.getCssProperty(property);

        return value;
    },


    //clicks on an elemnet and retruns the new url value
    //again go back the browser ans switch to frmae
    verify_linkurl: function(locator, url, frame) {
        browser.click(locator);
        browser.pause(60000);
        var curr_URL = browser.getUrl();
        browser.back();
        browser.pause(60000);
        browser.frame(frame);
        return curr_URL;
    }
}