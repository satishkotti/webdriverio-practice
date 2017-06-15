var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var assert = require("assert");
var icmElements = require('../elements/FE_Mobile_ICM_Elements');
module.exports = {
    //Description: This method is used to click on the element. 
    //params: Element locator value
    check_element_is_clickable: function(element) {
        browser.leftClick(element);
        browser.pause(2000);
    },
    //Description: This method is used to check whether ICM_Sponsored is working or not.
    //params: Element locator value
    ICM_Sponsored_working: function(ICM_sponsored) {
        var icm = browser.click(ICM_sponsored);
        browser.pause(2000);
        browser.click(icmElements.icm_sponsored_popup.selector);
        browser.pause(2000);
    },
    //Description: This method is used to check whether upperlinks are visible or not.
    upperlinks_are_visible: function(upperlinks) {
        var upper_link_visibility = browser.isVisible(upperlinks);
        assert.equal(upper_link_visibility, true)
            //var icm = browser.click(upperlinks);
    },
    //Description: This method is used to check whether lowerlinks are clickable or not.
    lowerlinks_are_clickable: function(lowerlinks) {
        var lowerlinks = browser.click(lowerlinks);
        browser.pause(6000);
        var title = browser.getTitle();
        assert.equal(title, 'Our Products - Lipo Flavonoid');
        browser.back();
    },
    //Description: This method is used to check whether brand_imag eis working  or not.
    brand_image_working: function(brand_image) {
        var brand_image = browser.click(brand_image);
        var title = browser.getTitle();
        if (title == 'Responsive ICM Test Page') {
            console.log("brand_image is not clickable");
        };
        browser.pause(2000);
    }
}