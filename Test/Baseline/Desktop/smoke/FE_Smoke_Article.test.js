var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var Article_Actions = require('./../common/functions/FE_Smoke_Article_Actions');
var common_Actions = require("./../common/functions/Common.actions");
var Article_Elements = require('./../common/elements/FE_Smoke_Article_Elements');
var actions; //Array for function return calls
var Article_common_Elements = require('./../common/elements/Common.elements');
var Twitter_Page_Title = 'Post a Tweet on Twitter';
var Facebook_Page_Title = 'Facebook';
var Pintrest_Page_Title = 'Pinterest';
var Input = require('../config/FE.testdata')[argv.env];
var url = Input.Article_url;
browser.url(url);
describe('Validation of elements on Article page ', function() {
    // Article_Elements.open();
    //this.timeout(90000);

    /* This method passes  all the locators as an array object and validates if the element exists on the page */

    it("Validation for elements visibile", function() {
        browser.pause(2000);
        var elements_visible = {
            "elements": [{ "locator": Article_common_Elements.Breadcrumb.selector, "scroll": Article_common_Elements.Breadcrumb.selector },
                { "locator": Article_common_Elements.LOE.selector, "scroll": Article_common_Elements.LOE.selector },
                // { "locator": Article_common_Elements.masthead.selector, "scroll": Article_common_Elements.masthead.selector},
                { "locator": Article_common_Elements.textelementforsearch.selector, "scroll": Article_common_Elements.textelementforsearch.selector },
                { "locator": Article_common_Elements.logo.selector, "scroll": Article_common_Elements.logo.selector },
                { "locator": Article_Elements.Battribution_Sticky.selector, "scroll": Article_Elements.Battribution_Sticky.selector },
                { "locator": Article_Elements.RRail.selector, "scroll": Article_Elements.RRail.selector },
                { "locator": Article_Elements.TopAd.selector, "scroll": Article_Elements.TopAd.selector },
                { "locator": Article_Elements.RightAd.selector, "scroll": Article_Elements.RightAd.selector },
                { "locator": Article_Elements.Pageheader.selector, "scroll": Article_Elements.Pageheader.selector },
                { "locator": Article_Elements.Paddles.selector, "scroll": Article_Elements.Paddles.selector },
                { "locator": Article_Elements.A_Z.selector, "scroll": Article_Elements.A_Z.selector },
                { "locator": Article_Elements.Drug.selector, "scroll": Article_Elements.Drug.selector },
                { "locator": Article_Elements.Living_Healthy.selector, "scroll": Article_Elements.Living_Healthy.selector },
                { "locator": Article_Elements.Family_Module.selector, "scroll": Article_Elements.Family_Module.selector },
                { "locator": Article_Elements.News_Module.selector, "scroll": Article_Elements.News_Module.selector },
            ]
        };
        common_Actions.Verify_ElementIsVisible(elements_visible);
    });


    /*  Validating the MastHead Navigatons */

    it("Validatig Masthead A-Z", function() {
        var actions = Article_Actions.Click_MastHead(Article_Elements.A_Z.selector, Article_Elements.A_Z.selector);
        actions.page_title.should.containEql('WebMD Common Health Topics A-Z - Find reliable health and medical information on common topics from A to Z');
    });

    it("Validatig Masthead Drug & Supplements ", function() {

        var actions = Article_Actions.Click_MastHead(Article_Elements.Drug.selector, Article_Elements.Drug.selector);
        actions.page_title.should.containEql('WebMD Drugs & Medications - Medical information on prescription drugs, vitamins and over-the-counter medicines');
    });

    it("Validatig Masthead for Living and Healthy ", function() {

        var actions = Article_Actions.Click_MastHead(Article_Elements.Living_Healthy.selector, Article_Elements.Living_Healthy.selector);
        actions.page_title.should.containEql('Living Healthy: Your Guide to Beauty, Food, Fitness, and Diet');
    });
    it("Validatig Masthead for Family and Pregnancy ", function() {

        var actions = Article_Actions.Click_MastHead(Article_Elements.Family_Module.selector, Article_Elements.Family_Module.selector);
        actions.page_title.should.containEql('Family & Pregnancy Center');
    });
    it("Validatig Masthead for News and Experts ", function() {

        var actions = Article_Actions.Click_MastHead(Article_Elements.News_Module.selector, Article_Elements.News_Module.selector);
        console.log(actions);
        actions.page_title.should.containEql('WebMD Health News Center - The latest breaking health news and alerts');
    });

    /* Validating for the Breadcrumb and Line of Entitlement objects*/

    it("Validation for Breadcrumb Text", function() {
        //Verify the Breadcrumb linked when clicked navigates to TOC page

        var name1 = 'SEGMENT 1';
        actions = common_Actions.Search(Article_common_Elements.Breadcrumb.selector, Article_common_Elements.Breadcrumb.selector).breadcrumb_text;
        actions.should.equal(name1);
        // var click_actions = Article_Actions.Click_Elements(Article_Elements.Breadcrumb.selector, Article_Elements.Breadcrumb.selector);
        browser.click(Article_common_Elements.Breadcrumb.selector);
        browser.pause(4000);
        var TOC_Page_title_Text = browser.getTitle();
        browser.back();
        browser.pause(3000);
        TOC_Page_title_Text.should.containEql('TOC');


    });

    it("Validation for LOE text", function() {
        var LOE_Name1 = 'This content is selected and controlled by WebMD\'s editorial staff and is brought to you by YourBrand.';
        actions = common_Actions.Search_loe(Article_common_Elements.LOE.selector, Article_common_Elements.LOE.selector).LOE_Text;
        actions.should.containEql(LOE_Name1);
    });

    /* Validating the Brand Attribution */

    it("Validation for Branded attribution", function() {

        var LOEtext = browser.getText(Article_Elements.Battribution.selector);
        LOEtext.should.equal("Brought to you by:");
        browser.click(Article_Elements.Battribution.selector); //Overlay opens up
        browser.pause("3000");
        browser.isExisting(Article_Elements.tooltip_imag.selector); //Checking for the Logo
        var tooltip_disclaimer = browser.getText(Article_Elements.tooltip_disclaimer.selector); //Checking disclaimer text
        tooltip_disclaimer.should.equal("Brought to you by");
        var tooltip_text = browser.getText(Article_Elements.tooltip_text.selector);
        tooltip_text.should.containEql("Content under this heading is funded by a third-party and independently created or chosen by WebMD.");
        browser.isExisting(Article_Elements.tooltip_close.selector);
        browser.click(Article_Elements.tooltip_close.selector);

    });


    //--Paddle Navigation

    //Paddle naviagtion validations -- Previous
    it("Validation for paddle navigation to previous Item in a new browser", function() {

        var actions = Article_Actions.Paddle_Navigation(Article_Elements.paddle_previous.selector, Article_Elements.paddle_previous.selector);
        // actions.Page_title_Text.should.equal(actions.paddle_previous_page_title_text);
        actions.Page_title_Text.should.containEql("OTC Medicines for Cough");
    });

    // //Paddle naviagtion validations -- Next
    it("Validation for paddle navigation to Next Item in a new browser", function() {

        var actions = Article_Actions.Paddle_Navigation_Next(Article_Elements.paddle_next.selector, Article_Elements.paddle_next.selector);
        //actions.Page_title_Text_Next.should.equal(actions.paddle_next_page_title_text);
        actions.Page_title_Text_Next.should.containEql("8 Tips for Nighttime Cough Relief");

    });

    //-- Up Next Navigations--------
    // it("Validation for Up Next with respect to Paddle navigation", function () {
    //   browser.back;
    //   var actions_upnext = Article_Actions.UP_Next_Navigation(Article_Elements.Up_next.selector, Article_Elements.Up_next.selector);
    //   var actions_paddles = Article_Actions.Paddle_Navigation_Next(Article_Elements.paddle_next.selector, Article_Elements.paddle_next.selector);
    //   //  actions_upnext.Page_title_Text.should.equal(actions_paddles.paddle_next_page_title_text);
    //   actions_paddles.paddle_next_page_title_text.should.containEql(actions_upnext.Up_next_page_title_text);


    // });


    // ------------------ Validation for All social share validations here---------------------------------------------------------------//



    it("Validatig Twitter Icon and Opening new window on click", function() {
        var actions = Article_Actions.Click_Elements(Article_Elements.twitter.selector, Article_Elements.twitter.selector);
        actions.Page_title_Text.should.equal(Twitter_Page_Title);

    });

    it("Validatig FB Icon and Opening new window on click", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.facebook.selector, Article_Elements.facebook.selector);
        actions.Page_title_Text.should.equal(Facebook_Page_Title);
    });

    it("Validatig Pinterest Icon and Opening new window on click", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.pintrest.selector, Article_Elements.pintrest.selector);
        actions.Page_title_Text.should.equal(Pintrest_Page_Title);

    });


    it("Validation for footer twitter when user clicks on footer twitter and it will opens in new window", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.footer_twitter.selector, Article_Elements.footer_twitter.selector);

        actions.Page_title_Text.should.equal(Twitter_Page_Title);
    });

    it("Validation for footer Facebook when user clicks on footer Facebook and it will opens in new window", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.footer_facebook.selector, Article_Elements.footer_facebook.selector);
        actions.Page_title_Text.should.equal(Facebook_Page_Title);
    });

    it("Validation for footer Pintrest when user clicks on footer Pintrest and it will opens in new window", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.footer_pintrest.selector, Article_Elements.footer_pintrest.selector);
        actions.Page_title_Text.should.equal(Pintrest_Page_Title);
    });

    it("Validation for sticky header twitter when user clicks on sticky header twitter and it will opens in new window", function() {
        var actions = Article_Actions.Click_Elements(Article_Elements.sticky_Header_twitter.selector, Article_Elements.sticky_Header_twitter.selector);
        actions.Page_title_Text.should.equal(Twitter_Page_Title);
    });

    it("Validation for sticky header Facebook when user clicks on sticky header Facebook and it will opens in new window", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.sticky_Header_facebook.selector, Article_Elements.sticky_Header_facebook.selector);
        actions.Page_title_Text.should.equal(Facebook_Page_Title);
    });

    it("Validation for sticky header Pintrest when user clicks on sticky header Pintrest and it will opens in new window", function() {

        var actions = Article_Actions.Click_Elements(Article_Elements.sticky_Header_pintrest.selector, Article_Elements.sticky_Header_pintrest.selector);
        actions.Page_title_Text.should.equal(Pintrest_Page_Title);
    });

});