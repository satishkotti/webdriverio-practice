var webdriverio = require('webdriverio')
var should = require('should')
var path = require('path')
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var Actions = require('./../../../common/functions/FE_Mobile_Aricle_Actions')
var Elements = require('./../../../common/elements/FE_Mobile_Article_Elements')
var input = require('./../../../config/FE_Mobile.testdata')[argv.env];
var Twitter_Page_Title = 'Post a Tweet on Twitter';
var Facebook_Page_Title = 'Facebook';
var Pintrest_Page_Title = 'Pinterest';

describe('FE Smoke test of Article page', function () {
    this.timeout(0)

    var url = input.article_url;

    browser
        .url(url);
    browser.pause(20000);
    
    it.only('Validation of elements on article page', function () {

        var elements_visible = {
            "elements": [{ "locator": Elements.masthead_burger.selector, "scroll": Elements.masthead_burger.selector, "visibility": true },
            { "locator": Elements.masthead_logo.selector, "scroll": Elements.masthead_logo.selector, "visibility": true },
            { "locator": Elements.masthead_search.selector, "scroll": Elements.masthead_search.selector, "visibility": true },
            { "locator": Elements.TopAd.selector, "scroll": Elements.TopAd.selector, "visibility": true },
            { "locator": Elements.Breadcrumb.selector, "scroll": Elements.Breadcrumb.selector, "visibility": true },
            { "locator": Elements.LOE.selector, "scroll": Elements.Breadcrumb.selector, "visibility": false },
            { "locator": Elements.twitter.selector, "scroll": Elements.twitter.selector, "visibility": true },
            { "locator": Elements.pintrest.selector, "scroll": Elements.pintrest.selector, "visibility": true },
            { "locator": Elements.facebook.selector, "scroll": Elements.facebook.selector, "visibility": true },
           // { "locator": Elements.email.selector, "scroll": Elements.facebook.selector, "visibility": false },
            { "locator": Elements.kabob.selector, "scroll": Elements.kabob.selector, "visibility": true },
            { "locator": Elements.footer_twitter.selector, "scroll": Elements.footer_Scroll.selector, "visibility": true },
            { "locator": Elements.footer_pintrest.selector, "scroll": Elements.footer_Scroll.selector, "visibility": true },
            { "locator": Elements.footer_facebook.selector, "scroll": Elements.footer_Scroll.selector, "visibility": true },
            //{ "locator": Elements.footer_email.selector, "scroll": Elements.footer_Scroll.selector, "visibility": false },
            { "locator": Elements.sticky_Header_twitter.selector, "scroll": Elements.sticky_Header_Scroll.selector, "visibility": true },
            { "locator": Elements.sticky_Header_pintrest.selector, "scroll": Elements.sticky_Header_Scroll.selector, "visibility": true },
            { "locator": Elements.sticky_Header_facebook.selector, "scroll": Elements.sticky_Header_Scroll.selector, "visibility": true },
           // { "locator": Elements.sticky_Header_email.selector, "scroll": Elements.sticky_Header_Scroll.selector, "visibility": false },
            { "locator": Elements.sticky_kabob.selector, "scroll": Elements.sticky_kabob.selector, "visibility": true },
            { "locator": Elements.paddle_next.selector, "scroll": Elements.paddle_nav.selector, "visibility": true },
            { "locator": Elements.paddle_previous.selector, "scroll": Elements.paddle_nav.selector, "visibility": true },
            { "locator": Elements.bottom_ad_rdr.selector, "scroll": Elements.bottom_ad_rdr.selector, "visibility": true },
            { "locator": Elements.lazy_load_ad.selector, "scroll": Elements.lazy_load_ad.selector, "visibility": true },
            { "locator": Elements.footer_head.selector, "scroll": Elements.footer_head.selector, "visibility": true },
            { "locator": Elements.footer_reviewed.selector, "scroll": Elements.footer_reviewed.selector, "visibility": true },
            { "locator": Elements.footer_sources.selector, "scroll": Elements.footer_sources.selector, "visibility": true },
            { "locator": Elements.footer_copyright.selector, "scroll": Elements.footer_copyright.selector, "visibility": true },
            ]
        };
        Actions.Verify_ElementIsVisible(elements_visible);
    })

    /*  Validating the MastHead Navigatons */

    it("Validatig Masthead A-Z", function () {

        var linktext = "HEALTH\nA-Z";
        var newUrl = "http://www.m.webmd.com/a-to-z-guides/default.htm";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.HealthA_Z.selector, linktext, newUrl)

    })


    it("Validatig Masthead Drug & Supplements ", function () {
        var linktext = "DRUGS &\nSUPPLEMENTS";
        var newUrl = "http://www.webmd.com/drugs/2/index";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Drugs_Supplements.selector, linktext, newUrl)

    })

    it("Validatig Masthead for Living and Healthy ", function () {
        var linktext = "LIVING\nHEALTHY";
        var newUrl = "http://www.webmd.com/living-healthy";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Living_healthy.selector, linktext, newUrl)

    })
    it("Validatig Masthead for family and pregnancy ", function () {
        var linktext = "FAMILY &\nPREGNANCY";
        var newUrl = "http://www.webmd.com/family-pregnancy";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.Family_Pregnancy.selector, linktext, newUrl)


    })
    it("Validatig Masthead for news and experts ", function () {

        var linktext = "NEWS &\nEXPERTS";
        var newUrl = "http://www.webmd.com/news/default.htm";
        Actions.burger_linksValidation(url, Elements.masthead_burger.selector, Elements.News_Experts.selector, linktext, newUrl)

    })
    
    //Verify the Breadcrumb title

    it("Validation for Breadcrumb Text", function () {

        var name1 = 'LIVING WITH KNEE PAIN'
        var text = browser.getText(Elements.Breadcrumb.selector)
        text.should.equal(name1)
        browser.click(Elements.Breadcrumb.selector)
        browser.pause(4000)
        var TOC_Page_title_Text = browser.getUrl()
        browser.back()
        browser.pause(3000)
        TOC_Page_title_Text.should.containEql('default.htm')

    })
    // ------------------ Validation for All social share validations here---------------------------------------------------------------//

    it("Validatig Twitter Icon and Opening new window on click", function () {

        var actions = Actions.Socialshare_validations(Elements.twitter.selector, Elements.twitter.selector)
        actions.Page_title_Text.should.containEql(Twitter_Page_Title)

    });

    it("Validatig FB Icon and Opening new window on click", function () {
        var actions = Actions.Socialshare_validations(Elements.facebook.selector, Elements.facebook.selector)
        actions.Page_title_Text.should.containEql(Facebook_Page_Title)

    })

    it("Validatig Pinterest Icon and Opening new window on click", function () {
        var actions = Actions.Socialshare_validations(Elements.pintrest.selector, Elements.pintrest.selector)
        actions.Page_title_Text.should.containEql(Pintrest_Page_Title)
    })
    it("Validation for footer twitter when user clicks on footer twitter and it will opens in new window", function () {
        var actions = Actions.Socialshare_validations(Elements.footer_Scroll.selector, Elements.footer_twitter.selector)
        actions.Page_title_Text.should.containEql(Twitter_Page_Title)

    })

    it("Validation for footer Facebook when user clicks on footer Facebook and it will opens in new window", function () {
        var actions = Actions.Socialshare_validations(Elements.footer_Scroll.selector, Elements.footer_facebook.selector)
        actions.Page_title_Text.should.containEql(Facebook_Page_Title)

    })

    it("Validation for footer Pintrest when user clicks on footer Pintrest and it will opens in new window", function () {
        var actions = Actions.Socialshare_validations(Elements.footer_Scroll.selector, Elements.footer_pintrest.selector)
        actions.Page_title_Text.should.containEql(Pintrest_Page_Title)

    })
    it("Validation for sticky header twitter when user clicks on sticky header twitter and it will opens in new window", function () {
        var actions = Actions.Socialshare_validations(Elements.sticky_Header_Scroll.selector, Elements.sticky_Header_twitter.selector)
        actions.Page_title_Text.should.containEql(Twitter_Page_Title)

    })

    it("Validation for sticky header Facebook when user clicks on sticky header Facebook and it will opens in new window", function () {

        var actions = Actions.Socialshare_validations(Elements.sticky_Header_Scroll.selector, Elements.sticky_Header_facebook.selector)
        actions.Page_title_Text.should.containEql(Facebook_Page_Title)

    })

    it("Validation for sticky header Pintrest when user clicks on sticky header Pintrest and it will opens in new window", function () {
        var actions = Actions.Socialshare_validations(Elements.sticky_Header_Scroll.selector, Elements.sticky_Header_pintrest.selector)
        actions.Page_title_Text.should.containEql(Pintrest_Page_Title)


    })

    //--Paddle Navigation

    //Paddle naviagtion validations -- Previous
    it("Validation for paddle navigation to previous Item in a new browser", function () {
        var actions = Actions.Paddle_Navigation(Elements.paddle_nav.selector,Elements.paddle_previous.selector)
        actions.Page_URL.should.not.have.property(url);

    })

    //Paddle naviagtion validations -- Next
    it("Validation for paddle navigation to Next Item in a new browser", function () {
        
        var actions = Actions.Paddle_Navigation(Elements.paddle_nav.selector, Elements.paddle_next.selector)
        actions.Page_URL.should.not.have.property(url);

    })

    //-- Validation for kabob--------
    it("Validation for kabob", function () {

        browser.scroll(Elements.kabob.selector)
        browser.waitForVisible(Elements.kabob.selector)
        browser.click(Elements.kabob.selector)
        var visibile
        visibile1 = browser.isVisible(Elements.kabob_segment.selector)
        visibile1.should.equal(true)
        visibile = browser.isVisible(Elements.kabob_subhead.selector)
        visibile.should.equal(true)
        visibile = browser.isVisible(Elements.kabob_seeall.selector)
        visibile.should.equal(true)
        visibile = browser.isVisible(Elements.kabob_close.selector)
        visibile.should.equal(true)
        browser.click(Elements.kabob_close.selector);
        browser.pause(20000);
        
           })
});

