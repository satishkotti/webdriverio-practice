var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe("Verify the content of the CTCA TOC page", function () {

    it('Verify that header section is displayed as the first module in the CTCA TOC page', function () {
        browser.url(input.staging_ctca.environment); // Accessing the CTCA URL
        var mastheadVisibility = pvActions.Verify_element_exist(pvElements.masthead.selector); // Passing the boolean value based on the masthead visibility
        mastheadVisibility.should.equal(true);// Verifying the boolean value. if the value is "True" masthead is visible else doesn't visible         
    });

    it('Verify that Hero Video module is displayed in the CTCA TOC page', function () {
        var heroVideoVisibility = pvActions.Verify_element_exist(pvElements.heroVideoLocator.selector); // Passing the boolean value based on the hero module visibility
        heroVideoVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" hero video module is displayed else doesn't         
    });

    it('Verify that filmstrip module is displayed in the CTCA TOC page', function () {
        var filmstripVisibility = pvActions.Verify_element_exist(pvElements.filmstrip.selector);  // Passing the boolean value based on the filmstrip visibility
        filmstripVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" filmstrip is visible else doesn't visible         
    });

    //AD unit test cases need to be added 
    // it('Verify that Ad unit is displayed in the CTCA TOC page', function () {        
    //     browser.scroll(0,1000);
    //     browser.pause(25000);
    //     var baseIFrame = browser.getAttribute('#bannerAd_fmt iframe', 'id');
    //     //browser.frame("//div[contains(@id,'ads2-pos-101')]//iframe");
    //     browser.frame(baseIFrame);
    //     console.log(browser.getAttribut("//div[contains(@id,'ebDiv')]//img", 'src'));
    //     console.log(browser.getAttribute("//div[contains(@id,'DfaVisibilityIdentifier')]//iframe", "src"));    
    // });

    it('Verify that 8 tiles grid module is displayed in the CTCA TOC page', function () {        
        var tocGrid8ElemetsVisibility = pvActions.Verify_element_exist(pvElements.tocGrid8Elemets.selector);  // Passing the boolean value based on the 8 tile grid visibility
         tocGrid8ElemetsVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" 8 tile grod module is visible else doesn't visible         
    });

    it('Verify that 7 tiles grid module is displayed in the CTCA TOC page', function () {
        var tocGrid8ElemetsVisibility = pvActions.Verify_element_exist(pvElements.tocGrid7Elemets.selector);  // Passing the boolean value based on the 7 tile grid visibility
        tocGrid8ElemetsVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" 7 tile grod module is visible else doesn't visible         
    });

    it('Verify that See All is displayed above the 8 tiles grid module in the CTCA TOC page', function () {
        var grid8ContentSeeAllVisibility = pvActions.Verify_element_exist(pvElements.grid8ContentSeeAll.selector); // Passing the boolean value based on the See All element is visible above the 8 tile grid module
        grid8ContentSeeAllVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" See All element appears above 8 tile grid module else doesn't visible         
    });

    it('Verify that See All is displayed above the 7 tiles grid module in the CTCA TOC page', function () {
        var grid7ContentSeeAllVisibility = pvActions.Verify_element_exist(pvElements.grid7ContentSeeAll.selector); // Passing the boolean value based on the See All element is visible above the 7 tile grid module
        grid7ContentSeeAllVisibility.should.equal(true); // Verifying the boolean value. if the value is "True" See All element appears above 7 tile grid module else doesn't visible
    });
});
