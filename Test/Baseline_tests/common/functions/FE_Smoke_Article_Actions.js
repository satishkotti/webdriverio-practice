var webdriverio = require('webdriverio');
var should = require('should');
var assert = require('assert');
var path = require('path');
var rootPath = path.normalize(__dirname)
var article_pageobjects = require('./../../common/elements/FE_Smoke_Article_Elements');
article_pageobjects.open();

module.exports = {

  /* -- This Method would receive two parameters ; one the element locator and the other the scroll value. Once' , the element is located it clicks on it and returns 
  the new page title-- */

  Click_MastHead: function (Icons, Scroll_value) {
    browser.windowHandleMaximize();
    browser.scroll(Scroll_value);
    browser.click(Icons);
    browser.pause(3000);
    browser.refresh();
    browser.pause(5000);
    var page_title = browser.title();
    var actions =
      {
        page_title: page_title,

      }
    browser.back();
    return actions;
  },
  //This Method will click an Icon that opens up a new child Window and return the Title of the child Window 
  Click_Elements: function (Icons, scroll_value) {

    browser.windowHandleMaximize();
    browser.scroll(scroll_value);
    browser.pause(4000);

    // This will click on icons
    browser.waitForVisible(Icons);
    browser.click(Icons);
    browser.pause(4000);

    var handle = browser.windowHandles();
    browser.window(handle.value[1]);

    var Page_title_Text = browser.getTitle();
    browser.close(handle[1]);

    var actions = {
      Page_title_Text: Page_title_Text,

    }
    return actions;
  },

  /*  This method is used for validating the Paddles (Previous) on the page. It receives two parameters ; one the element locator and the other the scroll value. It returns the paddle
  text along with the title of the new page */

  Paddle_Navigation: function (Icons, scroll_value) {

    browser.scroll(scroll_value);
    browser.waitForVisible(Icons);
    var paddle_previous_page_title_text = browser.getText(article_pageobjects.paddle_previous_page_title.selector);
    browser.click(article_pageobjects.paddle_previous.selector);
    browser.pause(4000);
    var Page_title_Text = browser.getTitle();
    browser.back();
    browser.pause(3000);

    var actions = {
      Page_title_Text: Page_title_Text,
      paddle_previous_page_title_text: paddle_previous_page_title_text,

    }
    return actions;
  },

  /*  This method is used for validating the Paddles (Next) on the page. It receives two parameters ; one the element locator and the other the scroll value. It returns the paddle
  text along with the title of the new page */

  Paddle_Navigation_Next: function (Icons, scroll_value) {

    browser.scroll(scroll_value);
    browser.waitForVisible(Icons);
    var paddle_next_page_title_text = browser.getText(article_pageobjects.paddle_next_page_title.selector);
    browser.click(article_pageobjects.paddle_next.selector);
    var Page_title_Text_Next = browser.getTitle();
    browser.back();
    var actions =
      {

        Page_title_Text_Next: Page_title_Text_Next,
        paddle_next_page_title_text: paddle_next_page_title_text,

      }
    return actions;
  },


  // Methods to validate Up Next Modules

  /*  This method is used for validating the Up Next module (Immediate next section) on the page. It receives two parameters ; one the element locator and the other the scroll value. It returns the paddle
  text along with the title of the new page */

  UP_Next_Navigation: function (Icons, scroll_value) {

    browser.scroll(scroll_value);
    browser.waitForVisible(Icons);
    var Up_next_page_title_text = browser.getText(article_pageobjects.up_next.selector);
    browser.click(article_pageobjects.up_next.selector);
    browser.pause(4000);
    var Page_title_Text = browser.getTitle();
    browser.back();
    browser.pause(3000);

    var actions =
      {
        Page_title_Text: Page_title_Text,
        Up_next_page_title_text: Up_next_page_title_text,

      }
    return actions;
  },


  /*  This method is used for validating the Up Next module (Second to next section) on the page. It receives two parameters ; one the element locator and the other the scroll value. It returns the paddle
  text along with the title of the new page */

  Up_Second_Next_Navigation: function (Icons, scroll_value) {

    browser.scroll(scroll_value);
    browser.waitForVisible(Icons);
    var Up_next_second_page_title_text = browser.getText(article_pageobjects.up_next_second.selector);
    browser.click(article_pageobjects.up_next_second.selector);
    var Page_title_Text = browser.getTitle();
    browser.back();
    var actions =
      {

        Page_title_Text: Page_title_Text,
        Up_next_second_page_title_text: Up_next_second_page_title_text,

      }
    return actions;
  },
 /* Method to Verify See More functionality*/

  See_more: function (seemore) 
  {
    browser.leftClick(seemore);
    var title = browser.getTitle();
    title.should.containEql('See All Page');
  },

  

}