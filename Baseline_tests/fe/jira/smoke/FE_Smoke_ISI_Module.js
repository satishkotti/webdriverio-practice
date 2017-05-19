var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var argv = require("yargs").argv;
console.log(__dirname);
var ISI_Actions = require('./../../../common/functions/FE_Smoke_ISI_Actions');
var ISI_Elements_Page = require('./../../../common/elements/FE_Smoke_Articles_ISI_Elements');
var Input = require('./../../../config/Article.testdata')[argv.env];
//var Article_Actions = require('./../../../common/functions/FE_Smoke_Article_Actions');
//var Input = require('./../../config/PPE-101748.testdata')[argv.env];
var input = require('./../../../config/FE.testdata')[argv.env];
var url = input.ISI_url;
browser.url(url);
var Twitter_Page_Title = 'Post a Tweet on Twitter';
var Facebook_Page_Title = 'Facebook';
var Pintrest_Page_Title = 'Pinterest • The world’s catalog of ideas';

describe('Validation of social share icons  for social  icons ', function () {
  this.timeout(90000);

  // Method to valdiate if the elemets on the page are visible

  it("Validation for ISI Text  visibile", function () {
    var elements_visible = {
      "elements": [
        /* { "locator": Article_Elements.Breadcrumb.selector, "scroll": Article_Elements.Breadcrumb.selector, "text": "Breadcrumb" },
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
         */



        { "locator": ISI_Elements_Page.Global_Header.selector, "scroll": ISI_Elements_Page.Global_Header.selector, "text": "ISI Page Header" },

        { "locator": ISI_Elements_Page.Top_Ad.selector, "scroll": ISI_Elements_Page.Top_Ad.selector, "text": "ISI Module Top Ad" },

        { "locator": ISI_Elements_Page.Right_Ad.selector, "scroll": ISI_Elements_Page.Right_Ad.selector, "text": "ISI Module Right Ad" },

        { "locator": ISI_Elements_Page.Left_Ad.selector, "scroll": ISI_Elements_Page.Left_Ad.selector, "text": "ISI Module Left Ad" },

        { "locator": ISI_Elements_Page.Left_Rail.selector, "scroll": ISI_Elements_Page.Left_Rail.selector, "text": "ISI Module Left Rail" },
        { "locator": ISI_Elements_Page.Attribution.selector, "scroll": ISI_Elements_Page.Attribution.selector, "text": "ISI Page attribution" },

        { "locator": ISI_Elements_Page.ISI_module_Normal.selector, "scroll": ISI_Elements_Page.ISI_module_Normal.selector, "text": "ISI Module Normal" },


      ]
    };
    ISI_Actions.Verify_ElementIsVisible(elements_visible);
  });

  /* This method will validate if the ISI overlay opens up completely once we click on Show more button and closes on clikcing on Show Less button */

  it("Validation for ISI in Full mode ", function () {

    browser.click(ISI_Elements_Page.ISI_button.selector);
    browser.pause(3000);
    var ISI_Text = browser.getText(ISI_Elements_Page.ISI_module_Full.selector);
    // - Comapring ISI text content --if(ISI_Text.context.)
    // ISI_Text.should.

    console.log(browser.isExisting(ISI_Elements_Page.ISI_Show_Less.selector));
    browser.click(ISI_Elements_Page.ISI_Show_Less.selector);
  });
  /* This method will validate if the ISI overlay has disappeared once the Page ISI has come into view */

  it("Validation for page ISI Hiding ISI overlay ", function () {

    browser.pause(2000);
    browser.scroll(ISI_Elements_Page.ISI_Page_content.selector);
    browser.pause(5000);
    if (browser.isVisible(ISI_Elements_Page.ISI_Page_content.selector))
      browser.isExisting(ISI_Elements_Page.ISI_module_Hidden.selector);


  });


























  // it("Validation for Breadcrumb Text", function () {
  //   //Verify the Breadcrumb title

  //   var name1 = 'SEGMENT 1';
  //   var actions = socialIcons.search(search.Breadcrumb.selector, search.Breadcrumb.selector).breadcrumb_text;

  //   actions.should.equal(name1);
  //   //actions.Home_Title.should.equal(name1);
  // });

  // it("Validation for LOE text", function () {

  //   var LOE_Name1 = 'This content is selected and controlled by WebMD\'s editorial staff and is brought to you by YourBrand.';
  //   var actions = socialIcons.search(search.facebook.selector, search.LOE.selector).LOE_Text;
  //   //var text = socialIcons.LOE_Text
  //   actions.should.equal(LOE_Name1);
  // });


  //--ISI Validation



  // it("Validation for ISI", function () {

  // var actions = socialIcons.search(search.ISI_module_Normal.selector, search.ISI_module_Normal.selector);

  //   (browser.isVisible(search.ISI_module_Normal.selector));


  //   });





  //   // ------------------ All social share validations here---------------------------------------------------------------//



  // it("Validatig Twitter Icon and Opening new window on click", function () {

  //   //var name1 = '8 Tips for Nighttime Cough Relief';
  //   var actions = socialIcons.Click_Elements(search.twitter.selector, search.twitter.selector);
  //   actions.Page_title_Text.should.equal(Twitter_Page_Title);

  // });

  // it("Validatig FB Icon and Opening new window on click", function () {

  //   var actions = socialIcons.Click_Elements(search.facebook.selector, search.facebook.selector);
  //   actions.Page_title_Text.should.equal(Facebook_Page_Title);
  // });

  // it("Validatig Pinterest Icon and Opening new window on click", function () {

  //   var actions = socialIcons.Click_Elements(search.pintrest.selector, search.pintrest.selector);
  //   actions.Page_title_Text.should.equal(Pintrest_Page_Title);

  // });


  // it("Validation for footer twitter when user clicks on footer twitter and it will opens in new window", function () {

  //   var actions = socialIcons.Click_Elements(search.footer_twitter.selector, search.footer_twitter.selector);

  //   actions.Page_title_Text.should.equal(Twitter_Page_Title);
  // });

  // it("Validation for footer Facebook when user clicks on footer Facebook and it will opens in new window", function () {

  //   var actions = socialIcons.Click_Elements(search.footer_facebook.selector, search.footer_facebook.selector);
  //   actions.Page_title_Text.should.equal(Facebook_Page_Title);
  // });

  // it("Validation for footer Pintrest when user clicks on footer Pintrest and it will opens in new window", function () {

  //   var actions = socialIcons.Click_Elements(search.footer_pintrest.selector, search.footer_pintrest.selector);
  //   actions.Page_title_Text.should.equal(Pintrest_Page_Title);
  // });

  // it("Validation for sticky header twitter when user clicks on sticky header twitter and it will opens in new window", function () {

  //   var actions = socialIcons.Click_Elements(search.sticky_Header_twitter.selector, search.sticky_Header_twitter.selector);
  //   actions.Page_title_Text.should.equal(Twitter_Page_Title);
  // });

  // it("Validation for sticky header Facebook when user clicks on sticky header Facebook and it will opens in new window", function () {

  //   var actions = socialIcons.Click_Elements(search.sticky_Header_facebook.selector, search.sticky_Header_facebook.selector);
  //   actions.Page_title_Text.should.equal(Facebook_Page_Title);
  // });

  // it("Validation for sticky header Pintrest when user clicks on sticky header Pintrest and it will opens in new window", function () {

  //   var actions = socialIcons.Click_Elements(search.sticky_Header_pintrest.selector, search.sticky_Header_pintrest.selector);
  //   actions.Page_title_Text.should.equal(Pintrest_Page_Title);
  // });

  //--- ISI----------------
  /* it("Validation for ISI in normal mode ", function () {
 
     actions = ISI_Actions.search(ISI_Elements_Page.Pageheader.selector, ISI_Elements_Page.Pageheader.selector).flag_visible
     actions.should.equal(true);
   });
 */
  /*
    it("Validation for ISI in expanded   mode ", function () {
  
      var actions = socialIcons.Click_Elements(search.sticky_Header_pintrest.selector, search.sticky_Header_pintrest.selector);
      actions.Page_title_Text.should.equal(Pintrest_Page_Title);
    });
     it("Validation for ISI hidden when page ISI comesinto view ", function () {
  
      var actions = socialIcons.Click_Elements(search.sticky_Header_pintrest.selector, search.sticky_Header_pintrest.selector);
      actions.Page_title_Text.should.equal(Pintrest_Page_Title);
    });
    */
});

