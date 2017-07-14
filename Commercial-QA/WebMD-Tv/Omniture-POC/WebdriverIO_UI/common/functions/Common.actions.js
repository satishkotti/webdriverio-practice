//verify_width_height : used to get the height and width of an element
//open : used to  navigate to page
//click_getWindowTitle :click on element and get the new window title and close the new opened window


var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
var commonelements = require('./../elements/Common.elements');
var input = require('./../../config/PPE-88947.testdata');
var input = require('./../../config/MobileUI_Regression.testdata');
var input = require('./../../config/PPE-112347.testdata');
//var sta = require('./../functions/Sharethrough.actions');
var currentpage;
var url = input.environment;

module.exports = {

  /* This method is to handle popup after launching URL for the first time
  Arguments: NA
  Return Type: NA
  */
  handlePopup: function () {
    var b = browser.isVisible(commonelements.launchpoup.selector);
    if (b === true){
      browser.click(commonelements.launchpoupclose.selector);
    }
  },

  /* This Method is to verify URL of the current page or navigate URL
  Arguments:
  Return Type:
  */
 verifyURL: function (currentpage) {
  var currenturl=browser.getUrl();
  var url1 = url1+"#1";
  console.log(url1);
  expect(currenturl).to.equal(url1);
 },

  /* This method is to verify visbility of an element on the page
  Arguments: Need to pass required element locator need to verified 
  Return Type: This will return a boolean value (If element exist 'true' else 'false')
  */

  verifyElementExist: function (ele) {
    return browser.isVisible(ele);
  },

  /* This Method is to get the number of pages available in TOC,Article or Guide pages
  Arguments: NA
  Return Type: This will return a page number which is number of pages available in navigated URL
  */

  getNumberOfPages: function () {
    var pg = browser.getText(commonelements.lastpagenumber.selector);
    var pgn = {
      pgnumber: pg,

    }
    return pgn;
  },





  /*Description:used to get the height and width of an element
  Params: ele - element locator value
  returns: width - width , height - height*/

  verify_width_height: function (ele) {
    commonelements.open();

    var icon = $(ele);
    //console.log(icon);
    var width = icon.getCssProperty('width');
    var height = icon.getCssProperty('height')

    var actions = {
      width: width,
      height: height

    }
    return actions;
  },

  /*Description:used to get the height and width of an element
  Params: Icons - clickable element locator value
          scroll_value - scrolls the page 
  returns:  Navigated_Title- new window title
           Home_Title- Original window title*/

  click_getWindowTitle: function (Icons, scroll_value) {
    commonelements.open();
    //It will verifies that element is visable

    browser.scroll(scroll_value);
    browser.waitForVisible(Icons, 4000);
    //browser.pause(5000);
    //It will clicks on social share icon
    browser.click(Icons);
    browser.pause(10000);

    //It will handles the opened windows
    var handle = browser.windowHandles();
    console.log(handle.value[1]);
    //It will change focus to another window
    browser.window(handle.value[1]);

    //It will get the title of the current focusing window
    var Navigated_Title = browser.getTitle();
    //It will close the current opened window
    browser.close();

    var Home_Title = browser.getTitle();
    //  console.log(title1); 
    // Home_Title.should.equal();

    var actions = {
      Navigated_Title: Navigated_Title,
      Home_Title: Home_Title

    }
    return actions;
  },

    /* This method is to verify the display of Popular Tools Module on current page for PPE-106378 story */

    PopularTools: function(linkText)
    {
        let element;
        switch(linkText)
        {
            case 'Popular Tools':
            element = commonelements.populartools; break;
            default:
            element = commonelements.populartools_links.get(linkText); break;
        }

        return element;
    },



}