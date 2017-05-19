var webdriverio = require('webdriverio');
var should = require('should');
var path = require('path');
var rootPath = path.normalize(__dirname)
//var article_pageobjects = require('./../elements/FE_Smoke_Article_Elements');
var Elements = require('./../../common/elements/FE_Mobile_Article_Elements')
var input = require('./../../config/PPE-101748.testdata');


module.exports = {
    Verify_ElementIsVisible:function(elements){

//browser.scroll(elements.elements_visible[i].scroll);
 var count =  elements.elements.length;
    for( i=0; i<count;i++)
  {
    browser.scroll(elements.elements[i].scroll);
    var visible = browser.isExisting(elements.elements[i].locator);
    visible.should.equal(elements.elements[i].visibility);
   }
},

burger_linksValidation: function (url,burger,link,linktext,newUrl ) {

 browser.url(url)
        browser.pause(4000)
        browser.scroll(burger)
        browser.click(burger)
        var text = browser.getText(link)
            text.should.equal(linktext)     

        browser.click(linktext)
 var url1= browser.getUrl()
            url1.should.equal("http://www.m.webmd.com/a-to-z-guides/default.htm")

     },

     Socialshare_validations: function (Icons, scroll_value) {

        browser.scroll(scroll_value)
    browser.pause(4000)
    //It will click on social share icons
    browser.waitForVisible(Icons)
    browser.click(Icons)
    browser.pause(4000)

    var handle = browser.windowHandles()
    browser.window(handle.value[1])

    var Page_title_Text = browser.getTitle()
    browser.close(handle[1])

    var actions = {
      Page_title_Text: Page_title_Text,

    }
    return actions
  },

   Paddle_Navigation: function (Icons, paddle_page_title,paddle) {

       browser.scroll(Icons)
    browser.waitForVisible(Icons)
    var paddle_page_title_text = browser.getText(paddle_page_title)
    browser.click(paddle)
    browser.pause(4000)
    var Page_title_Text = browser.getTitle()
    browser.back()
    browser.pause(3000)

    var actions = {
      Page_title_Text: Page_title_Text,      
      paddle_page_title_text: paddle_page_title_text,
      

    }
    return actions
  },
}