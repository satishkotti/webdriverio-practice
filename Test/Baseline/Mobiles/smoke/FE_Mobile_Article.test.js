var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname);
var argv = require("yargs").argv;
var Actions = require('../common/functions/FE_Mobile_Aricle_Actions');
var Elements = require('../common/elements/FE_Mobile_Article_Elements');
var input = require('../config/FE_Mobile.testdata')[argv.env];
var Twitter_Page_Title = 'Post a Tweet on Twitter';
var Facebook_Page_Title = 'Facebook';
var Pintrest_Page_Title = 'Pinterest ? The world?s catalog of ideas';

describe('FE Smoke test of Article page', function() {
    // var url = 'http://www.webmd.com/osteoarthritis/knee-pain-16/knee-pain-dos-and-donts';
    var url = input.Article_url;
    browser.url(url);
    browser.pause(40000)
    it.skip('Validation of elements on article page', function() {

        var elements_visible = {
            "elements": [{ "locator": Elements.masthead_burger.selector, "scroll": Elements.masthead_burger.selector, "visibility": true },
                { "locator": Elements.masthead_logo.selector, "scroll": Elements.masthead_logo.selector, "visibility": true },
                { "locator": Elements.masthead_search.selector, "scroll": Elements.masthead_search.selector, "visibility": true },
                // { "locator": Elements.TopAd.selector, "scroll": Elements.TopAd.selector, "visibility": true },
                { "locator": Elements.Breadcrumb.selector, "scroll": Elements.Breadcrumb.selector, "visibility": true },
                { "locator": Elements.LOE.selector, "scroll": Elements.LOE.selector, "visibility": true },
                { "locator": Elements.twitter.selector, "scroll": Elements.twitter.selector, "visibility": true },
                { "locator": Elements.pintrest.selector, "scroll": Elements.pintrest.selector, "visibility": true },
                { "locator": Elements.facebook.selector, "scroll": Elements.facebook.selector, "visibility": true },
                { "locator": Elements.email.selector, "scroll": Elements.facebook.selector, "visibility": true },
                { "locator": Elements.kabob.selector, "scroll": Elements.kabob.selector, "visibility": true },
                { "locator": Elements.footer_pintrest.selector, "scroll": Elements.footer_pintrest.selector, "visibility": true },
                { "locator": Elements.sticky_Header_twitter.selector, "scroll": Elements.sticky_Header_twitter.selector, "visibility": true },
                { "locator": Elements.sticky_Header_pintrest.selector, "scroll": Elements.sticky_Header_pintrest.selector, "visibility": true },
                { "locator": Elements.sticky_Header_facebook.selector, "scroll": Elements.sticky_Header_facebook.selector, "visibility": true },
                // { "locator": Elements.sticky_Header_email.selector, "scroll": Elements.sticky_Header_email.selector, "visibility": true },
                // { "locator": Elements.sticky_kabob.selector, "scroll": Elements.sticky_kabob.selector, "visibility": true },
                { "locator": Elements.paddle_next.selector, "scroll": Elements.paddle_next.selector, "visibility": true },
                // { "locator": Elements.paddle_previous.selector, "scroll": Elements.paddle_previous.selector, "visibility": true },
                { "locator": Elements.footer_facebook.selector, "scroll": Elements.footer_facebook.selector, "visibility": true },
                { "locator": Elements.paddle_previous_page_title.selector, "scroll": Elements.paddle_previous_page_title.selector, "visibility": true },
                // { "locator": Elements.paddle_next_page_title.selector, "scroll": Elements.paddle_next_page_title.selector, "visibility": true },
                { "locator": Elements.footer_email.selector, "scroll": Elements.footer_facebook.selector, "visibility": true },
                { "locator": Elements.bottom_ad_rdr.selector, "scroll": Elements.bottom_ad_rdr.selector, "visibility": true },
                { "locator": Elements.lazy_load_ad.selector, "scroll": Elements.lazy_load_ad.selector, "visibility": true },
                { "locator": Elements.footer_head.selector, "scroll": Elements.footer_head.selector, "visibility": true },
                { "locator": Elements.footer_reviewed.selector, "scroll": Elements.footer_reviewed.selector, "visibility": true },
                { "locator": Elements.footer_sources.selector, "scroll": Elements.footer_sources.selector, "visibility": true },
                { "locator": Elements.footer_copyright.selector, "scroll": Elements.footer_copyright.selector, "visibility": true },
                { "locator": Elements.footer_twitter.selector, "scroll": Elements.footer_twitter.selector, "visibility": true }
            ]
        };

        Actions.Verify_ElementIsVisible(elements_visible);
    })

    /*  Validating the MastHead Navigatons */

    it("Validatig Masthead A-Z", function() {
        var linktext = "HEALTH\nA-Z";
        var newUrl = "http://www.staging.webmd.com/a-to-z-guides/common-topics";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.HealthA_Z.selector, linktext, newUrl)

    })


    it("Validatig Masthead Drug & Supplements ", function() {
        var linktext = "DRUGS &\nSUPPLEMENTS";
        var newUrl = "http://www.staging.webmd.com/drugs/index-drugs.aspx";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Drugs_Supplements.selector, linktext, newUrl)

    })

    it("Validatig Masthead for Living and Healthy ", function() {
        var linktext = "LIVING\nHEALTHY";
        var newUrl = "http://www.staging.webmd.com/living-healthy";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Living_healthy.selector, linktext, newUrl)

    })
    it("Validatig Masthead for family and pregnancy ", function() {
        var linktext = "FAMILY &\nPREGNANCY";
        var newUrl = "http://www.staging.webmd.com/family-pregnancy";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Family_Pregnancy.selector, linktext, newUrl)


    })
    it("Validatig Masthead for news and experts ", function() {
        var linktext = "NEWS &\nEXPERTS";
        var newUrl = "http://www.staging.webmd.com/news/default.htm";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.News_Experts.selector, linktext, newUrl)

    })
    it("Validatig Masthead for mobile apps ", function() {
        var linktext = "MOBILE &\nAPPS";
        var newUrl = "http://www.m.webmd.com/mobile";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Mobile_Apps.selector, linktext, newUrl)

    })

    //Verify the Breadcrumb title

    it("Validation for Breadcrumb Text", function() {

            var name1 = 'SEGMENT 1'
            var text = browser.getText(Elements.Breadcrumb.selector);
            text.should.equal(name1);
            browser.click(Elements.Breadcrumb.selector);
            browser.pause(4000);
            var TOC_Page_title_Text = browser.getUrl();
            browser.back();
            browser.pause(3000);
            TOC_Page_title_Text.should.containEql('default.htm');

        })
        // ------------------ Validation for All social share validations here---------------------------------------------------------------//

    it("Validatig Twitter Icon and Opening new window on click", function() {

        var actions = Actions.Socialshare_validations(Elements.twitter.selector, Elements.twitter.selector)
        actions.Page_title_Text.should.equal(Twitter_Page_Title)

    });

    it("Validatig FB Icon and Opening new window on click", function() {
        var actions = Actions.Socialshare_validations(Elements.facebook.selector, Elements.facebook.selector)
        actions.Page_title_Text.should.equal(Facebook_Page_Title)

    })

    it("Validatig Pinterest Icon and Opening new window on click", function() {
        var actions = Actions.Socialshare_validations(Elements.pintrest.selector, Elements.pintrest.selector)
        actions.Page_title_Text.should.equal(Pintrest_Page_Title)
    })
    it("Validation for footer twitter when user clicks on footer twitter and it will opens in new window", function() {
        var actions = Actions.Socialshare_validations(Elements.footer_twitter.selector, Elements.footer_twitter.selector)
        actions.Page_title_Text.should.equal(Twitter_Page_Title)

    })

    it("Validation for footer Facebook when user clicks on footer Facebook and it will opens in new window", function() {
        var actions = Actions.Socialshare_validations(Elements.footer_facebook.selector, Elements.footer_facebook.selector)
        actions.Page_title_Text.should.equal(Facebook_Page_Title)

    })

    it("Validation for footer Pintrest when user clicks on footer Pintrest and it will opens in new window", function() {
        var actions = Actions.Socialshare_validations(Elements.footer_pintrest.selector, Elements.footer_pintrest.selector)
        actions.Page_title_Text.should.equal(Pintrest_Page_Title)

    })
    it("Validation for sticky header twitter when user clicks on sticky header twitter and it will opens in new window", function() {
        var actions = Actions.Socialshare_validations(Elements.sticky_Header_twitter.selector, Elements.sticky_Header_twitter.selector)
        actions.Page_title_Text.should.equal(Twitter_Page_Title)

    })

    it("Validation for sticky header Facebook when user clicks on sticky header Facebook and it will opens in new window", function() {

        var actions = Actions.Socialshare_validations(Elements.sticky_Header_facebook.selector, Elements.sticky_Header_facebook.selector)
        actions.Page_title_Text.should.equal(Facebook_Page_Title)

    })

    it("Validation for sticky header Pintrest when user clicks on sticky header Pintrest and it will opens in new window", function() {
        var actions = Actions.Socialshare_validations(Elements.sticky_Header_pintrest.selector, Elements.sticky_Header_pintrest.selector)
        actions.Page_title_Text.should.equal(Pintrest_Page_Title)


    })

    //--Paddle Navigation

    //Paddle naviagtion validations -- Previous
    it.skip("Validation for paddle navigation to previous Item in a new browser", function() {
        var actions = Actions.Paddle_Navigation(Elements.Paddles.selector, Elements.paddle_previous_page_title.selector, Elements.paddle_previous.selector)
        actions.Page_title_Text.should.equal(actions.paddle_page_title_text)

    })

    //Paddle naviagtion validations -- Next
    it("Validation for paddle navigation to Next Item in a new browser", function() {
        var actions = Actions.Paddle_Navigation(Elements.Paddles.selector, Elements.paddle_next_page_title_text.selector, Elements.paddle_next.selector)
        actions.Page_title_Text.should.equal(actions.paddle_page_title_text)

    })

    //-- Validation for kabob--------
    it("Validation for kabob", function() {

        browser.scroll(kabob)
        browser.waitForVisible(kabob)
        browser.click(kabob)
        var visibile
        visibile = browser.isVisible(kabob_segment)
        visibile.should.equal(true)
        visibile = browser.isVisible(kabob_subhead)
        visibile.should.equal(true)
        visibile = browser.isVisible(kabob_seeall)
        visibile.should.equal(true)
        visibile = browser.isVisible(kabob_close)
        visibile.should.equal(true)
        browser.click(kabob_close)
        visibile = browser.isVisible(kabob_close)
        visibile.should.equal(false)
            .end()
    })
});