var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
var Article_Actions = require('./../../../common/functions/FE_Smoke_Article_Actions');
var Article_Elements = require('./../../../common/elements/FE_Smoke_Article_Elements');
var Input = require('./../../../config/FE.testdata')[argv.env];
var URL = Input.Article_url;
var actions;//Array for function return calls
var Twitter_Page_Title = 'Post a Tweet on Twitter';
var Facebook_Page_Title = 'Facebook';
var Pintrest_Page_Title = 'Pinterest • The world’s catalog of ideas';

describe('Validation of elements on Article page ', function () {
  // Article_Elements.open();
  browser.url(URL);
  this.timeout(90000);

  /* This method passes  all the locators as an array object and validates if the element exists on the page */

  it("Validation for elements visibile", function () {
    var elements_visible = {
      "elements": [{ "locator": Article_Elements.Breadcrumb.selector, "scroll": Article_Elements.Breadcrumb.selector, "text": "Breadcrumb" },
      { "locator": Article_Elements.LOE.selector, "scroll": Article_Elements.LOE.selector, "text": "LOE" },
      { "locator": Article_Elements.masthead.selector, "scroll": Article_Elements.masthead.selector, "text": "masthead" },
      { "locator": Article_Elements.Search_Textbox.selector, "scroll": Article_Elements.Search_Textbox.selector, "text": "Search textbox on masthead" },
      { "locator": Article_Elements.WebMD_Logo.selector, "scroll": Article_Elements.WebMD_Logo.selector, "text": "webMD logo on masthead" },
      { "locator": Article_Elements.Battribution_Sticky.selector, "scroll": Article_Elements.Battribution_Sticky.selector, "text": "Brand attribution logo in sticky masthead" },
      { "locator": Article_Elements.RRail.selector, "scroll": Article_Elements.RRail.selector, "text": "Right rail section" },
      { "locator": Article_Elements.TopAd.selector, "scroll": Article_Elements.TopAd.selector, "text": "Top banner Ad" },
      { "locator": Article_Elements.RightAd.selector, "scroll": Article_Elements.RightAd.selector, "text": "Right  banner Ad" },
      { "locator": Article_Elements.Pageheader.selector, "scroll": Article_Elements.Pageheader.selector, "text": "Page title" },
      { "locator": Article_Elements.Paddles.selector, "scroll": Article_Elements.Paddles.selector, "text": "Paddles" },
      { "locator": Article_Elements.A_Z.selector, "scroll": Article_Elements.A_Z.selector, "text": "Health A-Z Link" },
      { "locator": Article_Elements.Drug.selector, "scroll": Article_Elements.Drug.selector, "text": "Drugs and Supplements Link" },
      { "locator": Article_Elements.Living_Healthy.selector, "scroll": Article_Elements.Living_Healthy.selector, "text": "Living Healthy Link" },
      { "locator": Article_Elements.Family_Module.selector, "scroll": Article_Elements.Family_Module.selector, "text": "Family and Pregnancy Link" },
      { "locator": Article_Elements.News_Module.selector, "scroll": Article_Elements.News_Module.selector, "text": "News and Experts Link" },


      ]
    };
    Article_Actions.Verify_ElementIsVisible(elements_visible);
  });


  /*  Validating the MastHead Navigatons */

  it.only("Validatig Masthead A-Z", function () 
  {
    var actions = Article_Actions.Click_MastHead(Article_Elements.A_Z.selector, Article_Elements.A_Z.selector);
    console.log(actions.page_title);
    //actions.page_title.should.containEql('A-Z');
  });

  /*
   var actions = Article_Actions.Click_Elements(Article_Elements.A_Z.selector, Article_Elements.A_Z.selector);
   actions.Page_title_Text.should.containEql('A-Z');
 });*/

  it("Validatig Masthead Drug & Supplements ", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.Drug.selector, Article_Elements.Drug.selector);
    actions.Page_title_Text.should.containEql('Drugs & Medications');
  });

  it("Validatig Masthead for Living and Healthy ", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.Living_Healthy.selector, Article_Elements.Living_Healthy.selector);
    actions.Page_title_Text.should.containEql('Living Healthy');
  });
  it("Validatig Masthead for Family and Pregnancy ", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.Family_Module.selector, Article_Elements.Family_Module.selector);
    actions.Page_title_Text.should.containEql('Family & Pregnancy');
  });
  it("Validatig Masthead for News and Experts ", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.News_Module.selector, Article_Elements.News_Module.selector);
    actions.Page_title_Text.should.containEql('WebMD Health News Center');
  });

  /* Validating for the Breadcrumb and Line of Entitlement objects*/

  it("Validation for Breadcrumb Text", function () {
    //Verify the Breadcrumb linked when clicked navigates to TOC page

    var name1 = 'SEGMENT 1';
    actions = Article_Actions.search(Article_Elements.Breadcrumb.selector, Article_Elements.Breadcrumb.selector).breadcrumb_text;
    actions.should.equal(name1);
    // var click_actions = Article_Actions.Click_Elements(Article_Elements.Breadcrumb.selector, Article_Elements.Breadcrumb.selector);
    browser.click(Article_Elements.Breadcrumb.selector);
    browser.pause(4000);
    var TOC_Page_title_Text = browser.getTitle();
    browser.back();
    browser.pause(3000);
    TOC_Page_title_Text.should.containEql('TOC');


  });

  it("Validation for LOE text", function () {

    var LOE_Name1 = 'This content is selected and controlled by WebMD\'s editorial staff and is brought to you by YourBrand.';
    actions = Article_Actions.search(Article_Elements.LOE.selector, Article_Elements.LOE.selector).LOE_Text;
    actions.should.equal(LOE_Name1);
  });

  /* Validating the Brand Attribution */

  it("Validation for Branded attribution", function () {

    var LOEtext = browser.getText(Article_Elements.Battribution.selector);
    LOEtext.should.equal("Brought to you by:");
    browser.click(Article_Elements.Battribution.selector); //Overlay opens up
    browser.pause("3000");
    browser.isExisting(Article_Elements.tooltip_imag.selector); //Checking for the Logo
    var tooltip_disclaimer = browser.getText(Article_Elements.tooltip_disclaimer.selector);//Checking disclaimer text
    tooltip_disclaimer.should.equal("Brought to you by");
    var tooltip_text = browser.getText(Article_Elements.tooltip_text.selector);
    tooltip_text.should.equal("Content under this heading is from or created on behalf of the named sponsor. This content is not subject to the WebMD Editorial Policy and is not reviewed by the WebMD Editorial department for accuracy, objectivity or balance.");
    browser.isExisting(Article_Elements.tooltip_close.selector);
    browser.click(Article_Elements.tooltip_close.selector);

  });


  //--Paddle Navigation

  //Paddle naviagtion validations -- Previous
  it("Validation for paddle navigation to previous Item in a new browser", function () {

    var actions = Article_Actions.Paddle_Navigation(Article_Elements.Paddles.selector, Article_Elements.Paddles.selector);
    actions.Page_title_Text.should.equal(actions.paddle_previous_page_title_text);
  });

  //Paddle naviagtion validations -- Next
  it("Validation for paddle navigation to Next Item in a new browser", function () {

    var actions = Article_Actions.Paddle_Navigation_Next(Article_Elements.Paddles.selector, Article_Elements.Paddles.selector);
    actions.Page_title_Text_Next.should.equal(actions.paddle_next_page_title_text);
  });

  //-- Up Next Navigations--------
  it("Validation for Up Next with respect to Paddle navigation", function () {

    var actions_upnext = Article_Actions.UP_Next_Navigation(Article_Elements.up_next.selector, Article_Elements.up_next.selector);
    var actions_paddles = Article_Actions.Paddle_Navigation_Next(Article_Elements.Paddles.selector, Article_Elements.Paddles.selector);
    actions_upnext.Page_title_Text.should.equal(actions.paddle_next_page_title_text);
  });


  // ------------------ Validation for All social share validations here---------------------------------------------------------------//



  it("Validatig Twitter Icon and Opening new window on click", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.twitter.selector, Article_Elements.twitter.selector);
    actions.Page_title_Text.should.equal(Twitter_Page_Title);

  });

  it("Validatig FB Icon and Opening new window on click", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.facebook.selector, Article_Elements.facebook.selector);
    actions.Page_title_Text.should.equal(Facebook_Page_Title);
  });

  it("Validatig Pinterest Icon and Opening new window on click", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.pintrest.selector, Article_Elements.pintrest.selector);
    actions.Page_title_Text.should.equal(Pintrest_Page_Title);

  });


  it("Validation for footer twitter when user clicks on footer twitter and it will opens in new window", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.footer_twitter.selector, Article_Elements.footer_twitter.selector);

    actions.Page_title_Text.should.equal(Twitter_Page_Title);
  });

  it("Validation for footer Facebook when user clicks on footer Facebook and it will opens in new window", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.footer_facebook.selector, Article_Elements.footer_facebook.selector);
    actions.Page_title_Text.should.equal(Facebook_Page_Title);
  });

  it("Validation for footer Pintrest when user clicks on footer Pintrest and it will opens in new window", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.footer_pintrest.selector, Article_Elements.footer_pintrest.selector);
    actions.Page_title_Text.should.equal(Pintrest_Page_Title);
  });

  it("Validation for sticky header twitter when user clicks on sticky header twitter and it will opens in new window", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.sticky_Header_twitter.selector, Article_Elements.sticky_Header_twitter.selector);
    actions.Page_title_Text.should.equal(Twitter_Page_Title);
  });

  it("Validation for sticky header Facebook when user clicks on sticky header Facebook and it will opens in new window", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.sticky_Header_facebook.selector, Article_Elements.sticky_Header_facebook.selector);
    actions.Page_title_Text.should.equal(Facebook_Page_Title);
  });

  it("Validation for sticky header Pintrest when user clicks on sticky header Pintrest and it will opens in new window", function () {

    var actions = Article_Actions.Click_Elements(Article_Elements.sticky_Header_pintrest.selector, Article_Elements.sticky_Header_pintrest.selector);
    actions.Page_title_Text.should.equal(Pintrest_Page_Title);
  });
  it("valudation of seemore", function () {
    Article_Actions.see_more(Article_Elements.seemore.selector);
    browser.back();
  });
  it("valudation of funded_segment2", function () {
    Article_Actions.funded_segment2(Article_Elements.funded_segment2.selector);
    browser.back();
  });
  it("valudation of funded_segment3", function () {
    Article_Actions.funded_segment3(Article_Elements.funded_segment3.selector);
    browser.back();
  });

});

