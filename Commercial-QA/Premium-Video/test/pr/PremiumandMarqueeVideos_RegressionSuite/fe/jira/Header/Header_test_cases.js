var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var pvActions = require('./../../../common/functions/Premium_Video_Actions');
var pvElements = require('./../../../common/elements/Premium_Video_Elements');
var input = require('./../../../config/Premium_Video_TestData');

describe('Verify the headers in the Premium Video Page destination is sticky', function () {

    it('PPE-35316: Verify the headers in the Premium Video Page destination are sticky', function () {
        browser.url(input.staging_ctca.environment) // Access the URL
        var stickyheader = pvActions.Verify_element_exist(pvElements.masthead.selector); // Passing the boolean value based on the availaboility of the sticky masthead
        stickyheader.should.equal(true); // True is passed if the sticky masthead is displayed else 'false' will be captured 
    });

    it('PPE-35317: Verify whether the header is staying in place when the page is scrolled', function () {
        var headerLocationBeforeScrolling = browser.getLocationInView(pvElements.masthead.selector);
        console.log(headerLocationBeforeScrolling);
        browser.scroll(0, 500);
        var headerLocationAfterScrolling = browser.getLocationInView(pvElements.masthead.selector);
        console.log(headerLocationAfterScrolling);
        headerLocationBeforeScrolling.toString().should.equal(headerLocationAfterScrolling.toString());
    });
});

describe('PPE-61051: Verify that “WebMD” logo appears at the top leftmost corner of the header section and text ‘presents’ appears below it', function () {

    it('PPE-69274: Verify that "WebMD" logo displayed top left corner of the masthead', function () {
        browser.url(input.staging_ctca.environment) // Access the URL
        var webmd_title_captured = pvActions.Verify_element_exist(pvElements.webmdLogo.selector);
        webmd_title_captured.should.equal(true);
    });

    it('Verify that the user is navigated to appropriate page upon clicking on the “WebMD" logo', function () {
        pvActions.element_click(pvElements.webmdLogo.selector);
        var homePageUrl = browser.getUrl();
        homePageUrl.should.equal("http://www.staging.webmd.com/");
        browser.url(input.staging_ctca.environment);
    });

    it('Verify that ‘presents’ text appears below the "WebMD" logo', function () {
        var presentsText = pvActions.element_gettext(pvElements.presentsText.selector);
        presentsText.should.equal("PRESENTS");
    });
});

describe('PPE-60273: Verify that “THE CUTTING EDGE OF CANCER” link appears next to “WebMD” logo', function () {

    it('Verify that “THE CUTTING EDGE OF CANCER” link appears next to “WebMD” logo', function () {
        browser.url(input.staging_ctca.environment) // Access the URL
        expect(browser.isExisting(pvElements.ctcaDestinationLink.selector)).to.be.true;
    });

    it('Verify that “THE CUTTING EDGE OF CANCER” appears as link', function () {
        expect(browser.isExisting(pvElements.ctcaLinkVerification.selector)).to.be.true;
    });

    it('Verify the color of the "THE CUTTING EDGE OF CANCER" destination link', function () {
        var ctcaDestinationTextColor = browser.getCssProperty(pvElements.ctcaDestinationLink.selector, 'color').parsed.hex;
        ctcaDestinationTextColor.should.equal("#8bb0b0");
    });

    it('Verify that user is navigated to CTCA destination page upon clicking "THE CUTTING EDGE OF CANCER" link in the header section', function () {
        pvActions.element_click(pvElements.ctcaDestinationLink.selector);
        var destinationPageURL = browser.getUrl();
        destinationPageURL.should.equal("http://www.staging.webmd.com/cancer/cutting-edge-16/video-targeted-cancer-therapy-robin-roberts");
    });

    it('temp', function () {
        var tamp = browser.getText("//div[@class='masthead-center clearfix']//div[2]");
        console.log(tamp);
    });
});

// describe('Verify the sponsor informaiton displayed at top right side of the masthead', function () {

//     it('Verify that "Supported by" text displayed in CTCA header section', function () {
//         browser.url(input.staging_ctca.environment);
//         var sponsoredText = pvActions.Verify_element_exist(pvElements.sponsoredByLink.selector);
//         sponsoredText.should.equal(true);
//     });

//     it('Verify that sponsored logo displayed in the CTCA header section', function () {
//         var sponsoredByLogo = pvActions.Verify_element_exist(pvElements.sponsoredByLogo.selector);
//         sponsoredByLogo.should.equal(true);
//     });

//     it('Verify that "Advertisement:" text displayed in the CTCA header section', function () {
//         var adLabelText = pvActions.element_gettext(pvElements.adLabel.selector);
//         adLabelText.should.equal('Advertisement:')
//     });

//     it('Verify that "Learn more about" text displayed in the CTCA header section', function () {
//         var learnMoreAboutText = pvActions.element_gettext(pvElements.learnMoreAbout.selector);
//         learnMoreAboutText.should.equal('Learn more about')
//     });

//     it('Verify that "cancer treatment options" text displayed in the CTCA header section', function () {
//         var cancerTreatmentOptionsText = pvActions.element_gettext(pvElements.cancerTreatmentOptions.selector);
//         cancerTreatmentOptionsText.should.equal('cancer treatment options')
//     });

//     it('Verify that pop up is displayed upon clicking the "cancer treatment options" link or "Supported by" text', function () {
//         pvActions.element_click(pvElements.sponsoredByLink.selector);
//         var popUpDisplay = pvActions.Verify_element_exist(pvElements.popup.selector);
//         popUpDisplay.should.equal(true);
//         pvActions.element_click(pvElements.popupClose.selector);
//         pvActions.element_click(pvElements.cancerTreatmentOptions.selector);
//         var popUpDisplay = pvActions.Verify_element_exist(pvElements.popup.selector);
//         popUpDisplay.should.equal(true);
//         pvActions.element_click(pvElements.popupClose.selector);
//     });
//});
